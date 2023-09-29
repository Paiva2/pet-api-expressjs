import { Org } from "@prisma/client";
import OrgServicesMemory from "../../in-memory/org-services-memory";

interface OrgCreationServicesRequest {
  name: string;
  address: string;
  contact_number: string;
}

interface OrgCreationServicesResponse {
  org: Org;
}

export default class OrgCreationServices {
  constructor(private orgRepository: OrgServicesMemory) {}

  async execute({
    name,
    address,
    contact_number,
  }: OrgCreationServicesRequest): Promise<OrgCreationServicesResponse> {
    if (!name || !address || !contact_number) {
      throw new Error(
        "You must provide all Org informations to create a new one. Send the Org name, address and a contact number."
      );
    }

    const orgAlreadyExists = await this.orgRepository.findUnique(name);

    if (orgAlreadyExists) {
      throw new Error("An Org with this name is already registered.");
    }

    const org = await this.orgRepository.create({
      name,
      address,
      contact_number,
    });

    return { org };
  }
}
