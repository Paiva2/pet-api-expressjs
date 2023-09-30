import { Pet } from "@prisma/client";
import PetServicesMemory from "../../in-memory/pet-services-memory";
import { OrgRepository } from "../../repositories/org-repositories";

interface PetCreationServicesRequest {
  name: string;
  color: string;
  age: string;
  orgName: string;
  orgId: string;
}

interface PetCreationServicesResponse {
  pet: Pet;
}

export default class PetCreationServices {
  constructor(
    private petRepository: PetServicesMemory,
    private orgRepository: OrgRepository
  ) {}

  async execute({
    age,
    color,
    name,
    orgName,
    orgId,
  }: PetCreationServicesRequest): Promise<PetCreationServicesResponse> {
    const findOrg = await this.orgRepository.findOrgById(orgName, orgId);

    if (!findOrg) {
      throw new Error(
        "Org not found. You must provide an valid Org name before register a new cat."
      );
    }

    if (!age || !color || !name) {
      throw new Error(
        "You must provide all Pet informations. Provide a valid name, age and color."
      );
    }

    const pet = await this.petRepository.create({
      age,
      color,
      name,
      orgName,
    });

    return { pet };
  }
}
