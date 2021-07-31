import { Connection } from "typeorm";

export function setupDBConnection(
  createConnection: Function,
  entities: [Object|string],
  migrations: [Object|string],
  subscribers:  [Object|string]
): Promise<Connection> {
  console.log(process.env.NODE_ENV);
  
  const basePostgresOptions = {
    type: "postgres",
    host: process.env.DB_ADDR,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  };

  const baseSQLiteOptions = {
    type: "sqlite",
    database: process.env.DEV_DB_PATH || "./db.sql",
    synchronize: true,
    logging: false
  };

  const baseOptions = process.env.NODE_ENV === "DEV" ? baseSQLiteOptions : basePostgresOptions;

  return createConnection({
    ...baseOptions,
    entities: [...entities],
    // "migrations": ["**/migration/**/*.{ts,js}"],
    // "subscribers": ["**/subscriber/**/*.{ts,js}"]
  });
}
