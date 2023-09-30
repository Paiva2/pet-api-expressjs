import { Pet, Prisma } from "@prisma/client";

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findPetByOrgCity(orgName: string, page?: number): Promise<Pet[] | null>;
}
