import { Pet } from "@prisma/client";
import PrismaPetRepository from "../../repositories/prisma/prisma-pet-repository";

interface PetServiceRequest {
  name: string;
  color: string;
  age: string;
  orgName: string;
}

interface PetServiceResponse {
  pet: Pet;
}

export default class PetServices {
  constructor(private petRepository: PrismaPetRepository) {}

  async execute({
    age,
    color,
    name,
    orgName,
  }: PetServiceRequest): Promise<PetServiceResponse> {
    const pet = await this.petRepository.create({
      age,
      color,
      name,
      orgName,
    });

    return { pet };
  }
}
