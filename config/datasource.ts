import { DataSource } from "typeorm";
import 'dotenv/config';

const port = parseInt(process.env.DATABASE_PORT || '5432', 10);

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: port,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: ['src/entities/*{.ts,.js}'],
    logging: false,
    migrations: ['migrations/*{.ts,.js}'],
    synchronize: false
})