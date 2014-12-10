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
        routes: {
            type: Seq.INTEGER
        },
        photo_count: Seq.INTEGER,
        photos: Seq.BLOB
    },
    relations: {
        belongsTo: 'Account'
    },
    options: {
        freezeTableName: true
    }
}
