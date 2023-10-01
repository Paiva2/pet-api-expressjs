import { Request, Response } from "express"
import { makeOrgRegisterServices } from "../../factories/make-org-register-services"
import { ZodError, z } from "zod"

export default async function orgRegister(req: Request, res: Response) {
  const orgRegisterSchema = z.object({
    orgName: z.string().min(1, { message: "Org name invalid." }),
    password: z
      .string()
      .min(6, { message: "Password must have at least 6 characters." }),
    contact_number: z
      .string()
      .min(1, { message: "Org contact number invalid." }),
    address: z.object({
      street: z.string().min(1, { message: "Org street invalid." }),
      zipcode: z.string().min(1, { message: "Org zipcode invalid." }),
      city: z.string().min(1, { message: "Org city invalid." }),
      state: z.string().max(2).min(1, { message: "Org state invalid." }),
    }),
  })

  try {
    orgRegisterSchema.parse(req.body)

    const { address, contact_number, orgName, password } = req.body

    const orgServices = makeOrgRegisterServices()

    await orgServices.execute({
      name: orgName,
      password,
      address,
      contact_number,
    })

    return res.status(201).send()
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(422).send({
        message: e.issues.map((error) => error.message),
      })
    }

    if (e instanceof Error) {
      return res.status(409).send({ message: e.message })
    }
  }
}
