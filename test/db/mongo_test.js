/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import { expect, assert } from 'chai';
import { describe, it, before, beforeEach, after } from 'mocha';
import fixtures from '../fixtures/people';
import * as database from '../../src/db/db';

import {
  newPerson, newOrganization, newMusicGroup,
  newMusicComposition, newMusicCompositionRight,
  newMusicRecording, newImageObject,
} from '../../src/meta/schema';

const person = newPerson(
  '2017-06-19', 'Xavier', 'Ramona', 'https://ipfs.io/ipfs/QmdhTuX4V4uAUKotFTFpeHDEkSDvWVGfsvqT5EwtmtnPUW',
);
const organization = newOrganization(
  'RVNG Intl.',
  'Brooklyn-based music institution that operates on few but heavily ' +
  'fortified principals, dealing with forward-reaching artists.',
  'getradder@igetrvng.com',
);
const musicGroup = newMusicGroup(
  'Laserdisc Visions',
  'Ramona Andra Xavier is an American electronic musician from Portland, Oregon.',
  'vektroid@music.com',
  [person],
  'https://ipfs.io/ipfs/QmdhTuX4V4uAUKotFTFpeHDEkSDvWVGfsvqT5EwtmtnPUW',
);
const musicComposition = newMusicComposition('ドリーミー', person, 'T-034.524.680-1');
const musicCompositionRight = newMusicCompositionRight(
  musicComposition, person, 100, '2016-01-01', '2017-01-01', ['US'],
);
const musicRecording = newMusicRecording('ドリーミー', musicComposition, musicGroup, 'PT5M', 'US-S1Z-99-0000');
const imageObject = newImageObject('http://ipfs.io/ipfs/QmcSFW35JqBdYh6uTqHhKuV9Stv8ayeKGoH9HRxEyi3Eh3', 'jpeg');
const audioObject = newImageObject('http://ipfs.io/ipfs/QmcSFW35JqBdYh6uTqHhKuV9Stv8ayeKGoH9HRxEyi3Eh3', 'mp3');

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

  it('gets all people', (done) => {
    const db = database.getDB();
    db.collection('people').find().toArray((error, collection) => {
      expect(collection).to.have.lengthOf(3);
      done();
    });
  });

  it('creates a person', (done) => {
    const db = database.getDB();
    db.collection('people').insert(person, (error, result) => {
      db.collection('people').find().toArray((error, collection) => {
        expect(collection).to.have.lengthOf(4);
        expect(collection[3]._id.toString()).to.equal(result.ops[0]._id.toString());
        expect(collection[3].givenName).to.equal('Ramona');
        expect(collection[3].familyName).to.equal('Xavier');
        return done();
      });
    });
  });

  it('creates a organization', (done) => {
    const db = database.getDB();
    db.collection('organizations').insert(organization, (error, result) => {
      db.collection('organizations').find().toArray((error, collection) => {
        expect(collection).to.have.lengthOf(1);
        expect(collection[0]._id.toString()).to.equal(result.ops[0]._id.toString());
        expect(collection[0].name).to.equal('RVNG Intl.');
        expect(collection[0].email).to.equal('getradder@igetrvng.com');
        return done();
      });
    });
  });

  it('creates a music group', (done) => {
    const db = database.getDB();
    db.collection('musicgroups').insert(musicGroup, (error, result) => {
      db.collection('musicgroups').find().toArray((error, collection) => {
        expect(collection).to.have.lengthOf(1);
        expect(collection[0]._id.toString()).to.equal(result.ops[0]._id.toString());
        expect(collection[0].name).to.equal('Laserdisc Visions');
        expect(collection[0].email).to.equal('vektroid@music.com');
        return done();
      });
    });
  });

  it('creates a music composition', (done) => {
    const db = database.getDB();
    db.collection('musiccompositions').insert(musicComposition, (error, result) => {
      db.collection('musiccompositions').find().toArray((error, collection) => {
        expect(collection).to.have.lengthOf(1);
        expect(collection[0]._id.toString()).to.equal(result.ops[0]._id.toString());
        expect(collection[0].name).to.equal('ドリーミー');
        expect(collection[0].iswc).to.equal('T-034.524.680-1');
        return done();
      });
    });
  });

  it('creates a music composition right', (done) => {
    const db = database.getDB();
    db.collection('musiccompositionrights').insert(musicCompositionRight, (error, result) => {
      db.collection('musiccompositionrights').find().toArray((error, collection) => {
        expect(collection).to.have.lengthOf(1);
        expect(collection[0]._id.toString()).to.equal(result.ops[0]._id.toString());
        expect(collection[0].percentageShares).to.equal(100);
        expect(collection[0].composer).to.deep.equal(person);
        expect(collection[0].composition).to.deep.equal(musicComposition);
        return done();
      });
    });
  });

  it('creates a music recording', (done) => {
    const db = database.getDB();
    db.collection('musicrecordings').insert(musicRecording, (error, result) => {
      db.collection('musicrecordings').find().toArray((error, collection) => {
        expect(collection).to.have.lengthOf(1);
        expect(collection[0]._id.toString()).to.equal(result.ops[0]._id.toString());
        expect(collection[0].name).to.equal('ドリーミー');
        expect(collection[0].isrc).to.equal('US-S1Z-99-0000');
        expect(collection[0].byArtist).to.deep.equal(musicGroup);
        expect(collection[0].composition).to.deep.equal(musicComposition);
        return done();
      });
    });
  });

  it('creates an audio object', (done) => {
    const db = database.getDB();
    db.collection('audioobjects').insert(audioObject, (error, result) => {
      db.collection('audioobjects').find().toArray((error, collection) => {
        expect(collection).to.have.lengthOf(1);
        expect(collection[0]._id.toString()).to.equal(result.ops[0]._id.toString());
        expect(collection[0].encodingFormat).to.equal('mp3');
        return done();
      });
    });
  });

  it('creates an image object', (done) => {
    const db = database.getDB();
    db.collection('imageobjects').insert(imageObject, (error, result) => {
      db.collection('imageobjects').find().toArray((error, collection) => {
        expect(collection).to.have.lengthOf(1);
        expect(collection[0]._id.toString()).to.equal(result.ops[0]._id.toString());
        expect(collection[0].encodingFormat).to.equal('jpeg');
        return done();
      });
    });
  });

  it('deletes a person', (done) => {
    const db = database.getDB();
    db.collection('people').find().toArray((error, collection) => {
      db.collection('people').remove({ _id: collection[0]._id }, (error) => {
        if (error) throw error;
        db.collection('people').find().toArray((error, result) => {
          expect(result).to.have.lengthOf(2);
          expect(result[0]._id).to.not.equal(collection[0]._id);
          expect(result[1]._id).to.not.equal(collection[0]._id);
          return done();
        });
      });
    });
  });
});
