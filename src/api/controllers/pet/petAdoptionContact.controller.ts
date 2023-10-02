import { Request, Response } from "express"
import { ZodError, z } from "zod"
import { makePetAdoptionServices } from "../../factories/make-pet-adoption-services"

export default async function petAdoptionContact(req: Request, res: Response) {
  const contactOrgForPetAdoptionSchema = z.object({
    orgName: z.string().min(1, { message: "Org name invalid." }),
    petName: z.string().min(1, { message: "Pet name invalid." }),
  })

  try {
    contactOrgForPetAdoptionSchema.parse(req.body)

    const { orgName, petName } = req.body

    const petServices = makePetAdoptionServices()

    const orgInformations = await petServices.execute({
      petName,
      orgName,
    })

    return res.status(200).send({ data: orgInformations })
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
