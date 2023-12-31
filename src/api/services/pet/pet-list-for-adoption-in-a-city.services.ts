import { Pet } from "@prisma/client"
import { PetRepository } from "../../repositories/pet-repositories"
import { OrgRepository } from "../../repositories/org-repositories"

interface PetListForAdoptionInACityServicesRequest {
  city: string
  state: string
  page?: number
}

interface PetListForAdoptionInACityServicesResponse {
  queryParameters: string
  pets: Pet[]
  page: number
}

export default class PetListForAdoptionInACityServices {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository
  ) {}

  async execute({
    city,
    state,
    page = 1,
  }: PetListForAdoptionInACityServicesRequest): Promise<PetListForAdoptionInACityServicesResponse> {
    if (!city || !state) {
      throw new Error(
        "You must provide all informations. Provide a valid city and state."
      )
    }

    const findOrg = await this.orgRepository.findOrgByCity(city, state)

    if (!findOrg) {
      throw new Error("There's no org's in this city and state available yet.")
    }

    const pets = await this.petRepository.findPetByOrgCity(findOrg.name, page)

    if (!pets) {
      throw new Error(
        "There's no pet's in this city and state available for adoption yet."
      )
    }

    return {
      queryParameters: city,
      page,
      pets,
    }
  }
}
