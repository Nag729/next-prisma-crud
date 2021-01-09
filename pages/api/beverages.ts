import { Beverage, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { isNameDuplicate } from "../../util/service/beverageService";
import { beverageFormSchema } from "../../validators/BeverageFormSchema";
const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // call functions by method
  const funcMap = {
    GET: handleRead,
    POST: handleCreate,
  };

  const func = funcMap[req.method];
  if (!func) {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  return func(req, res);
};

/**
 * READ
 * @param req
 * @param res
 */
const handleRead = async (
  req: NextApiRequest,
  res: NextApiResponse<Beverage[]>
) => {
  // prisma - READ
  try {
    const beverages = await prisma.beverage.findMany({
      orderBy: {
        id: "asc",
      },
    });
    res.json(beverages);
  } catch (e) {
    res
      .status(400)
      .end("An error occurred on the server when Prisma exec READ.");
    return;
  }
};

/**
 * CREATE
 * @param req
 * @param res
 */
const handleCreate = async (
  req: NextApiRequest,
  res: NextApiResponse<Beverage>
) => {
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
  const isDup = await isNameDuplicate(name);
  if (isDup) {
    res.status(400).end("typed name `" + name + "` is duplicated.");
    return;
  }

  // prisma - CREATE
  try {
    const beverage = await prisma.beverage.create({
      data: { name, description, price, isRecommend },
    });
    res.json(beverage);
  } catch (e) {
    res
      .status(400)
      .end("An error occurred on the server when Prisma exec CREATE.");
    return;
  }
};
