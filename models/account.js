module.exports = function(sequelize, DataTypes) {
    return Account = sequelize.define('Account', {
        id: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        campaigns: {
            type: DataTypes.INTEGER,
            references: "Campaign",
            referencesKey: "id"
        },
        routes: {
            type: DataTypes.INTEGER,
            references: "Route",
            referencesKey: "id"
        }
    }, {
        classMethods: {
            associate: function(models) {
                Account.hasMany(models.Campaign, {
                    foreignKey: 'id'
                });
                Account.hasMany(models.Route, {
                    foreignKey: 'id'
                });
            }
        }
    });
}
