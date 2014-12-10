"use strict";

module.exports = function(sequelize, DataTypes) {
    var Campaign = sequelize.define('Campaign', {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        routes: {
            type: DataTypes.INTEGER
        },
        photo_count: DataTypes.INTEGER,
        photos: DataTypes.BLOB
    }, {
          classMethods: {
              associate: function(models) {
                  Campaign.belongsTo(models.Account, {as: 'account', foreignKey: 'id', constraints: false });
              }
          }
       }
    );
}
