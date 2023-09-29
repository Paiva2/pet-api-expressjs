import { beforeEach, describe, expect, it } from "vitest";
import OrgServicesMemory from "../../in-memory/org-services-memory";
import OrgCreationServices from "../org/org-creation-service";

let orgServicesMemory: OrgServicesMemory;
let orgCreationServices: OrgCreationServices;

describe("Org creation services", () => {
  beforeEach(() => {
    orgServicesMemory = new OrgServicesMemory();
    orgCreationServices = new OrgCreationServices(orgServicesMemory);
  });

  it("should be possible to create a org", async () => {
    const { org } = await orgCreationServices.execute({
      name: "org-1",
      address: "Rua dos Ralideos;239;Jd.Shangrilá;São Paulo;SP;02990-100",
      contact_number: "(11) 93224-6808",
    });

    expect(org).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        id: expect.any(String),
      })
    );
  });

  it("should not be possible to create a org if the org name already exists", async () => {
    await orgCreationServices.execute({
      name: "org-1",
      address: "Rua dos Ralideos;239;Jd.Shangrilá;São Paulo;SP;02990-100",
      contact_number: "(11) 93224-6808",
    });

    await expect(() => {
      return orgCreationServices.execute({
        name: "org-1",
        address: "Rua dos Ralideos;239;Jd.Shangrilá;São Paulo;SP;02990-100",
        contact_number: "(11) 93224-6808",
      });
    }).rejects.toThrowError("An Org with this name is already registered.");
  });

  it("should not be possible to create a org if parameters are not passed correctly", async () => {
    await expect(() => {
      return orgCreationServices.execute({
        name: "a",
        address: "",
        contact_number: "",
      });
    }).rejects.toThrowError(
      "You must provide all Org informations to create a new one. Send the Org name, address and a contact number."
    );
  });
});
