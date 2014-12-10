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
        routes: {
            type: DataTypes.INTEGER
                //             references: "Route",
                //             referencesKey: "id"
        },
        photo_count: DataTypes.INTEGER,
        photos: DataTypes.BLOB
    }, {
        classMethods: {
            associate: function(models) {
                Campaign.hasOne(Account, {
                    as: 'account',
                    foriegnKey: 'id'
                });
                //                Campaign.hasMany(models.Route, {
                //                    foriegnKey: 'id'
                //                });
            }
        }
    });
}
