import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import server from "../../../server"
import app from "../../../app"

describe("Pet register controller", () => {
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
  })

  afterAll(() => {
    server.close()
  })

  it("should be possible to register a new pet for adoption in an org.", async () => {
    const org = await request(app).post("/new-pet").set("Cookie", token).send({
      age: "5",
      petName: "new cat for test",
      color: "black",
    })

    expect(org.statusCode).toBe(201)
  })

  it("should not be possible to register a new pet for adoption in an org with an invalid org token.", async () => {
    const res = await request(app).post("/new-pet").send({
      age: "5",
      petName: "new cat for test",
      color: "black",
    })

    expect(res.statusCode).toBe(401)
    expect(res.body.message).toEqual("Invalid token.")
  })

  it("should not be possible to register a new pet for adoption in an org if any pet caracteristic is invalid.", async () => {
    const res = await request(app).post("/new-pet").set("Cookie", token).send({
      age: "",
      petName: "new cat for test",
      color: "black",
    })

    expect(res.statusCode).toBe(422)
    expect(res.body.message).toEqual(
      expect.arrayContaining(["Pet age invalid."])
    )
  })
})
