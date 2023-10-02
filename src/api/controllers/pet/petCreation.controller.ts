import { Request, Response } from "express"
import { makePetCreationServices } from "../../factories/make-pet-creation-services"
import { ZodError, z } from "zod"
import jwt from "jsonwebtoken"
import envVariables from "../../../env/envVariables"

interface OrgJwtSchema {
  data: {
    id: string
    name: string
  }
  iat: number
  exp: number
}

export default async function petCreation(req: Request, res: Response) {
  const orgRegisterSchema = z.object({
    age: z.string().min(1, { message: "Pet age invalid." }),
    petName: z.string().min(1, { message: "Pet name invalid." }),
    color: z.string().min(1, { message: "Pet Color invalid." }),
  })

  const orgJwt = req.cookies.orgToken

  try {
    jwt.verify(orgJwt.token, envVariables.JWT_SECRET as string)
  } catch {
    return res.status(401).send({ message: "Invalid token." })
  }

  try {
    orgRegisterSchema.parse(req.body)

    const { age, color, petName } = req.body

    const orgInformations = jwt.decode(orgJwt.token) as OrgJwtSchema

    const petCreationServices = makePetCreationServices()

    await petCreationServices.execute({
      orgId: orgInformations?.data?.id,
      orgName: orgInformations?.data?.name,
      age,
      color,
      name: petName,
    })

    return res.status(201).send()
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
