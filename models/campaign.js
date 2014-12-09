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
        user: {
            type: DataTypes.INTEGER,
            references: "Account",
            referencesKey: "id"
        },
        routes: {
            type: DataTypes.INTEGER,
            references: "Route",
            referencesKey: "id"
        },
        points: DataTypes.BLOB
    }, {
        classMethods: {
            associate: function(models) {
                Campaign.belongsTo(model.Account, {
                    foriegnKey: 'id'
                });
                Campaign.hasMany(models.Route, {
                    foriegnKey: 'id'
                });
            }
        }
    });
}
