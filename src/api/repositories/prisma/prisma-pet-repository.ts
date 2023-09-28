import { Prisma } from "@prisma/client";
import { PetRepository } from "../pet-repositories";
import prisma from "../../../lib/prisma";

export default class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data });

    return pet;
  }
}
