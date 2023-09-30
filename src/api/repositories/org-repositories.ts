import { Org, Prisma } from "@prisma/client";

export interface OrgRepository {
  create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>;
  findUnique(orgName: string): Promise<Org | null>;
  findOrgById(orgName: string, orgId: string): Promise<Org | null>;
  findOrgByCity(city: string, state: string): Promise<Org | null>;
}
