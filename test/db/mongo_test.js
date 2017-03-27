/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import { expect, assert } from 'chai';
import { describe, it, before, beforeEach, after } from 'mocha';
import fixtures from '../fixtures/model-person';
import * as database from '../../src/db/db';

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

  it('gets all person objects', (done) => {
    const db = database.getDB();
    db.collection('person').find().toArray((err, person) => {
      expect(person).to.have.lengthOf(3);
      done();
    });
  });

  it('creates a person object', (done) => {
    const db = database.getDB();
    db.collection('person').insert({ user: 'Ujo', text: 'creating an open music industry!' }, (err, docs) => {
      db.collection('person').find().toArray((err, person) => {
        expect(person).to.have.lengthOf(4);
        expect(person[3]._id.toString()).to.equal(docs.ops[0]._id.toString());
        expect(person[3].user).to.equal('Ujo');
        expect(person[3].text).to.equal('creating an open music industry!');
        return done();
      });
    });
  });

  it('deletes a person object', (done) => {
    const db = database.getDB();
    db.collection('person').find().toArray((err, person) => {
      db.collection('person').remove({ _id: person[0]._id }, (err) => {
        if (err) throw err;
        db.collection('person').find().toArray((err, result) => {
          expect(result).to.have.lengthOf(2);
          expect(result[0]._id).to.not.equal(person[0]._id);
          expect(result[1]._id).to.not.equal(person[0]._id);
          return done();
        });
      });
    });
  });
});
