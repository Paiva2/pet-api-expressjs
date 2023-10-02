import { PetRepository } from "../../repositories/pet-repositories"
import { OrgRepository } from "../../repositories/org-repositories"

interface PetListForAdoptionInACityServicesRequest {
  orgName: string
  petName: string
}

interface PetAdoptionContactServicesResponse {
  orgInformations: {
    orgName: string
    orgAddress: string
    orgContact: string
  }
}

export default class PetAdoptionContactServices {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository
  ) {}

  async execute({
    orgName,
    petName,
  }: PetListForAdoptionInACityServicesRequest): Promise<PetAdoptionContactServicesResponse> {
    if (!orgName || !petName) {
      throw new Error(
        "You must provide all informations. Provide a valid org name a pet name."
      )
    }

    const findOrg = await this.orgRepository.findUnique(orgName)

    if (!findOrg) {
      throw new Error("Org not found.")
    }

    const pet = await this.petRepository.findPetByOrgName(orgName, petName)

    if (!pet) {
      throw new Error("There's no pet's with this name in the provided Org.")
    }

    return {
      orgInformations: {
        orgName: findOrg?.name,
        orgAddress: findOrg?.address,
        orgContact: findOrg?.contact_number,
      },
    }
  }
}
