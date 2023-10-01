import PrismaOrgRepository from "../repositories/prisma/prisma-org-repository"
import OrgRegisterServices from "../services/org/org-register-service"

export function makeOrgRegisterServices() {
  const prismaOrgRepository = new PrismaOrgRepository()
  const orgRegisterServices = new OrgRegisterServices(prismaOrgRepository)

  return orgRegisterServices
}
