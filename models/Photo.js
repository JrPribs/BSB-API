var orm = require("../lib/model"),
    Seq = orm.Seq();

module.exports = {
    model: {
        id: {
            type: Seq.STRING,
            unique: true,
            primaryKey: true
        },
        caption: {
            type: Seq.STRING,
            validate: {
                isAlpha: true
            }
        },
        latitude: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null,
            validate: {
                min: -90,
                max: 90
            }
        },
        longitude: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null,
            validate: {
                min: -180,
                max: 180
            }
        },
        full: {
            type: Seq.STRING,
            validate: {
                contains: '.jpg'
            }
        },
        thumb: {
            type: Seq.STRING,
            validate: {
                contains: '.jpg'
            }
        },
        image_date: Seq.DATE,
        upload_date: Seq.DATE
    },
    relations: {
        belongsTo: 'Campaign',
    },
    options: {
        freezeTableName: false
    }
}
