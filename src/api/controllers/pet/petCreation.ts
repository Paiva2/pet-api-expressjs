import { Request, Response } from "express";
import { makePetCreationServices } from "../../factories/make-pet-services";

export default function petCreation(req: Request, res: Response) {
  if (!req.body) {
    return res.status(404).send({ message: "Invalid body." });
  }

  const { age, color, name, orgName } = req.body;

  const petServices = makePetCreationServices();

  petServices.execute({
    age,
    color,
    name,
    orgName,
  });

  return res.status(200).send();
}
