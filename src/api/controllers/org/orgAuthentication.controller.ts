import { Request, Response } from "express"
import { ZodError, z } from "zod"
import { makeOrgAuthenticationServices } from "../../factories/make-org-authentication-services"

export default async function orgAuthentication(req: Request, res: Response) {
  const orgRegisterSchema = z.object({
    orgName: z.string().min(1, { message: "Org name invalid." }),
    password: z
      .string()
      .min(6, { message: "Password must have at least 6 characters." }),
  })

  try {
    orgRegisterSchema.parse(req.body)

    const { orgName, password } = req.body

    const orgServices = makeOrgAuthenticationServices()

    const userToken = await orgServices.execute({
      orgName,
      password,
    })

    return res.status(200).cookie("orgToken", userToken).send(userToken)
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(422).send({
        message: e.issues.map((error) => error.message),
      })
    }

    if (e instanceof Error) {
      return res.status(401).send({ message: e.message })
    }
  }
}
