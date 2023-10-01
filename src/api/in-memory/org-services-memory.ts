import { Org, Prisma } from "@prisma/client"
import { randomUUID } from "crypto"
import { OrgRepository } from "../repositories/org-repositories"

export default class OrgServicesMemory implements OrgRepository {
  private orgs: Org[] = []

  async findOrgByCity(orgCity: string, orgState: string) {
    const searchedOrgByCity = this.orgs.find((org) => {
      const [_, __, city, state] = org.address.split(";")

      return city === orgCity && state === orgState
    })

    if (!searchedOrgByCity) return null

    return searchedOrgByCity
  }

  async findOrgById(orgName: string, orgId: string) {
    const searchedOrgById = this.orgs.find(
      (org) => org.id === orgId && org.name === orgName
    )

    if (!searchedOrgById) return null

    return searchedOrgById
  }

  async findUnique(orgName: string) {
    const searchedOrg = this.orgs.find((org) => org.name === orgName)

    if (!searchedOrg) return null

    return searchedOrg
  }

  async create(data: Prisma.OrgUncheckedCreateInput) {
    const newOrg = {
      id: randomUUID(),
      name: data.name,
      password: data.password!,
      address: data.address,
      contact_number: data.contact_number,
      createdAt: new Date(),
    }

    this.orgs.push(newOrg)

    return newOrg
  }
}
