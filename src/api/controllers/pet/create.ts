import { Request, Response } from "express";
import { makeCreatePetServices } from "../../factories/make-pet-services";

export default function create(req: Request, res: Response) {
  if (!req.body) {
    return res.status(404).send({ message: "Invalid body." });
  }

  const { age, color, name, orgName } = req.body;

  const petServices = makeCreatePetServices();

  petServices.execute({
    age,
    color,
    name,
    orgName,
  });

  return res.status(200).send();
}
