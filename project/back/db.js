const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('3_1', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});
const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
  },
  
  password: {
    type: Sequelize.STRING(150),
    allowNull: false,
  },
});


const Board = sequelize.define('board', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  content: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  filename: {
    type: Sequelize.STRING(150),
    allowNull: true,
  },
});

User.hasMany(Board,{foreignKey:"userid",sourceKey:"id"});
Board.belongsTo(User,{foreignKey:"userid",targetKey:"id"});

Board.sync({ force: true })
  .then(() => console.log('board table created!'))
  .catch(err => console.error(err));

User.sync({ force: false })
  .then(() => console.log('User table created!'))
  .catch(err => console.error(err));
  
module.exports = {User,Board};