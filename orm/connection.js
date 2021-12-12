const dbConfig=require("./db.config");


const Sequelize = require("sequelize");
var model = require('./model')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

// const modelDefine = require('./model')
// modelDefine(sequelize)
// const { employee, skillmap } = sequelize.models;
// employee.hasMany(skillmap);
// skillmap.belongsTo(employee);

// model.skillmap.hasMany(model.employee);
// model.employee.belongsTo(model.skillmap);
// sequelize.model[model.skillmap].hasMany(sequelize.model[model.employee]);
// sequelize.model[employee].belongsTo(sequelize.model[skillmap]);
// for(let modelName in sequelize.model) {
//   console.log(modelName)
//   sequelize.model[modelName].associate(sequelize.models);
// }

module.exports=sequelize;
