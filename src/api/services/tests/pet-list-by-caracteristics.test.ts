import { beforeEach, describe, expect, it } from "vitest"
import PetServicesMemory from "../../in-memory/pet-services-memory"
import PetCreationServices from "../pet/pet-creation.services"
import OrgRegisterServices from "../org/org-register-service"
import OrgServicesMemory from "../../in-memory/org-services-memory"
import PetListByCaracteristicsServices from "../pet/pet-list-by-caracteristics.services"

let petServicesMemory: PetServicesMemory
let petListByCaracteristicsServices: PetListByCaracteristicsServices

let orgServicesMemory: OrgServicesMemory
let orgRegisterServices: OrgRegisterServices

let petCreationServices: PetCreationServices

describe("Pet List by caracteristics services", () => {
  beforeEach(async () => {
    petServicesMemory = new PetServicesMemory()
    orgServicesMemory = new OrgServicesMemory()

    orgRegisterServices = new OrgRegisterServices(orgServicesMemory)

    petCreationServices = new PetCreationServices(
      petServicesMemory,
      orgServicesMemory
    )

    petListByCaracteristicsServices = new PetListByCaracteristicsServices(
      petServicesMemory
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

    await petCreationServices.execute({
      orgId: org.id,
      orgName: org.name,
      color: "black",
      name: "cat-one",
      age: "1",
    })

    await petCreationServices.execute({
      orgId: org.id,
      orgName: org.name,
      color: "white",
      name: "cat-two",
      age: "4",
    })

    await petCreationServices.execute({
      orgId: org.id,
      orgName: org.name,
      color: "orange",
      name: "cat-three",
      age: "9",
    })

    await petCreationServices.execute({
      orgId: org.id,
      orgName: org.name,
      color: "black",
      name: "cat-four",
      age: "5",
    })
  })

  it("should be possible to filter pets by params", async () => {
    const filteredPetsColor = await petListByCaracteristicsServices.execute({
      city: "São Paulo",
      petData: {
        color: "orange",
      },
    })

    const filteredPetsAge = await petListByCaracteristicsServices.execute({
      city: "São Paulo",
      petData: {
        age: "5",
      },
    })

    const filteredPetsName = await petListByCaracteristicsServices.execute({
      city: "São Paulo",
      petData: {
        name: "cat-four",
      },
    })

    expect(filteredPetsColor).toEqual(
      expect.objectContaining({
        pets: [
          expect.objectContaining({
            color: "orange",
          }),
        ],
      })
    )

    expect(filteredPetsAge).toEqual(
      expect.objectContaining({
        pets: [
          expect.objectContaining({
            age: "5",
          }),
        ],
      })
    )

    expect(filteredPetsName).toEqual(
      expect.objectContaining({
        pets: [
          expect.objectContaining({
            name: "cat-four",
          }),
        ],
      })
    )
  })

  it("should throw an error if city are not provided", async () => {
    await expect(() => {
      return petListByCaracteristicsServices.execute({
        city: "",
        petData: {
          color: "orange",
        },
      })
    }).rejects.toThrowError("You must provide at least the city name.")
  })

  it("should throw an error if there are no parameters provided", async () => {
    await expect(() => {
      return petListByCaracteristicsServices.execute({
        city: "São Paulo",
        petData: {},
      })
    }).rejects.toThrowError("You must provide at least one filter parameter.")
  })
})
