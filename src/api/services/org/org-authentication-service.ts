import OrgServicesMemory from "../../in-memory/org-services-memory";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import envVariables from "../../../env/envVariables";

interface OrgAuthenticationServicesRequest {
  orgName: string;
  password: string;
}

interface OrgAuthenticationServicesResponse {
  token: string;
  id: string;
}

export default class OrgAuthenticationServices {
  constructor(private orgRepository: OrgServicesMemory) {}

  async execute({
    orgName,
    password,
  }: OrgAuthenticationServicesRequest): Promise<OrgAuthenticationServicesResponse> {
    if (!orgName || !password) {
      throw new Error(
        "You must provide all Org informations to login. Fill the Org name and Password."
      );
    }

    const findOrg = await this.orgRepository.findUnique(orgName);

    if (!findOrg || !findOrg.password) {
      throw new Error("Invalid credentials.");
    }

    const passwordMatches = await compare(password, findOrg.password);

    if (!passwordMatches) {
      throw new Error("Invalid credentials.");
    }

    const token = jwt.sign(
      {
        data: {
          id: findOrg.id,
          name: findOrg.name,
        },
      },
      envVariables.JWT_SECRET as string,
      { expiresIn: "7h" }
    );

    return { token, id: findOrg.id };
  }
}
