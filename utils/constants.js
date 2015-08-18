/**
 * Define constants
 *
 * @method define
 * @param {String} name constant name
 * @param {String || Number} value constant value
 */

function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}

//---------------------------------------------------------------------
// HTTP Status
//---------------------------------------------------------------------
define('SERVER_PORT', 8003);


//---------------------------------------------------------------------
// Error things
//---------------------------------------------------------------------
define('DATABASE_ERROR_TITLE', 'Database Error');
define('DATABASE_ERROR_MESSAGE', "Sorry but we have problems on database");

//---------------------------------------------------------------------
// HTTP Status
//---------------------------------------------------------------------
define('URI_MONGODB', process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017/test')

