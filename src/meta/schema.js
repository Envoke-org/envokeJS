// @flow
/* eslint-disable no-unused-vars */

/**
 * @module envokeJS/src/meta/schema
 * @description Schema definitions for Envoke.
 */

const ENVOKE = '<envoke placeholder>';
const COALA = '<coalaip placeholder>';
const SCHEMA = 'http://schema.org/';

/**
* A person (alive, dead, undead, or fictional).
* @param {string} birthDate -  ISO 8601 date format ie 2017-03-01.
* @param {string} familyName - The last name of an Person.
* @param {string} givenName - The first name of a Person.
* @param {ImageObject} image
* @returns {Object}
*/
function newPerson(birthDate: string, familyName: string, givenName: string, image: Object) {
  return {
    '@context': SCHEMA,
    '@type': 'Person',
    birthDate,
    familyName,
    givenName,
    image,
  };
}

/**
* An organization such as a school, NGO, corporation, club, etc.
* @param {string} name
* @param {string} description
* @param {string} email
* @param {Person[]} members
* @param {ImageObject} image
* @returns {Object}
*/
function newOrganization(
  name: string, description: string, email: string,
  members: Object[], image: Object,
): Object {
  return {
    '@context': SCHEMA,
    '@type': 'Organization',
    name,
    description,
    email,
    members,
    image,
  };
}

/**
* A musical group, such as a band, an orchestra, or a choir. Can also be a solo musician.
* @param {string} name
* @param {string} description
* @param {string} email
* @param {Object[]} members
* @param {ImageObject} image
* @returns {Object}
*/
function newMusicGroup(
  name: string, description: string, email: string, members: Object[], image: Object,
): Object {
  return {
    '@context': SCHEMA,
    '@type': 'MusicGroup',
    name,
    description,
    email,
    members,
    image,
  };
}

/**
* A composition represents the written music and lyrics of a musical work.
* @param {string} name - The name of the item.
* @param {Person} composer - The person or organization who wrote a composition.
* @param {string} iswcCode - The International Standard Musical Work Code for the composition.
* @returns {Object}
*/
function newMusicComposition(name: string, composer: string, iswc: string): Object {
  return {
    '@context': SCHEMA,
    '@type': 'MusicComposition',
    name,
    composer,
    iswc,
  };
}

/**
* A composition right indicates ownership of a composition.
* The amount in the transaction output specifies the percentage shares.
* @param {Composition} composition
* @param {Person} composer
* @param {number} percentageShares - percentage of ownership between 0 and 100.
* @param {string} validFrom
* @param {string} validThrough
* @param {string[]} territories - country codes.
* @returns {Object}
*/
function newMusicCompositionRight(
  composition: Object, composer: Object, percentageShares: number, validFrom: string,
  validThrough: string, territories: string[],
): Object {
  return {
    '@context': SCHEMA,
    '@type': 'MusicCompositionRight',
    composition,
    composer,
    percentageShares,
    validFrom,
    validThrough,
    territories,
  };
}

/**
* A recording represents a recorded performance of a composition.
* @param {MusicGroup} byArtist - The artist that performed this album or recording.
* @param {string} duration - The duration of the item in ISO 8601 date format ie 2017-03-08.
* @param {string} isrc - The International Standard Recording Code for the recording.
* @param {Composition} composition - The composition this track is a recording of.
* @param {AudioObject} audio - An audio file.
* @param {ImageObject} image
* @returns {Object}
*/
function newMusicRecording(
  name: string, composition: Object, byArtist: Object,
  duration: string, isrc: string, audio: Object, image: Object,
): Object {
  return {
    '@context': SCHEMA,
    '@type': 'MusicRecording',
    name,
    composition,
    byArtist,
    duration,
    isrc,
    audio,
    image,
  };
}

/**
* A collection of music tracks in playlist form.
* @param {Recording[]} tracks
* @param {ImageObject} image
* @returns {Object}
*/
function newMusicPlaylist(name: string, tracks: Object[], image: Object): Object {
  return {
    '@context': SCHEMA,
    '@type': 'MusicPlaylist',
    name,
    tracks,
    image,
  };
}

/**
* A collection of music tracks.
* @param {string} name - The name of the item.
* @param {Recording[]} tracks
* @param {string} albumProductionType - soundtrack, live album, studio album, etc.
* @param {string} releaseType - The kind of release which this album is: single, EP or LP
* @param {MusicGroup} byArtist - The artist that performed this album or recording.
* @param {MusicRelease[]} releases - Releases of this album.
* @param {ImageObject} image
* @returns {Object}
*/
function newMusicAlbum(
  name: string, tracks: Object[], albumProductionType: string,
  releaseType: string, byArtist: Object, releases: Object[], image: Object,
): Object {
  return {
    '@context': SCHEMA,
    '@type': 'MusicAlbum',
    name,
    tracks,
    albumProductionType,
    releaseType,
    byArtist,
    releases,
    image,
  };
}

/**
* A MusicRelease is a specific release of a music album.
* @param {string} catalogNumber - The catalog number for the release.
* @param {string} musicReleaseFormat - digital, vinyl, tape, compact disc, etc.
* @param {Organization} recordLabel - The label that issued the release.
* @param {ImageObject} image
* @returns {Object}
*/
function newMusicRelease(
  catalogNumber: string, musicReleaseFormat: string,
  recordLabel: Object, image: Object,
): Object {
  return {
    '@context': SCHEMA,
    '@type': 'MusicRelease',
    catalogNumber,
    musicReleaseFormat,
    recordLabel,
    image,
  };
}

/**
* An audio file.
* @param {string} contentUrl - Actual bytes of the media object.
* @param {string} encodingFormat - mp3, wav, flac, etc.
* @returns {Object}
*/
function newAudioObject(contentUrl: string, encodingFormat: string): Object {
  return {
    '@context': SCHEMA,
    '@type': 'AudioObject',
    contentUrl,
    encodingFormat,
  };
}

/**
* An image file.
* @param {string} contentUrl - Actual bytes of the media object.
* @param {string} encodingFormat - jpeg, gif, png, etc.
* @returns {Object}
*/
function newImageObject(contentUrl: string, encodingFormat: string): Object {
  return {
    '@context': SCHEMA,
    '@type': 'ImageObject',
    contentUrl,
    encodingFormat,
  };
}

export {
  newPerson,
  newOrganization,
  newMusicGroup,
  newMusicComposition,
  newMusicRecording,
  newAudioObject,
  newImageObject,
  newMusicPlaylist,
  newMusicAlbum,
  newMusicRelease,
  newMusicCompositionRight,
};
