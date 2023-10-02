import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import server from "../../../server"
import app from "../../../app"

describe("Pet adoption controller", () => {
  let token: string

  beforeAll(async () => {
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

    const orgToken = await request(app).post("/auth").send({
      orgName: "org-1",
      password: "123456",
    })

    token = orgToken.headers["set-cookie"]

    await request(app).post("/new-pet").set("Cookie", token).send({
      age: "5",
      petName: "new cat for test",
      color: "black",
    })
  })

  afterAll(() => {
    server.close()
  })

  it("should be possible to get org contact based on pet name.", async () => {
    const orgContact = await request(app).post("/pet-contact").send({
      petName: "new cat for test",
      orgName: "org-1",
    })

    expect(orgContact.statusCode).toBe(200)
    expect(orgContact.body.data).toEqual(
      expect.objectContaining({
        orgInformations: expect.objectContaining({
          orgName: "org-1",
        }),
      })
    )
  })

  it("should not be possible to get org contact based on pet name if org name or pet name are invalid.", async () => {
    const res = await request(app).post("/pet-contact").send({
      petName: "new cat for test",
      orgName: "",
    })

    expect(res.statusCode).toBe(422)
    expect(res.body.message).toEqual(
      expect.arrayContaining(["Org name invalid."])
    )
  })

  it("should not be possible to get org contact based on pet name if there are no pets with provided name on org.", async () => {
    const res = await request(app).post("/pet-contact").send({
      petName: "inexistent pet",
      orgName: "org-1",
    })

    expect(res.statusCode).toBe(404)
    expect(res.body.message).toEqual(
      "There's no pet's with this name in the provided Org."
    )
  })

  it("should not be possible to get org contact based on pet name if there are no org with provided name.", async () => {
    const res = await request(app).post("/pet-contact").send({
      petName: "new cat for test",
      orgName: "inexistent org",
    })

    expect(res.statusCode).toBe(404)
    expect(res.body.message).toEqual("Org not found.")
  })
})
