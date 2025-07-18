export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  });

  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
};
