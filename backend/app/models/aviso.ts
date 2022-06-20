import Sequelize, { Model } from 'sequelize';

import database from '../database/database';

class Aviso extends Model {
    horario!: string;
    ativo!: boolean;
}

Aviso.init(
    {
        horario: Sequelize.STRING,
        ativo: Sequelize.BOOLEAN
    },
    { sequelize: database.connection, freezeTableName: true }
);

export default Aviso;