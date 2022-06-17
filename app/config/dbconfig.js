/* Load modules */
let sqlite3 = require('sqlite3').verbose();

/*
 * Database configuration
 */

/* Load database file (Creates file if not exists) */
let db = new sqlite3.Database('./sqlite.db');

/* Init tables if they don't exist */
let init = function () {
    db.run(
        'CREATE TABLE if not exists user (' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
            ' name TEXT,' +
            ' email TEXT,' +
            ' pass_hash TEXT,' +
            ' pass_reset_token TEXT,' +
            ' token TEXT,' +
            ' role TEXT,' +
            ' progress FLOAT,' +
            ' instances INT' +
            ')'
    );

    // db.run(
    //     'CREATE TABLE if not exists instance (' +
    //         'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
    //         ' phase INT,' +
    //         ' week INT,' +
    //         ' day INT,' +
    //         ' workout INT' +
    //         ')'
    // );

    // db.run(
    //     'CREATE TABLE if not exists workout (' +
    //         'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
    //         ' number INT,' +
    //         ' exercise INT,' +
    //         ' reps INT,' +
    //         ' break INT' +
    //         ' intensity TEXT' +
    //         ' rounds INT' +
    //         ' type TEXT' +
    //         ')'
    // );

    // db.run(
    //     'CREATE TABLE if not exists progress (' +
    //         'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
    //         ' user INT,' +
    //         ' instance INT,' +
    //         ' phase INT,' +
    //         ' week INT' +
    //         ' workout INT' +
    //         ')'
    // );
};

module.exports = {
    init: init,
    db: db,
};
