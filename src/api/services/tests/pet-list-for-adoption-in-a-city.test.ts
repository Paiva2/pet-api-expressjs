import { beforeEach, describe, expect, it } from "vitest"
import PetServicesMemory from "../../in-memory/pet-services-memory"
import PetCreationServices from "../pet/pet-creation.services"
import OrgRegisterServices from "../org/org-register-service"
import OrgServicesMemory from "../../in-memory/org-services-memory"
import PetListForAdoptionInACityServices from "../pet/pet-list-for-adoption-in-a-city.services"
import { Org } from "@prisma/client"

let petServicesMemory: PetServicesMemory
let petListForAdptionInACityServices: PetListForAdoptionInACityServices

let orgServicesMemory: OrgServicesMemory
let orgRegisterServices: OrgRegisterServices

let petCreationServices: PetCreationServices

let firstOrg: Org

describe("Pet List for Adoption services", () => {
  beforeEach(async () => {
    petServicesMemory = new PetServicesMemory()
    orgServicesMemory = new OrgServicesMemory()

    orgRegisterServices = new OrgRegisterServices(orgServicesMemory)

    petCreationServices = new PetCreationServices(
      petServicesMemory,
      orgServicesMemory
    )

    petListForAdptionInACityServices = new PetListForAdoptionInACityServices(
      petServicesMemory,
      orgServicesMemory
    )

    const { org } = await orgRegisterServices.execute({
      name: "org-1",
      address: {
        city: "São Paulo",
        state: "SP",
        zipcode: "09002100",
        street: "test street 209",
      },
      contact_number: "11932288970",
      password: "123456",
    })

    firstOrg = org

    const { org: secondOrg } = await orgRegisterServices.execute({
      name: "org-2",
      address: {
        city: "Blumenau",
        state: "SC",
        zipcode: "09002100",
        street: "test street 209",
      },
      contact_number: "11933274970",
      password: "123456",
    })

    await petCreationServices.execute({
      orgId: firstOrg.id,
      orgName: firstOrg.name,
      color: "black",
      name: "sp cat",
      age: "6",
    })

    await petCreationServices.execute({
      orgId: secondOrg.id,
      orgName: secondOrg.name,
      color: "brown",
      name: "sc cat",
      age: "8",
    })
  })

  it("should be possible to list all pets for adoption in a city", async () => {
    const petsCityOne = await petListForAdptionInACityServices.execute({
      city: "São Paulo",
      state: "SP",
    })

    const petsCityTwo = await petListForAdptionInACityServices.execute({
      city: "Blumenau",
      state: "SC",
    })

    expect(petsCityOne).toEqual(
      expect.objectContaining({
        queryParameters: "São Paulo",
        page: 1,
        pets: [
          expect.objectContaining({
            orgName: petsCityOne.pets[0].orgName,
            name: petsCityOne.pets[0].name,
          }),
        ],
      })
    )

    expect(petsCityTwo).toEqual(
      expect.objectContaining({
        queryParameters: "Blumenau",
        page: 1,
        pets: [
          expect.objectContaining({
            orgName: petsCityTwo.pets[0].orgName,
            name: petsCityTwo.pets[0].name,
          }),
        ],
      })
    )
  })

  it("should be possible to list all pets for adoption in a city with page parameters", async () => {
    for (let i = 1; i <= 22; i++) {
      await petCreationServices.execute({
        orgId: firstOrg.id,
        orgName: firstOrg.name,
        color: "black",
        name: `cat-${i}`,
        age: "6",
      })
    }

    const filteredWithPagePets = await petListForAdptionInACityServices.execute(
      {
        city: "São Paulo",
        state: "SP",
        page: 3,
      }
    )

    expect(filteredWithPagePets.pets).toHaveLength(3)
    expect(filteredWithPagePets).toEqual(
      expect.objectContaining({
        queryParameters: "São Paulo",
        page: 3,
        pets: [
          expect.objectContaining({
            name: "cat-20",
          }),
          expect.objectContaining({
            name: "cat-21",
          }),
          expect.objectContaining({
            name: "cat-22",
          }),
        ],
      })
    )
  })

  it("should not be possible to list all pets for adoption in a city if state or city are not provided.", async () => {
    await expect(() => {
      return petListForAdptionInACityServices.execute({
        city: "",
        state: "",
      })
    }).rejects.toThrowError(
      "You must provide all informations. Provide a valid city and state."
    )
  })

  it("should throw an error if there are no ORG'S registered in the provided city and state yet.", async () => {
    await expect(() => {
      return petListForAdptionInACityServices.execute({
        city: "Copacabana",
        state: "RJ",
      })
    }).rejects.toThrowError(
      "There's no org's in this city and state available yet."
    )
  })
})
