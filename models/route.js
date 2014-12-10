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
        points: Seq.BLOB
    },
    relations: {
        belongsTo: 'Account'
    },
    options: {
        freezeTableName: true
    }
}
