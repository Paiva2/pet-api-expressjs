import { Pet, Prisma } from "@prisma/client";
import { PetRepository } from "../repositories/pet-repositories";
import { randomUUID } from "crypto";

export default class PetServicesMemory implements PetRepository {
  private pets: Pet[] = [];

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
