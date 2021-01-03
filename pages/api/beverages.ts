import { PrismaClient } from "@prisma/client";
import { isNameDuplicate } from "./../../components/util/beverageService";
const prisma = new PrismaClient();

export default async (req, res) => {
  // call functions by method
  const funcMap = {
    GET: handleRead,
    POST: handleCreate,
  };

  const func = funcMap[req.method];
  if (!func) res.status(500).json();

  return func(req, res);
};

const handleRead = async (req, res) => {
  // prisma - READ
  // get all records
  const beverage = await prisma.beverage.findMany();
  res.json(beverage);
};

const handleCreate = async (req, res) => {
  const { name, description, price, isRecommend } = req.body;

  // `name` duplicate check
  const isDup = await isNameDuplicate(name);
  if (isDup) {
    res.status(400).end("typed name `" + name + "` is duplicated.");
    return;
  }

  // prisma - CREATE
  const beverage = await prisma.beverage.create({
    data: { name, description, price, isRecommend },
  });
  res.json(beverage);
};
