import PetServicesMemory from "../../in-memory/pet-services-memory";
import OrgServicesMemory from "../../in-memory/org-services-memory";

interface PetListForAdoptionInACityServicesRequest {
  orgName: string;
  petName: string;
}

interface PetAdoptionContactServicesResponse {
  orgInformations: {
    orgName: string;
    orgAddress: string;
    orgContact: string;
  };
}

export default class PetAdoptionContactServices {
  constructor(
    private petRepository: PetServicesMemory,
    private orgRepository: OrgServicesMemory
  ) {}

  async execute({
    orgName,
    petName,
  }: PetListForAdoptionInACityServicesRequest): Promise<PetAdoptionContactServicesResponse> {
    if (!orgName || !petName) {
      throw new Error(
        "You must provide all informations. Provide a valid org name a pet name."
      );
    }

    const pet = await this.petRepository.findPetByOrgName(orgName, petName);

    if (!pet) {
      throw new Error("There's no pet's with this name in the provided Org.");
    }

    const findOrg = await this.orgRepository.findUnique(pet.orgName);

    if (!findOrg) {
      throw new Error("Org not found.");
    }

    return {
      orgInformations: {
        orgName: findOrg?.name,
        orgAddress: findOrg?.address,
        orgContact: findOrg?.contact_number,
      },
    };
  }
}
