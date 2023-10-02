import PrismaOrgRepository from "../repositories/prisma/prisma-org-repository"
import PrismaPetRepository from "../repositories/prisma/prisma-pet-repository"
import PetListByCaracteristicsServices from "../services/pet/pet-list-by-caracteristics.services"

export function makePetListByCaracteristics() {
  const prismaPetRepository = new PrismaPetRepository()

  const petListByCaracteristics = new PetListByCaracteristicsServices(
    prismaPetRepository
  )

  return petListByCaracteristics
}
