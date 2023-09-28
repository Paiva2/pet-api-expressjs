import PrismaPetRepository from "../repositories/prisma/prisma-pet-repository";
import PetServices from "../services/pet/pet.services";

export function makeCreatePetServices() {
  const prismaPetRepository = new PrismaPetRepository();
  const createPetServices = new PetServices(prismaPetRepository);

  return createPetServices;
}
