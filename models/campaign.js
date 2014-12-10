module.exports = function(sequelize, DataTypes) {
    return Campaign = sequelize.define('Campaign', {
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
//            references: "Account",
//            referencesKey: "id"
        },
        routes: {
            type: DataTypes.INTEGER
//             references: "Route",
//             referencesKey: "id"
        },
        photo_count: DataTypes.INTEGER,
        photos: DataTypes.BLOB
//    }, {
//        classMethods: {
//            associate: function(models) {
//                Campaign.belongsTo(models.Account, {
//                    foriegnKey: 'id'
//                });
//                Campaign.hasMany(models.Route, {
//                    foriegnKey: 'id'
//                });
//            }
//        }
    });
}
