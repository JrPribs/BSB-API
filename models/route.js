"use strict";

module.exports = function(sequelize, DataTypes) {
    return Route = sequelize.define('Route', {
            id: {
                type: DataTypes.INTEGER,
                unique: true,
                primaryKey: true,
                autoIncrement: true
            },
            title: DataTypes.STRING,
            description: DataTypes.TEXT,
            account: {
                type: DataTypes.STRING
//                references: "Account",
//                referencesKey: "id"
            },
            points: DataTypes.BLOB
//        }, {
//            classMethods: {
//                associate: function(models) {
//                    Route.belongsTo(models.Account, {
//                        foriegnKey: 'id'
//                    });
//                }
//            }
        }
    );
}
