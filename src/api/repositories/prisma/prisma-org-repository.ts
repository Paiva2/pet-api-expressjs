import { Org, Prisma } from "@prisma/client"
import { OrgRepository } from "../org-repositories"
import prisma from "../../../lib/prisma"

export default class PrismaOrgRepository implements OrgRepository {
  async create(data: Prisma.OrgUncheckedCreateInput) {
    const newOrg = await prisma.org.create({
      data,
    })

    return newOrg
  }

  async findOrgByCity(city: string, state: string) {
    return null
  }

  async findOrgById(orgName: string, orgId: string) {
    return null
  }

  async findUnique(orgName: string) {
    const checkIfOrgExist = await prisma.org.findFirst({
      where: {
        name: orgName,
      },
    })

    return checkIfOrgExist
  }
}
