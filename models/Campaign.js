var orm = require("../lib/model"),
    Seq = orm.Seq();

module.exports = {
    model: {
        id: {
            type: Seq.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        title: Seq.STRING,
        description: Seq.TEXT,
        photo_count: Seq.INTEGER,
        create_date: Seq.DATE,
        update_date: Seq.DATE
    },
    relations: {
        belongsTo: 'Account',
        hasMany: 'Photo',
        hasMany: 'Route'
    },
    options: {
        freezeTableName: false
    }
}
