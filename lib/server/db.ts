import { drizzle } from "drizzle-orm/libsql";
// biome-ignore lint/style/noNonNullAssertion: recommended by drizzle
const db = drizzle(process.env.DB_FILE_NAME!);

export default db;
