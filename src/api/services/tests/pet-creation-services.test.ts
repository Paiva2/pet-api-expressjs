import { beforeEach, describe, expect, it } from "vitest";
import PetServicesMemory from "../../in-memory/pet-services-memory";
import PetCreationServices from "../pet/pet-creation.services";
import OrgRegisterServices from "../org/org-register-service";
import OrgServicesMemory from "../../in-memory/org-services-memory";
import { Org } from "@prisma/client";

let petServicesMemory: PetServicesMemory;
let petCreationServices: PetCreationServices;

let orgServicesMemory: OrgServicesMemory;
let orgRegisterServices: OrgRegisterServices;

let newOrg: Org;

describe("Pet creation services", () => {
  beforeEach(async () => {
    petServicesMemory = new PetServicesMemory();
    orgServicesMemory = new OrgServicesMemory();

    orgRegisterServices = new OrgRegisterServices(orgServicesMemory);
    petCreationServices = new PetCreationServices(
      petServicesMemory,
      orgServicesMemory
    );

    const { org } = await orgRegisterServices.execute({
      name: "org-1",
      address: {
        city: "São Paulo",
        state: "SP",
      },
      contact_number: "11932288970",
      password: "123456",
    });

    newOrg = org;
  });

  it("should be possible to create a new pet", async () => {
    const { pet } = await petCreationServices.execute({
      orgId: newOrg.id,
      orgName: newOrg.name,
      color: "brown",
      name: "funny cat",
      age: "5",
    });

    expect(pet).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        id: expect.any(String),
      })
    );
  });

  it("should not be possible to create a new pet if informed org name doesnt exist", async () => {
    await expect(() => {
      return petCreationServices.execute({
        orgId: "999",
        orgName: "org-2",
        color: "brown",
        name: "funny cat",
        age: "5",
      });
    }).rejects.toThrowError(
      "Org not found. You must provide an valid Org name before register a new cat."
    );
  });

  it("should not be possible to create a new pet if all pet informations are not valid.", async () => {
    await expect(() => {
      return petCreationServices.execute({
        orgId: newOrg.id,
        orgName: newOrg.name,
        color: "",
        name: "",
        age: "",
      });
    }).rejects.toThrowError(
      "You must provide all Pet informations. Provide a valid name, age and color."
    );
  });
});
