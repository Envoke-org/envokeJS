import { assert } from 'chai';
import { describe, it } from 'mocha';

import { newPerson } from '../../src/meta/schema';

// const ENVOKE = '<envoke placeholder>';
// const COALA = '<coalaip placeholder>';
const SCHEMA = 'http://schema.org/';

describe('Person', () => {
  const person = newPerson('2017-06-19', 'Attar', 'Alexander');
  it('validates a correctly formatted person', () => {
    assert.deepEqual(
      person, {
        '@context': SCHEMA,
        '@type': 'Person',
        birthDate: '2017-06-19',
        familyName: 'Attar',
        givenName: 'Alexander',
      },
      'schema should validate a correct object');
  });
});
