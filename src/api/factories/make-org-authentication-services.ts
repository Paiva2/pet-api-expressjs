import PrismaOrgRepository from "../repositories/prisma/prisma-org-repository"
import OrgAuthenticationServices from "../services/org/org-authentication-service"

export function makeOrgAuthenticationServices() {
  const prismaOrgRepository = new PrismaOrgRepository()
  const orgAuthenticationServices = new OrgAuthenticationServices(
    prismaOrgRepository
  )

  return orgAuthenticationServices
}
