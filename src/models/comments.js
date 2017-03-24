import * as DB from '../db/db'

// Get all comments
export function all(cb) {
  const db = DB.getDB();
  db.collection('comments').find().toArray(cb)
}

// Create new comment and return its id
export function create(user, text, cb) {
  const db = DB.getDB();
  db.collection('comments').insert({ user, text }, (err, docs) => {
    if (err) return cb(err);
    cb(null, docs.ops[0]._id)
  })
}

// Remove a comment
export function remove(id, cb) {
  const db = DB.getDB();
  db.collection('comments').remove({ _id: id }, (err) => {
    cb(err)
  });
}
