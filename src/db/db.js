import { MongoClient } from 'mongodb';
import async from 'async';

const state = {
  db: null,
  mode: null,
};

const PRODUCTION_URI = 'mongodb://127.0.0.1:27017/production';
const TEST_URI = 'mongodb://127.0.0.1:27017/test';
export var MODE_TEST = 'mode_test';
export var MODE_PRODUCTION = 'mode_production';

export function connect(mode, done) {
  if (state.db) return done()

  const uri = mode === exports.MODE_TEST ? TEST_URI : PRODUCTION_URI;

  MongoClient.connect(uri, (err, db) => {
    if (err) return done(err)
    state.db = db
    state.mode = mode
    done()
  })
}

export function getDB() {
  return state.db;
}

export function drop(done) {
  if (!state.db) return done()
  // This is faster then dropping the database
  state.db.collections((err, collections) => {
    async.each(collections, (collection, cb) => {
      if (collection.collectionName.indexOf('system') === 0) {
        return cb()
      }
      collection.remove(cb)
    }, done)
  })
}

export function fixtures(data, done) {
  const db = state.db;
  if (!db) {
    return done(new Error('Missing database connection.'))
  }

  const names = Object.keys(data.collections);
  async.each(names, (name, cb) => {
    db.createCollection(name, (err, collection) => {
      if (err) return cb(err)
      collection.insert(data.collections[name], cb)
    })
  }, done)
}