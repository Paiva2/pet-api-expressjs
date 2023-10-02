import { Prisma } from "@prisma/client"
import { PetRepository } from "../pet-repositories"
import prisma from "../../../lib/prisma"

export default class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })

    return pet
  }

  async findPetByOrgCity(orgName: string, page = 1) {
    const petByOrgCity = await prisma.pet.findMany({
      where: {
        orgName,
      },
      skip: (page - 1) * 10,
      take: page * 10,
    })

    return petByOrgCity
  }

  async findPetByOrgName(orgName: string, petName: string) {
    const petByOrgName = await prisma.pet.findFirst({
      where: {
        name: petName,
        AND: {
          orgName,
        },
      },
    })

    return petByOrgName
  }

  async findPetByParameters(petData: {
    color?: string | undefined
    age?: string | undefined
    name?: string | undefined
  }) {
    const { color, age, name } = petData

    const petFilter = await prisma.pet.findMany({
      where: {
        color,
        age,
        name,
      },
    })

    return petFilter
  }
}
