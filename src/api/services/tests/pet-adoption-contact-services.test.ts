import { beforeEach, describe, expect, it } from "vitest"
import PetServicesMemory from "../../in-memory/pet-services-memory"
import PetCreationServices from "../pet/pet-creation.services"
import OrgRegisterServices from "../org/org-register-service"
import OrgServicesMemory from "../../in-memory/org-services-memory"
import PetAdoptionContactServices from "../pet/pet-adoption-contact-services"

let petServicesMemory: PetServicesMemory
let petAdoptionContactServices: PetAdoptionContactServices

let orgServicesMemory: OrgServicesMemory
let orgRegisterServices: OrgRegisterServices

let petCreationServices: PetCreationServices

describe("Pet adoption contact services", () => {
  beforeEach(async () => {
    petServicesMemory = new PetServicesMemory()
    orgServicesMemory = new OrgServicesMemory()

    orgRegisterServices = new OrgRegisterServices(orgServicesMemory)

    petCreationServices = new PetCreationServices(
      petServicesMemory,
      orgServicesMemory
    )

    petAdoptionContactServices = new PetAdoptionContactServices(
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

    await petCreationServices.execute({
      orgId: org.id,
      orgName: org.name,
      color: "black",
      name: "cat for adoption",
      age: "6",
    })
  })

  it("should be possible get org informations by pet name for adoption", async () => {
    const orgWithPetForAdoption = await petAdoptionContactServices.execute({
      orgName: "org-1",
      petName: "cat for adoption",
    })

    expect(orgWithPetForAdoption).toEqual({
      orgInformations: expect.objectContaining({
        orgName: "org-1",
        orgAddress: "test street 209;09002100;São Paulo;SP",
        orgContact: "11932288970",
      }),
    })
  })

  it("should throw an error if pet name or org name are not provided.", async () => {
    await expect(() => {
      return petAdoptionContactServices.execute({
        orgName: "",
        petName: "",
      })
    }).rejects.toThrowError(
      "You must provide all informations. Provide a valid org name a pet name."
    )
  })

  it("should throw an error if pet name doesnt exists on org.", async () => {
    await expect(() => {
      return petAdoptionContactServices.execute({
        orgName: "org-1",
        petName: "inexistent pet",
      })
    }).rejects.toThrowError(
      "There's no pet's with this name in the provided Org."
    )
  })

  it("should throw an error if org doesnt exist.", async () => {
    await expect(() => {
      return petAdoptionContactServices.execute({
        orgName: "inexistent org",
        petName: "cat for adoption",
      })
    }).rejects.toThrowError(
      "There's no pet's with this name in the provided Org."
    )
  })
})
