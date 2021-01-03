import { PrismaClient } from "@prisma/client";
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
  const updateID = Number(url.split(/\//).pop());
  const { name, description, price, isRecommend } = req.body;

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
  const deleteID = Number(url.split(/\//).pop());

  // prisma - DELETE
  const beverage = await prisma.beverage.delete({
    where: {
      id: deleteID,
    },
  });
  res.json(beverage);
};
