module.exports = (sequelize, DataTypes) => {
const User = sequelize.define("users", {
    user_name: {
      type: DataTypes.STRING,
      required: true
    },
    role : {
      type: DataTypes.STRING,
      defaultValue: 'NORMAL'
    },
    user_password: {
      type: DataTypes.STRING,
      required: true
    },
    user_email: {
      type: DataTypes.STRING,
      required: true
    },
    token : {
      type: DataTypes.STRING,
    },
    updated: {
      type: DataTypes.BOOLEAN
  },
})
    return User;
};


 