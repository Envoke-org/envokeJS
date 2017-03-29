import { assert } from 'chai';
import { describe, it } from 'mocha';

import {
  newPerson, newOrganization, newMusicGroup,
  newMusicComposition, newMusicCompositionRight,
  newMusicRecording, newImageObject,
} from '../../src/meta/schema';

// const ENVOKE = '<envoke placeholder>';
// const COALA = '<coalaip placeholder>';
const SCHEMA = 'http://schema.org/';

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
  'Sacred Tapestry',
  'Ramona Andra Xavier is an American electronic musician from Portland, Oregon.',
  'vektroid@music.com',
  [person],
  'https://ipfs.io/ipfs/QmdhTuX4V4uAUKotFTFpeHDEkSDvWVGfsvqT5EwtmtnPUW',
);
let musicComposition = newMusicComposition('ドリーミー', person, 'T-034.524.680-1');
const musicCompositionRight = newMusicCompositionRight(
  musicComposition, person, 100, '2016-01-01', '2017-01-01', ['US'],
);
const musicRecording = newMusicRecording('ドリーミー', musicComposition, musicGroup, 'PT5M', 'US-S1Z-99-0000');
const imageObject = newImageObject('http://ipfs.io/ipfs/QmcSFW35JqBdYh6uTqHhKuV9Stv8ayeKGoH9HRxEyi3Eh3', 'jpeg');
const audioObject = newImageObject('http://ipfs.io/ipfs/QmcSFW35JqBdYh6uTqHhKuV9Stv8ayeKGoH9HRxEyi3Eh3', 'mp3');

const shaderUrl = 'https://ipfs.io/ipfs/Qmf39ZCCojdTkwaPcddUZQ9F2VYRfpkwQiKqFoC3mpCxjA';
const shaderTitles = [
  'Skyfall IV (Strike Suit)', 'LDVHD Terminus', 'ROGO', 'ドリーミー',
  'Transmigration', 'Cosmorama', 'Microsleep 2012', 'Spirited Child', 'Hushedcasket ',
];

const playlist = [];
for (const i of shaderTitles) {
  const c = newMusicComposition(i, person, `T-034.524.680-${Math.floor(Math.random() * 9) + 1}`);
  playlist.push(newMusicRecording(
    i, c, musicGroup, 'PT5M', `US-S1Z-99-00${Math.floor(Math.random() * 99) + 1}`),
  );
}

describe('Schema', () => {
  it('validates a correctly formatted person', () => {
    assert.deepEqual(
      person, {
        '@context': SCHEMA,
        '@type': 'Person',
        birthDate: '2017-06-19',
        familyName: 'Xavier',
        givenName: 'Ramona',
        image: 'https://ipfs.io/ipfs/QmdhTuX4V4uAUKotFTFpeHDEkSDvWVGfsvqT5EwtmtnPUW',
      },
      'schema should validate a correct object',
    );
  });

  it('validates a correctly formatted organization', () => {
    assert.deepEqual(
      organization, {
        '@context': SCHEMA,
        '@type': 'Organization',
        name: 'RVNG Intl.',
        members: undefined,
        image: undefined,
        description: 'Brooklyn-based music institution that operates on few but heavily ' +
                     'fortified principals, dealing with forward-reaching artists.',
        email: 'getradder@igetrvng.com',
      },
      'schema should validate a correct object',
    );
  });

  it('validates a correctly formatted music group', () => {
    assert.deepEqual(
      musicGroup, {
        '@context': SCHEMA,
        '@type': 'MusicGroup',
        name: 'Sacred Tapestry',
        description: 'Ramona Andra Xavier is an American electronic musician from Portland, Oregon.',
        email: 'vektroid@music.com',
        members: [
          {
            '@context': 'http://schema.org/',
            '@type': 'Person',
            birthDate: '2017-06-19',
            familyName: 'Xavier',
            givenName: 'Ramona',
            image: 'https://ipfs.io/ipfs/QmdhTuX4V4uAUKotFTFpeHDEkSDvWVGfsvqT5EwtmtnPUW',
          },
        ],
        image: 'https://ipfs.io/ipfs/QmdhTuX4V4uAUKotFTFpeHDEkSDvWVGfsvqT5EwtmtnPUW',
      },
      'schema should validate a correct object',
    );
  });

  it('validates a correctly formatted music composition', () => {
    assert.deepEqual(
      musicComposition, {
        '@context': 'http://schema.org/',
        '@type': 'MusicComposition',
        composer: {
          '@context': SCHEMA,
          '@type': 'Person',
          birthDate: '2017-06-19',
          familyName: 'Xavier',
          givenName: 'Ramona',
          image: 'https://ipfs.io/ipfs/QmdhTuX4V4uAUKotFTFpeHDEkSDvWVGfsvqT5EwtmtnPUW',
        },
        name: 'ドリーミー',
        iswc: 'T-034.524.680-1',
      },
      'schema should validate a correct object',
    );
  });

  it('validates a correctly formatted music composition right', () => {
    assert.deepEqual(
      musicCompositionRight, {
        '@context': 'http://schema.org/',
        '@type': 'MusicCompositionRight',
        composition: {
          '@context': 'http://schema.org/',
          '@type': 'MusicComposition',
          composer: {
            '@context': SCHEMA,
            '@type': 'Person',
            birthDate: '2017-06-19',
            familyName: 'Xavier',
            givenName: 'Ramona',
            image: 'https://ipfs.io/ipfs/QmdhTuX4V4uAUKotFTFpeHDEkSDvWVGfsvqT5EwtmtnPUW',
          },
          name: 'ドリーミー',
          iswc: 'T-034.524.680-1',
        },
        composer: {
          '@context': SCHEMA,
          '@type': 'Person',
          birthDate: '2017-06-19',
          familyName: 'Xavier',
          givenName: 'Ramona',
          image: 'https://ipfs.io/ipfs/QmdhTuX4V4uAUKotFTFpeHDEkSDvWVGfsvqT5EwtmtnPUW',
        },
        percentageShares: 100,
        territories: [
          'US',
        ],
        validFrom: '2016-01-01',
        validThrough: '2017-01-01',
      },
      'schema should validate a correct object',
    );
  });

  it('validates a correctly formatted music recording', () => {
    assert.deepEqual(
      musicRecording, {
        '@context': 'http://schema.org/',
        '@type': 'MusicRecording',
        byArtist: {
          '@context': 'http://schema.org/',
          '@type': 'MusicGroup',
          name: 'Sacred Tapestry',
          description: 'Ramona Andra Xavier is an American electronic musician from Portland, Oregon.',
          email: 'vektroid@music.com',
          members: [
            {
              '@context': 'http://schema.org/',
              '@type': 'Person',
              birthDate: '2017-06-19',
              familyName: 'Xavier',
              givenName: 'Ramona',
              image: 'https://ipfs.io/ipfs/QmdhTuX4V4uAUKotFTFpeHDEkSDvWVGfsvqT5EwtmtnPUW',
            },
          ],
          image: 'https://ipfs.io/ipfs/QmdhTuX4V4uAUKotFTFpeHDEkSDvWVGfsvqT5EwtmtnPUW',
        },
        duration: 'PT5M',
        isrc: 'US-S1Z-99-0000',
        name: 'ドリーミー',
        audio: undefined,
        composition: {
          '@context': 'http://schema.org/',
          '@type': 'MusicComposition',
          composer: {
            '@context': SCHEMA,
            '@type': 'Person',
            birthDate: '2017-06-19',
            familyName: 'Xavier',
            givenName: 'Ramona',
            image: 'https://ipfs.io/ipfs/QmdhTuX4V4uAUKotFTFpeHDEkSDvWVGfsvqT5EwtmtnPUW',
          },
          name: 'ドリーミー',
          iswc: 'T-034.524.680-1',
        },
        image: undefined,
      },
      'schema should validate a correct object',
    );
  });

  it('validates a correctly formatted image object', () => {
    assert.deepEqual(
      imageObject, {
        '@context': 'http://schema.org/',
        '@type': 'ImageObject',
        contentUrl: 'http://ipfs.io/ipfs/QmcSFW35JqBdYh6uTqHhKuV9Stv8ayeKGoH9HRxEyi3Eh3',
        encodingFormat: 'jpeg',
      },
      'schema should validate a correct object',
    );
  });

  it('validates a correctly formatted audio object', () => {
    assert.deepEqual(
      audioObject, {
        '@context': 'http://schema.org/',
        '@type': 'ImageObject',
        contentUrl: 'http://ipfs.io/ipfs/QmcSFW35JqBdYh6uTqHhKuV9Stv8ayeKGoH9HRxEyi3Eh3',
        encodingFormat: 'mp3',
      },
      'schema should validate a correct object',
    );
  });
});
