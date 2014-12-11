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
        city: Seq.STRING,
        state: Seq.STRING,
        zip: Seq.STRING,
        phone: Seq.STRING,
        paid: {
            type: Seq.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        create_date: Seq.DATE,
        create_time: Seq.DATE,
        update_date: Seq.DATE,
        update_time: Seq.DATE
    },
    relations: {
        hasMany: 'Campaign',
        hasMany: 'Route'
    },
    options: {
        freezeTableName: false
    }
}
