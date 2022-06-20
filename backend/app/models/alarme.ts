import { Medicamento } from './../../../frontend/src/app/medicamento/interfaces/medicamento';
import Sequelize, { Model } from 'sequelize';

import database from '../database/database';

class Alarme extends Model {
    nome!: string;
    dataInicio!: string;
    usos!: number;
    intervalo!: number;
    medicamentoId!: number;
    quantidade!: number;
    unidadeDeMedida!: string;
}

Alarme.init(
    {
        nome: Sequelize.STRING,
        dataInicio: Sequelize.STRING,
        usos: Sequelize.INTEGER,
        intervalo: Sequelize.DOUBLE,
        medicamentoId: Sequelize.INTEGER,
        quantidade: Sequelize.DOUBLE,
        unidadeDeMedida: Sequelize.STRING
    },
    { sequelize: database.connection, freezeTableName: true }
);

export default Alarme;