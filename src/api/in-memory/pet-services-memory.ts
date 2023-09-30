import { Pet, Prisma } from "@prisma/client";
import { PetRepository } from "../repositories/pet-repositories";
import { randomUUID } from "crypto";

export default class PetServicesMemory implements PetRepository {
  private pets: Pet[] = [];

  async findPetByOrgCity(orgName: string, page = 1) {
    const petsForAdoptionInThisOrg = this.pets
      .filter((pet) => {
        return pet.orgName === orgName;
      })
      .slice((page - 1) * 10, page * 10);

    if (!petsForAdoptionInThisOrg.length) {
      return [];
    }

    return petsForAdoptionInThisOrg;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const newPet = {
      id: randomUUID(),
      age: data.age,
      color: data.color,
      name: data.name,
      orgName: data.orgName,
      createdAt: new Date(),
    };

    this.pets.push(newPet);

    return newPet;
  }
}
