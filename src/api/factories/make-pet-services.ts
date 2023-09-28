import PrismaPetRepository from "../repositories/prisma/prisma-pet-repository";
import PetCreationServices from "../services/pet/pet-creation.services";

export function makePetCreationServices() {
  const prismaPetRepository = new PrismaPetRepository();
  const petCreationServices = new PetCreationServices(prismaPetRepository);

  return petCreationServices;
}
