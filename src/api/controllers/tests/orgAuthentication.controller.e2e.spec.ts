import { afterAll, beforeEach, describe, expect, it } from "vitest"
import request from "supertest"
import app from "../../../app"
import server from "../../../server"

describe("Org authentication controller", () => {
  beforeEach(async () => {
    await request(app)
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
  })

  afterAll(() => {
    server.close()
  })

  it("should be possible to sign in as an org", async () => {
    const orgToken = await request(app).post("/auth").send({
      orgName: "org-1",
      password: "123456",
    })

    expect(orgToken.statusCode).toBe(200)
    expect(orgToken.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        id: expect.any(String),
      })
    )
  })

  it("should not be possible to sign in as an org if any information are invalid", async () => {
    const res = await request(app).post("/auth").send({
      orgName: "",
      password: "12345",
    })

    expect(res.statusCode).toBe(422)
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        "Org name invalid.",
        "Password must have at least 6 characters.",
      ])
    )
  })
})
