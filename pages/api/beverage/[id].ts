import { PrismaClient } from "@prisma/client";
import { isNameDuplicate } from "../../../util/beverageService";
const prisma = new PrismaClient();

export default async (req, res) => {
  // call functions by method
  const funcMap = {
    PUT: handleUpdate,
    DELETE: handleDelete,
  };

  const func = funcMap[req.method];
  if (!func) res.status(405).json();

  return func(req, res);
};

/**
 * UPDATE
 * @param req
 * @param res
 */
const handleUpdate = async (req, res) => {
  const url = req.url;
  const updateID = parseInt(url.split(/\//, 10).pop());
  const { name, description, price, isRecommend } = req.body;

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
const handleDelete = async (req, res) => {
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
