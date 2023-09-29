import { beforeEach, describe, expect, it } from "vitest";
import PetServicesMemory from "../../in-memory/pet-services-memory";
import PetCreationServices from "../pet/pet-creation.services";
import { PetRepository } from "../../repositories/pet-repositories";

let petServicesMemory: PetRepository;
let petCreationServices: PetCreationServices;

describe("Pet creation services", () => {
  beforeEach(() => {
    petServicesMemory = new PetServicesMemory();
    petCreationServices = new PetCreationServices(petServicesMemory);
  });

  it("should be possible to create a new pet", async () => {
    const { pet } = await petCreationServices.execute({
      age: "5",
      color: "brown",
      name: "funny catss",
      orgName: "org test",
    });

    expect(pet).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        id: expect.any(String),
      })
    );
  });
});
