import { Pet } from "@prisma/client";
import PrismaPetRepository from "../../repositories/prisma/prisma-pet-repository";
import PetServicesMemory from "../../in-memory/pet-services-memory";

interface PetCreationServicesRequest {
  name: string;
  color: string;
  age: string;
  orgName: string;
}

interface PetCreationServicesResponse {
  pet: Pet;
}

export default class PetCreationServices {
  constructor(private petRepository: PrismaPetRepository | PetServicesMemory) {}

  async execute({
    age,
    color,
    name,
    orgName,
  }: PetCreationServicesRequest): Promise<PetCreationServicesResponse> {
    const pet = await this.petRepository.create({
      age,
      color,
      name,
      orgName,
    });

    return { pet };
  }
}
