import { PrismaClient } from "@prisma/client";
import { isNameDuplicate } from "./../../../components/util/beverageService";
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

const handleUpdate = async (req, res) => {
  const { name, description, price, isRecommend } = req.body;

  // `name` duplicate check
  const isDup = await isNameDuplicate(name);
  if (isDup) {
    res.status(400).end("typed name `" + name + "` is duplicated.");
    return;
  }

  // TODO: prisma - UPDATE
  const beverage = await prisma.beverage.create({
    data: { name, description, price, isRecommend },
  });
  res.json(beverage);
};

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
