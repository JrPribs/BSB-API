module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Route', {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        user: DataTypes.INTEGER,
        points: DataTypes.BLOB
    })
}