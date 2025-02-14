module.exports = (sequelize, Sequelize) => {
const User = sequelize.define("users", {
    user_name: {
      type: Sequelize.STRING,
      required: true
    },
    role : {
      type: Sequelize.STRING,
      default: 'NORMAL'
    },
    user_password: {
      type: Sequelize.STRING,
      required: true
    },
    user_email: {
      type: Sequelize.STRING,
      required: true
    },
    updated: {
      type: Sequelize.BOOLEAN
  },
})
    return User;
};


 