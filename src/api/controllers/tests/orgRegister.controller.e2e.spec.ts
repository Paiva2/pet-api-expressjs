import { afterAll, describe, expect, it } from "vitest"
import request from "supertest"
import server from "../../../server"
import app from "../../../app"

describe("Org register controller", () => {
  afterAll(() => {
    server.close()
  })

  it("should be possible to register as an org", async () => {
    const org = await request(app)
      .post("/register-org")
      .send({
        orgName: "org-1",
        password: "123456",
        contact_number: "11932246808",
        address: {
          street: "test street, 230",
          zipcode: "029914242",
          city: "São Paulo",
          state: "SP",
        },
      })

    expect(org.statusCode).toBe(201)
  })

  it("should not  be possible to register as an org if any body information are invalid", async () => {
    const res = await request(app)
      .post("/register-org")
      .send({
        orgName: "",
        password: "123456",
        contact_number: "",
        address: {
          street: "test street, 230",
          zipcode: "029914242",
          city: "São Paulo",
          state: "SP",
        },
      })

    expect(res.statusCode).toBe(422)
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        "Org name invalid.",
        "Org contact number invalid.",
      ])
    )
  })
})
