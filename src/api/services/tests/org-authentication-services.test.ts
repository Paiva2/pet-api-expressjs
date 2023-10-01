import { beforeEach, describe, expect, it } from "vitest"
import OrgServicesMemory from "../../in-memory/org-services-memory"
import OrgCreationServices from "../org/org-register-service"
import OrgAuthenticationServices from "../org/org-authentication-service"

let orgServicesMemory: OrgServicesMemory
let orgCreationServices: OrgCreationServices
let orgAuthenticationServices: OrgAuthenticationServices

describe("Org authentication services", () => {
  beforeEach(async () => {
    orgServicesMemory = new OrgServicesMemory()
    orgCreationServices = new OrgCreationServices(orgServicesMemory)
    orgAuthenticationServices = new OrgAuthenticationServices(orgServicesMemory)

    await orgCreationServices.execute({
      name: "org-1",
      address: {
        city: "São Paulo",
        state: "SP",
        zipcode: "09002100",
        street: "test street 209",
      },
      contact_number: "(11) 9999-9999",
      password: "123456",
    })
  })

  it("should be possible to authenticate as an org", async () => {
    const authenticateOrg = await orgAuthenticationServices.execute({
      orgName: "org-1",
      password: "123456",
    })

    expect(authenticateOrg).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        id: expect.any(String),
      })
    )
  })

  it("should not be possible to authenticate as an org if org doesnt exists", async () => {
    await expect(() => {
      return orgAuthenticationServices.execute({
        orgName: "inexistent org",
        password: "123456",
      })
    }).rejects.toThrowError("Invalid credentials.")
  })

  it("should not be possible to authenticate as an org if org name or password are not informed", async () => {
    await expect(() => {
      return orgAuthenticationServices.execute({
        orgName: "",
        password: "",
      })
    }).rejects.toThrowError(
      "You must provide all Org informations to login. Fill the Org name and Password."
    )
  })
})
