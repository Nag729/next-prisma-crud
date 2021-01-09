import { Beverage, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { isNameDuplicate } from "../../../util/service/beverageService";
import { beverageFormSchema } from "../../../validators/BeverageFormSchema";
const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // call functions by method
  const funcMap = {
    PUT: handleUpdate,
    DELETE: handleDelete,
  };

  const func = funcMap[req.method];
  if (!func) {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  return func(req, res)
    .catch((e) => {
      res.status(400).end("prisma client throws an exception.");
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};

/**
 * UPDATE
 * @param req
 * @param res
 */
const handleUpdate = async (
  req: NextApiRequest,
  res: NextApiResponse<Beverage>
) => {
  const url = req.url;
  const updateID = parseInt(url.split(/\//, 10).pop());
  const { name, description, price, isRecommend } = req.body;

  // validation check
  const isValid = await beverageFormSchema.isValid({
    name,
    description,
    price,
    isRecommend,
  });
  if (!isValid) {
    res.status(400).end("sent param is invalid.");
    return;
  }

  // `name` duplicate check
  const isDup = await isNameDuplicate(name, updateID);
  if (isDup) {
    res.status(400).end("typed name `" + name + "` is duplicated.");
    return;
  }

  // prisma - UPDATE
  const beverage = await prisma.beverage.update({
    where: { id: updateID },
    data: { name, description, price, isRecommend },
  });
  res.json(beverage);
};

/**
 * DELETE
 * @param req
 * @param res
 */
const handleDelete = async (
  req: NextApiRequest,
  res: NextApiResponse<Beverage>
) => {
  const url = req.url;
  const deleteID = parseInt(url.split(/\//, 10).pop());

  // prisma - DELETE
  const beverage = await prisma.beverage.delete({
    where: {
      id: deleteID,
    },
  });
  res.json(beverage);
};
