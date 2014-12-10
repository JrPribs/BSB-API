var orm = require("../lib/model"),
    Seq = orm.Seq();

module.exports = {
    model: {
        id: {
            type: Seq.STRING,
            unique: true,
            primaryKey: true
        },
        username: {
            type: Seq.STRING,
            unique: true
        },
        name: Seq.STRING,
        email: {
            type: Seq.STRING,
            validate: {
                isEmail: true
            }
        },
        address: Seq.STRING,
        phone: Seq.STRING,
        paid: {
            type: Seq.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        routes: {
            type: Seq.BOOLEAN
                //            references: "Route",
                //            referencesKey: "id"
        }
    },
    relations: {
        hasMany: 'Campaign'
    },
    options: {
        freezeTableName: false
    }
}

