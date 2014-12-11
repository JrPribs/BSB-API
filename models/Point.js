var orm = require("../lib/model"),
    Seq = orm.Seq();

module.exports = {
    model: {
        id: {
            type: Seq.STRING,
            unique: true,
            primaryKey: true
        },
        order: Seq.INTEGER,
        comment: Seq.STRING,
        latitude: {
            type: Seq.INTEGER,
            allowNull: true,
            defaultValue: null,
            validate: {
                min: -90,
                max: 90
            }
        },
        longitude: {
            type: Seq.INTEGER,
            allowNull: true,
            defaultValue: null,
            validate: {
                min: -180,
                max: 180
            }
        },
        address: Seq.STRING
    },
    relations: {
        belongsTo: 'Route'
    },
    options: {
        freezeTableName: false
    }
}
