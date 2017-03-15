'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _schema = require('./meta/schema');

Object.keys(_schema).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _schema[key];
    }
  });
});