import { Request, Response } from "express"
import { ZodError, z } from "zod"
import { makePetListForAdoptionCityServices } from "../../factories/make-pet-list-for-adoption-city-services"
import { makePetListByCaracteristics } from "../../factories/make-pet-list-by-caracteristics"

export default async function petListByCaracteristics(
  req: Request,
  res: Response
) {
  const getPetsByCity = z.object({
    city: z.string().min(1, { message: "City invalid." }),
  })

  try {
    getPetsByCity.parse(req.params)

    const { city } = req.params

    const color = req?.query?.color
    const age = req?.query?.age
    const name = req?.query?.name

    const petListByCaracteristics = makePetListByCaracteristics()

    const filteredPetList = await petListByCaracteristics.execute({
      city,
      petData: {
        color: color?.toString() ?? undefined,
        age: age?.toString() ?? undefined,
        name: name?.toString() ?? undefined,
      },
    })

    return res.status(200).send({ data: filteredPetList })
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(422).send({
        message: e.issues.map((error) => error.message),
      })
    }

    if (e instanceof Error) {
      return res.status(404).send({ message: e.message })
    }
  }
}
