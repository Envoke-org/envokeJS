// import { expect, assert } from 'chai'
// import { describe, it } from 'mocha';
// const r = require('rethinkdbdash')();
//
// import { newPerson } from '../../src/meta/schema';
//
// const SCHEMA = 'http://schema.org/';
//
// describe('RethinkDB', () => {
//   it('drops the database', (done) => {
//     r.dbDrop('test').run().then(() => {
//       done();
//     })
//     .error((err) => {
//       if (err) done(err);
//     });
//   });
//
//   it('creates the database', (done) => {
//     r.dbCreate('test').run().then(() => {
//       done();
//     })
//     .error((err) => {
//       if (err) done(err);
//     });
//   });
//
//   it('creates a table', (done) => {
//     r.db('test').tableCreate('person').run().then(() => {
//       done();
//     })
//     .error((err) => {
//       if (err) done(err);
//     });
//   });
//
//   it('inserts data', (done) => {
//     r.table('person').insert([
//       { name: 'William Adama' },
//       { name: 'Laura Roslin' },
//       { name: 'Jean-Luc Picard' },
//     ]).run().then(() => {
//       done();
//     })
//     .error((err) => {
//       if (err) done(err);
//     });
//   });
//
//   it('gets data', (done) => {
//     r.table('person').pluck('name').run().then((results) => {
//       expect(results).to.have.lengthOf(3);
//       done();
//     });
//   });
//
//   it('deletes a table', (done) => {
//     r.db('test').tableDrop('person').run().then(() => {
//       done();
//     });
//   });
// });
