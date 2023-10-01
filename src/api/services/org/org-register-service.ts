import { Org } from "@prisma/client"
import { hash } from "bcryptjs"
import { OrgRepository } from "../../repositories/org-repositories"

interface OrgRegisterServicesRequest {
  name: string
  address: {
    city: string
    street: string
    zipcode: string
    state: string
  }
  contact_number: string
  password: string
}

interface OrgRegisterServicesResponse {
  org: Org
}

export default class OrgRegisterServices {
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    name,
    address,
    contact_number,
    password,
  }: OrgRegisterServicesRequest): Promise<OrgRegisterServicesResponse> {
    if (
      !name ||
      !address.city ||
      !address.state ||
      !address.street ||
      !address.zipcode ||
      !contact_number ||
      !password
    ) {
      throw new Error(
        "You must provide all Org informations to create a new one. Send the Org name, address, a contact number and a password."
      )
    }

    const orgAddress = {
      city: address.city,
      state: address.state,
      street: address.street,
      zipcode: address.zipcode,
    }

    const orgAlreadyExists = await this.orgRepository.findUnique(name)

    if (orgAlreadyExists) {
      throw new Error("An Org with this name is already registered.")
    }

    const hashed_password = await hash(password, 6)

    const org = await this.orgRepository.create({
      name,
      address: `${orgAddress.street};${orgAddress.zipcode};${orgAddress.city};${orgAddress.state}`,
      contact_number,
      password: hashed_password,
    })

    return { org }
  }
}
