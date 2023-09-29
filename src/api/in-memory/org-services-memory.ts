import { Org, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { OrgRepository } from "../repositories/org-repositories";

export default class OrgServicesMemory implements OrgRepository {
  private orgs: Org[] = [];

  async findUnique(orgName: string) {
    const searchedOrg = this.orgs.find((org) => org.name === orgName);

    if (!searchedOrg) return null;

    return searchedOrg;
  }

  async create(data: Prisma.OrgUncheckedCreateInput) {
    const newOrg = {
      id: randomUUID(),
      name: data.name,
      address: data.address,
      contact_number: data.contact_number,
      createdAt: new Date(),
    };

    this.orgs.push(newOrg);

    return newOrg;
  }
}
