const Sequelize = require('sequelize');
const { logger } = require('../middlewares/logger');


const db = {
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};
const sequelize = new Sequelize(db.name, db.user, db.password, {
  host: db.host, // 地址
  port: db.port, // 端口
  dialect: 'postgres', // 数据库类型
  pool: { // 连接池配置
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  timezone: '+08:00', // 时区转换
});
sequelize
  .sync()
  .then(() => {
    logger.info('Init db success');
  })
  .catch((err) => {
    logger.error(err);
  });
module.exports = sequelize;
