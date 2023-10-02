import PrismaOrgRepository from "../repositories/prisma/prisma-org-repository"
import PrismaPetRepository from "../repositories/prisma/prisma-pet-repository"
import PetCreationServices from "../services/pet/pet-creation.services"

export function makePetCreationServices() {
  const prismaPetRepository = new PrismaPetRepository()
  const prismaOrgRepository = new PrismaOrgRepository()

  const petCreationServices = new PetCreationServices(
    prismaPetRepository,
    prismaOrgRepository
  )

  return petCreationServices
}
