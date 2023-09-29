import { Pet } from "@prisma/client";
import PrismaPetRepository from "../../repositories/prisma/prisma-pet-repository";
import PetServicesMemory from "../../in-memory/pet-services-memory";
import { OrgRepository } from "../../repositories/org-repositories";

interface PetCreationServicesRequest {
  name: string;
  color: string;
  age: string;
  orgName: string;
}

interface PetCreationServicesResponse {
  pet: Pet;
}

export default class PetCreationServices {
  constructor(
    private petRepository: PrismaPetRepository | PetServicesMemory,
    private orgRepository: OrgRepository
  ) {}

  async execute({
    age,
    color,
    name,
    orgName,
  }: PetCreationServicesRequest): Promise<PetCreationServicesResponse> {
    //TODO
    /*     const findOrg = this.orgRepository.findUnique(orgName);
     */
    /*     if (!findOrg) {
      throw new Error(
        "Org not found. You must provide an valid Org name before register a new cat."
      );
    } */

    const pet = await this.petRepository.create({
      age,
      color,
      name,
      orgName,
    });

    return { pet };
  }
}
