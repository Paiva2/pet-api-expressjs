import PrismaOrgRepository from "../repositories/prisma/prisma-org-repository"
import PrismaPetRepository from "../repositories/prisma/prisma-pet-repository"
import PetAdoptionContactServices from "../services/pet/pet-adoption-contact-services"

export function makePetAdoptionServices() {
  const prismaPetRepository = new PrismaPetRepository()
  const prismaOrgRepository = new PrismaOrgRepository()

  const petAdoptionContactServices = new PetAdoptionContactServices(
    prismaPetRepository,
    prismaOrgRepository
  )

  return petAdoptionContactServices
}
