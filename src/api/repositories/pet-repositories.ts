import { Pet, Prisma } from "@prisma/client"

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findPetByOrgCity(orgName: string, page?: number): Promise<Pet[] | null>
  findPetByOrgName(orgName: string, petName: string): Promise<Pet | null>
  findPetByParameters(petData: {
    color?: string
    age?: string
    name?: string
  }): Promise<Pet[]>
}
