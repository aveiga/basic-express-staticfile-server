import { getRepository } from "typeorm";
import { Guitar } from "./guitar.model.js";

export async function createOne() {
  const g = new Guitar();
  g.brand = "Schecter";
  g.model = "Jeff Loomis";
  return getRepository(Guitar).save(g);
}

export async function createGuitar(brand: string, model: string) {
  const g = new Guitar();
  g.brand = brand;
  g.model = model;
  return getRepository(Guitar).save(g);
}

export async function getAll() {
  return getRepository(Guitar).find();
}
