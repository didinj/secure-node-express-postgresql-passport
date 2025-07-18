import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/config.json')))[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

const modelFiles = fs
  .readdirSync(__dirname)
  .filter(
    file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  );

for (const file of modelFiles) {
  const model = await import(path.join(__dirname, file));
  const definedModel = model.default(sequelize, Sequelize.DataTypes);
  db[definedModel.name] = definedModel;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;