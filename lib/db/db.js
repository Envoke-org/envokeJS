'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fixtures = exports.drop = exports.connect = exports.TESTING = undefined;

var connect = exports.connect = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : TEST_DATABASE;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _mongodb.MongoClient.connect(url);

          case 2:
            state.db = _context.sent;

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function connect() {
    return _ref.apply(this, arguments);
  };
}();

var drop = exports.drop = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var collections, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, collection;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return state.db.collections();

          case 2:
            collections = _context2.sent;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 6;

            for (_iterator = collections[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              collection = _step.value;

              collection.remove();
            }
            _context2.next = 14;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2['catch'](6);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 14:
            _context2.prev = 14;
            _context2.prev = 15;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 17:
            _context2.prev = 17;

            if (!_didIteratorError) {
              _context2.next = 20;
              break;
            }

            throw _iteratorError;

          case 20:
            return _context2.finish(17);

          case 21:
            return _context2.finish(14);

          case 22:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[6, 10, 14, 22], [15,, 17, 21]]);
  }));

  return function drop() {
    return _ref2.apply(this, arguments);
  };
}();

var fixtures = exports.fixtures = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(data) {
    var db, names, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, name, collection, test;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            db = state.db;

            if (db) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt('return', new Error('Missing database connection.'));

          case 3:
            names = Object.keys(data.collections);
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context3.prev = 7;
            _iterator2 = names[Symbol.iterator]();

          case 9:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context3.next = 20;
              break;
            }

            name = _step2.value;
            _context3.next = 13;
            return db.createCollection(name);

          case 13:
            collection = _context3.sent;
            _context3.next = 16;
            return collection.insert(data.collections[name]);

          case 16:
            test = _context3.sent;

          case 17:
            _iteratorNormalCompletion2 = true;
            _context3.next = 9;
            break;

          case 20:
            _context3.next = 26;
            break;

          case 22:
            _context3.prev = 22;
            _context3.t0 = _context3['catch'](7);
            _didIteratorError2 = true;
            _iteratorError2 = _context3.t0;

          case 26:
            _context3.prev = 26;
            _context3.prev = 27;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 29:
            _context3.prev = 29;

            if (!_didIteratorError2) {
              _context3.next = 32;
              break;
            }

            throw _iteratorError2;

          case 32:
            return _context3.finish(29);

          case 33:
            return _context3.finish(26);

          case 34:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[7, 22, 26, 34], [27,, 29, 33]]);
  }));

  return function fixtures(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getDB = getDB;

var _mongodb = require('mongodb');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* eslint-disable consistent-return */


var state = {
  db: null
};

var TEST_DATABASE = 'mongodb://localhost:27017/test';
var TESTING = exports.TESTING = true;

function getDB() {
  return state.db;
}