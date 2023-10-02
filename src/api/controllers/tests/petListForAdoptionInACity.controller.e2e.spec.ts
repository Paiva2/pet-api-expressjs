import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import server from "../../../server"
import app from "../../../app"
import prisma from "../../../lib/prisma"

describe("Pet List for adoption in a City", () => {
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
      age: "0",
      petName: "new cat for test",
      color: "black",
    })
  })

  afterAll(() => {
    server.close()
  })

  it("should be possible to get pets based on city and state", async () => {
    const petsInCity = await request(app).get("/pets/São Paulo/SP").send()

    expect(petsInCity.statusCode).toBe(200)

    expect(petsInCity.body.data).toEqual({
      queryParameters: "São Paulo",
      page: 1,
      pets: [
        expect.objectContaining({
          id: expect.any(String),
        }),
      ],
    })
  })

  it("should be possible to get pets based on city and state using page query", async () => {
    for (let i = 1; i <= 22; i++) {
      await prisma.pet.create({
        data: {
          age: `${i}`,
          color: "brown",
          name: `cat-${i}`,
          orgName: "org-1",
        },
      })
    }

    const petsInCity = await request(app)
      .get("/pets/São Paulo/SP?page=3")
      .send()

    expect(petsInCity.statusCode).toBe(200)

    expect(petsInCity.body.data).toEqual({
      queryParameters: "São Paulo",
      page: 3,
      pets: [
        expect.objectContaining({
          id: expect.any(String),
        }),
        expect.objectContaining({
          id: expect.any(String),
        }),
        expect.objectContaining({
          id: expect.any(String),
        }),
      ],
    })
  })

  it("should not be possible to get pets based on city and state if there are no orgs in the city and state provided", async () => {
    const petsInCity = await request(app).get("/pets/Blumenau/SC").send()

    expect(petsInCity.statusCode).toBe(404)
    expect(petsInCity.body.message).toEqual(
      "There's no org's in this city and state available yet."
    )
  })
})
