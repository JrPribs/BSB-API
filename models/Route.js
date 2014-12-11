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
        points: Seq.BLOB,
        create_date: Seq.DATE,
        update_date: Seq.DATE
    },
    relations: {
//        belongsTo: 'Account',
        hasMany: 'Campaign',
        hasMany: 'Point'
    },
    options: {
        freezeTableName: false
    }
}
