import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import server from "../../../server"
import app from "../../../app"
import prisma from "../../../lib/prisma"

describe("Pet List based on search parameters", () => {
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
      petName: "white shark",
      color: "white",
    })

    await request(app).post("/new-pet").set("Cookie", token).send({
      age: "6",
      petName: "brown cat",
      color: "brown",
    })

    await request(app).post("/new-pet").set("Cookie", token).send({
      age: "8",
      petName: "black shark",
      color: "black",
    })
  })

  afterAll(() => {
    server.close()
  })

  it("should be possible to get pets based on city and optional parameters", async () => {
    const firstSearch = await request(app)
      .get("/pets/São Paulo?color=brown")
      .send()

    expect(firstSearch.statusCode).toBe(200)

    expect(firstSearch.body.data).toEqual({
      pets: [
        expect.objectContaining({
          id: expect.any(String),
          color: "brown",
        }),
      ],
    })

    const secondSearch = await request(app)
      .get("/pets/São Paulo?color=white")
      .send()

    expect(secondSearch.statusCode).toBe(200)

    expect(secondSearch.body.data).toEqual({
      pets: [
        expect.objectContaining({
          id: expect.any(String),
          color: "white",
        }),
      ],
    })

    const thirdSearch = await request(app)
      .get("/pets/São Paulo?name=black shark")
      .send()

    expect(thirdSearch.statusCode).toBe(200)

    expect(thirdSearch.body.data).toEqual({
      pets: [
        expect.objectContaining({
          id: expect.any(String),
          name: "black shark",
        }),
      ],
    })
  })
})
