import { beforeEach, describe, expect, it } from "vitest";
import OrgServicesMemory from "../../in-memory/org-services-memory";
import OrgCreationServices from "../org/org-register-service";
import { hash } from "bcrypt";

let orgServicesMemory: OrgServicesMemory;
let orgCreationServices: OrgCreationServices;

describe("Org register services", () => {
  beforeEach(() => {
    orgServicesMemory = new OrgServicesMemory();
    orgCreationServices = new OrgCreationServices(orgServicesMemory);
  });

  it("should be possible to register a org", async () => {
    const hashed_password = await hash("123456", 6);

    const { org } = await orgCreationServices.execute({
      name: "org-1",
      address: {
        city: "São Paulo",
        state: "SP",
      },
      contact_number: "(11) 93224-6808",
      password: hashed_password,
    });

    expect(org).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        id: expect.any(String),
      })
    );
  });

  it("should not be possible to register a org if the org name already exists", async () => {
    const hashed_password = await hash("123456", 6);

    await orgCreationServices.execute({
      name: "org-1",
      address: {
        city: "São Paulo",
        state: "SP",
      },
      contact_number: "(11) 93224-6808",
      password: hashed_password,
    });

    await expect(() => {
      return orgCreationServices.execute({
        name: "org-1",
        address: {
          city: "São Paulo",
          state: "SP",
        },
        contact_number: "(11) 93224-6808",
        password: hashed_password,
      });
    }).rejects.toThrowError("An Org with this name is already registered.");
  });

  it("should not be possible to register a org if parameters are not passed correctly", async () => {
    await expect(() => {
      return orgCreationServices.execute({
        name: "",
        address: {
          city: "São Paulo",
          state: "SP",
        },
        contact_number: "",
        password: "",
      });
    }).rejects.toThrowError(
      "You must provide all Org informations to create a new one. Send the Org name, address, a contact number and a password."
    );
  });
});
