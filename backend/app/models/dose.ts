import Sequelize, { Model } from 'sequelize';

import database from '../database/database';

class Dose extends Model {
    quantidade!: number;
    unidadeDeMedida!: string;
}

Dose.init(
    {
        quantidade: Sequelize.DOUBLE,
        unidadeDeMedida: Sequelize.STRING
    },
    { sequelize: database.connection, freezeTableName: true }
);

export default Dose;