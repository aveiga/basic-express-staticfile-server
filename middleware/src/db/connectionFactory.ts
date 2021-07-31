import { Connection } from "typeorm";

export function setupDBConnection(
  createConnection: Function,
  entities: [Object|string],
  migrations: [Object|string],
  subscribers:  [Object|string]
): Promise<Connection> {
  return createConnection({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "stuff",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [...entities],
    // "migrations": ["**/migration/**/*.{ts,js}"],
    // "subscribers": ["**/subscriber/**/*.{ts,js}"]
  });
}
