import { Request, Response } from "express"
import { ZodError, z } from "zod"
import { makePetListForAdoptionCityServices } from "../../factories/make-pet-list-for-adoption-city-services"

export default async function petListForAdoptionInACity(
  req: Request,
  res: Response
) {
  const getPetsByCityAndState = z.object({
    state: z.string().min(1, { message: "State invalid." }),
    city: z.string().min(1, { message: "City invalid." }),
  })
  const getListPage = z.object({
    page: z.coerce.number().default(1),
  })

  try {
    getPetsByCityAndState.parse(req.params)
    getListPage.parse(req.query)

    const { state, city } = req.params
    const page = req?.query.page as string

    const petListForAdoptionInACityServices =
      makePetListForAdoptionCityServices()

    const petListForAdoption = await petListForAdoptionInACityServices.execute({
      city,
      state,
      page: !page ? 1 : +page,
    })

    return res.status(200).send({ data: petListForAdoption })
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
