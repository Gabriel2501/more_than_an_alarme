import Sequelize, { Model } from 'sequelize';

import database from '../database/database';

class Usuario extends Model {
    nome!: string;
    ativo!: boolean;
}

Usuario.init(
    {
        nome: Sequelize.STRING,
        ativo: Sequelize.BOOLEAN
    },
    { sequelize: database.connection, freezeTableName: true }
);

export default Usuario;