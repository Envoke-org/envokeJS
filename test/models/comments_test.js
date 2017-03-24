/* eslint-disable no-underscore-dangle */
import { expect, assert } from 'chai'
import { describe, it, before, beforeEach } from 'mocha';
import should from 'should';
import fixtures from '../fixtures/model-comments';
import * as database from '../../src/db/db';

describe('Model Comment Tests', () => {
  before(done => {
    database.connect(database.MODE_TEST, done);
  });

  beforeEach(done => {
    database.drop(err => {
      if (err) return done(err)
      database.fixtures(fixtures, done)
    });
  });

  it('all', (done) => {
    const db = database.getDB();
    db.collection('comments').find().toArray((err, comments) => {
      expect(comments).to.have.lengthOf(3);
      done();
    });
  });

  it('create', (done) => {
    const db = database.getDB();
    db.collection('comments').insert({ user: 'Famous Person', text: 'I am so famous!' }, (err, docs) => {
      db.collection('comments').find().toArray((err, comments) => {
        expect(comments).to.have.lengthOf(4);
        expect(comments[3]._id.toString()).to.equal(docs.ops[0]._id.toString());
        expect(comments[3].user).to.equal('Famous Person');
        expect(comments[3].text).to.equal('I am so famous!');
        done();
      });
    })
  });

  it('remove', (done) => {
    const db = database.getDB();
    db.collection('comments').find().toArray((err, comments) => {
      db.collection('comments').remove({ _id: comments[0]._id }, (err) => {
        db.collection('comments').find().toArray((err, result) => {
          expect(result).to.have.lengthOf(2);
          expect(result[0]._id).to.not.equal(comments[0]._id);
          expect(result[1]._id).to.not.equal(comments[0]._id);
          done();
        });
      });
    });
  });
});