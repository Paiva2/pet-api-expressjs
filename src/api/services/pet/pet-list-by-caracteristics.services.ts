import PetServicesMemory from "../../in-memory/pet-services-memory";
import { Pet } from "@prisma/client";

interface PetListByCaracteristicsServicesRequest {
  city: string;
  petData: {
    color?: string;
    age?: string;
    name?: string;
  };
}

interface PetListByCaracteristicsServicesResponse {
  pets: Pet[];
}

export default class PetListByCaracteristicsServices {
  constructor(private petRepository: PetServicesMemory) {}

  async execute({
    city,
    petData,
  }: PetListByCaracteristicsServicesRequest): Promise<PetListByCaracteristicsServicesResponse> {
    const { age, color, name } = petData;

    if (!city) {
      throw new Error("You must provide at least the city name.");
    } else if (!age && !color && !name) {
      throw new Error("You must provide at least one filter parameter.");
    }

    const pets = await this.petRepository.findPetByParameters(petData);

    return {
      pets,
    };
  }
}
