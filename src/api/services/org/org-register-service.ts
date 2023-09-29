import { Org } from "@prisma/client";
import OrgServicesMemory from "../../in-memory/org-services-memory";
import { hash } from "bcrypt";

interface OrgRegisterServicesRequest {
  name: string;
  address: string;
  contact_number: string;
  password: string;
}

interface OrgRegisterServicesResponse {
  org: Org;
}

export default class OrgRegisterServices {
  constructor(private orgRepository: OrgServicesMemory) {}

  async execute({
    name,
    address,
    contact_number,
    password,
  }: OrgRegisterServicesRequest): Promise<OrgRegisterServicesResponse> {
    if (!name || !address || !contact_number || !password) {
      throw new Error(
        "You must provide all Org informations to create a new one. Send the Org name, address a contact number and a password."
      );
    }

    const orgAlreadyExists = await this.orgRepository.findUnique(name);

    if (orgAlreadyExists) {
      throw new Error("An Org with this name is already registered.");
    }

    const hashed_password = await hash(password, 6);

    const org = await this.orgRepository.create({
      name,
      address,
      contact_number,
      password: hashed_password,
    });

    return { org };
  }
}
