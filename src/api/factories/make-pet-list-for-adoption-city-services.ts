import PrismaOrgRepository from "../repositories/prisma/prisma-org-repository"
import PrismaPetRepository from "../repositories/prisma/prisma-pet-repository"
import PetListForAdoptionInACityServices from "../services/pet/pet-list-for-adoption-in-a-city.services"

export function makePetListForAdoptionCityServices() {
  const prismaPetRepository = new PrismaPetRepository()
  const prismaOrgRepository = new PrismaOrgRepository()

  const petForAdoptionInACityServices = new PetListForAdoptionInACityServices(
    prismaPetRepository,
    prismaOrgRepository
  )

  return petForAdoptionInACityServices
}
