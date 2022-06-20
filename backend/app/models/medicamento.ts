import Sequelize, { Model } from 'sequelize';

import database from '../database/database';

class Medicamento extends Model {
    nome!: string;
    dosesDisponiveis!: number;
    vencimento!: number;
}

Medicamento.init(
    {
        nome: Sequelize.STRING,
        dosesDisponiveis: Sequelize.DOUBLE,
        vencimento: Sequelize.STRING
    },
    { sequelize: database.connection, freezeTableName: true }
);

export default Medicamento;