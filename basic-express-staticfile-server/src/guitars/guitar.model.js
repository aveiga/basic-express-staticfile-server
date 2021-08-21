import { EntitySchema } from "typeorm";

export class Guitar {
    constructor(id, model, brand) {
        this.id = id;
        this.model = model;
        this.brand = brand;
    }
}

export const GuitarEntitySchema = new EntitySchema({
    name: "Guitar",
    target: Guitar,
    columns: {
        id: {
            primary: true,
            generated: true,
            type: "integer"
        },
        model: {
            type: "varchar"
        },
        brand: {
            type: "varchar"
        }
    }
});