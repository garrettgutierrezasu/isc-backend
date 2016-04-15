var env = require('../../env');
var uuid = require('node-uuid');

/**
 * @var {string} - The database name to use (we should really move this to ./env.js)
 */
const dbName = 'seating_lucid_agency';

/**
 * @var {string} - The table name
 */
const tableName = 'seating_charts';

/**
 * @var {string} - The table location
 */
const tableLoc = dbName + '.' + tableName;

/**
 * Add an item to the collection
 *
 * @param {object} connection - The database connection object
 * @param {object} newSeatingChart - The new item to create
 */
exports.addSeatingChart = function(connection, newSeatingChart, callback) {
  connection.query('INSERT INTO ' + tableLoc + ' SET ?;', newSeatingChart, function(err, result) {
    return err ? callback(err) : callback(null, result);
  });
};

/**
 * Get the collection
 *
 * @param {object} connection - The database connection object
 * @param {function} callback - The callback handler
 */
exports.getSeatingCharts = function(connection, callback) {
  connection.query('SELECT * FROM ' + tableLoc, function(err, result) {
    return err ? callback(err) : callback(null, result);
  });
};

/**
 * Get an item in the collection
 *
 * @param {object} connection - The database connection object
 * @param {number} id - The id of the item to retrieve
 * @param {function} callback - The callback handler
 */
exports.getSeatingChart = function(connection, id, callback) {
  connection.query('SELECT * FROM ' + tableLoc + ' WHERE id = ?;', id, function(err, result) {
    return err ? callback(err) : callback(null, result);
  });
};

/**
 * Update an item in the collection
 *
 * @param {object} connection - The database connection object
 * @param {number} id - The id of the item to update
 * @param {object} newSeatingChart - The updated item
 * @param {function} callback - The callback handler
 */
exports.updateSeatingChart = function(connection, id, newSeatingChart, callback) {
  connection.query('UPDATE ' + tableLoc + ' SET ? WHERE id = ?;', [newSeatingChart, id], function(err, result) {
    return err ? callback(err) : callback(null, result);
  });
};

/**
 * Remove an item from the collection
 *
 * @param {object} connection - The database connection object
 * @param {number} id - The id of the item to delete
 */
exports.removeSeatingChart = function(connection, id, callback) {
  connection.query('DELETE FROM ' + tableLoc + ' WHERE id = ?;', id, function(err, result) {
    return err ? callback(err) : callback(null, result);
  });
};
