module.exports = function(sequelize, DataTypes) {
    sequelize.define('Account', {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true
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
        }
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        campaigns: DataTypes.BLOB,
        routes: DataTypes.BLOB
    });
}