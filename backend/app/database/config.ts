import { Options } from "sequelize";

let config: Options = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'root',
    database: 'projeto_ucs',
    logging: true,
    port: 5432,
    define: {
        timestamps: true,
    }
}

export default config;
