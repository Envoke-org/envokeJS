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
            _context.prev = 0;
            _context.next = 3;
            return _mongodb.MongoClient.connect(url);

          case 3:
            state.db = _context.sent;
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 6]]);
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
            _context2.prev = 0;
            _context2.next = 3;
            return state.db.collections();

          case 3:
            collections = _context2.sent;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 7;

            for (_iterator = collections[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              collection = _step.value;

              collection.remove();
            }
            _context2.next = 15;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2['catch'](7);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 15:
            _context2.prev = 15;
            _context2.prev = 16;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 18:
            _context2.prev = 18;

            if (!_didIteratorError) {
              _context2.next = 21;
              break;
            }

            throw _iteratorError;

          case 21:
            return _context2.finish(18);

          case 22:
            return _context2.finish(15);

          case 23:
            _context2.next = 28;
            break;

          case 25:
            _context2.prev = 25;
            _context2.t1 = _context2['catch'](0);

            console.log(_context2.t1);

          case 28:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 25], [7, 11, 15, 23], [16,, 18, 22]]);
  }));

  return function drop() {
    return _ref2.apply(this, arguments);
  };
}();

var fixtures = exports.fixtures = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(data) {
    var db, names, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, name, collection;

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
              _context3.next = 25;
              break;
            }

            name = _step2.value;
            _context3.prev = 11;
            _context3.next = 14;
            return db.createCollection(name);

          case 14:
            collection = _context3.sent;
            _context3.next = 17;
            return collection.insert(data.collections[name]);

          case 17:
            _context3.next = 22;
            break;

          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3['catch'](11);

            console.log(_context3.t0);

          case 22:
            _iteratorNormalCompletion2 = true;
            _context3.next = 9;
            break;

          case 25:
            _context3.next = 31;
            break;

          case 27:
            _context3.prev = 27;
            _context3.t1 = _context3['catch'](7);
            _didIteratorError2 = true;
            _iteratorError2 = _context3.t1;

          case 31:
            _context3.prev = 31;
            _context3.prev = 32;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 34:
            _context3.prev = 34;

            if (!_didIteratorError2) {
              _context3.next = 37;
              break;
            }

            throw _iteratorError2;

          case 37:
            return _context3.finish(34);

          case 38:
            return _context3.finish(31);

          case 39:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[7, 27, 31, 39], [11, 19], [32,, 34, 38]]);
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