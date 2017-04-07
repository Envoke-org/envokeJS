/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import { expect } from 'chai';
import { describe, it, before, beforeEach, after } from 'mocha';
import fixtures from '../fixtures/test';
import * as database from '../../src/database/database';

describe('MongoDB', () => {
  before((done) => {
    database.connect(database.TEST_DATABASE).then(() => {
      done();
    });
  });

  beforeEach((done) => {
    database.drop().then(() => {
      database.fixtures(fixtures).then(() => {
        done();
      });
    });
  });

  after((done) => {
    database.drop().then(() => {
      done();
    });
  });

  it('gets all', (done) => {
    const db = database.getDB();
    db.collection('users').find().toArray((error, collection) => {
      expect(collection).to.have.lengthOf(3);
      done();
    });
  });

  it('creates', (done) => {
    const db = database.getDB();
    db.collection('users').insert({}, (error, result) => {
      db.collection('users').find().toArray((error, collection) => {
        expect(collection).to.have.lengthOf(4);
        expect(collection[3]._id.toString()).to.equal(result.ops[0]._id.toString());
        return done();
      });
    });
  });

  it('deletes', (done) => {
    const db = database.getDB();
    db.collection('users').find().toArray((error, collection) => {
      db.collection('users').remove({ _id: collection[0]._id }, (error) => {
        if (error) throw error;
        db.collection('users').find().toArray((error, result) => {
          expect(result).to.have.lengthOf(2);
          expect(result[0]._id).to.not.equal(collection[0]._id);
          expect(result[1]._id).to.not.equal(collection[0]._id);
          return done();
        });
      });
    });
  });
});
