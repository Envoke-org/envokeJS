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
* @param {string} birthDate
* @param {string} familyName - The last name of an Person.
* @param {string} givenName - The first name of a Person.
*/
function newPerson(birthDate: string, familyName: string, givenName: string) {
  return {
    '@context': SCHEMA,
    '@type': 'Person',
    birthDate,
    familyName,
    givenName,
  };
}

/**
* An organization such as a school, NGO, corporation, club, etc.
* @param {string} name
* @param {string} description
* @param {string} email
* @param {string[]} memberIds
*/
function newOrganization(
  name: string, description: string, email: string,
  memberIds: string[],
): Object {
  const members = memberIds.map(m => ({ '@type': 'Person', '@id': m }));
  return {
    '@context': SCHEMA,
    '@type': 'Organization',
    name,
    description,
    email,
    members,
  };
}

/**
* A musical group, such as a band, an orchestra, or a choir. Can also be a solo musician.
* @param {string} genre
*/
function newMusicGroup() {}


/**
* A composition represents the written music and lyrics of a musical work.
* @param {string} name
* @param {string} composerId
* @param {string} iswc
*/
function newComposition(name: string, composerId: string, iswc: string): Object {
  return {
    '@context': SCHEMA,
    '@type': 'Composition',
    name,
    composerId,
    iswc,
  };
}

/**
* A recording represents a recorded performance of a composition.
* @param {Artist} byArtist - The artist that performed this album or recording.
* @param {string} duration - The duration of the item in ISO 8601 date format ie 2017-03-08.
* @param {Album} inAlbum - The album to which this recording belongs.
* @param {Playlist} inPlaylist - The playlist to which this recording belongs.
* @param {string} isrc - The International Standard Recording Code for the recording.
* @param {Composition} composition - The composition this track is a recording of.
*/
function newRecording(
  byArtist: Object, duration: string, inAlbum: Object,
  inPlaylist: Object, isrc: string, composition: Object,
): Object {
  return {
    '@context': SCHEMA,
    '@type': 'Recording',
    byArtist,
    duration,
    inAlbum,
    inPlaylist,
    isrc,
    composition,
  };
}

/**
* A collection of music tracks in playlist form.
* @param {Recording[]} tracks
*/
function newPlaylist(tracks): Object {
  return {
    '@context': SCHEMA,
    '@type': 'Playlist',
    tracks,
  };
}

/**
* A collection of music tracks.
* @param {string} productionType - soundtrack, live album, studio album, etc.
* @param {Release} release - a release of this album
* @param {string} releaseType - The kind of release which this album is: single, EP or LP
* @param {Artist} artist - The artist that performed this album or recording.
*/
function newAlbum(
  tracks: Array<Object>, productionType: string,
  release: Object, releaseType: string, artist: Object,
): Object {
  return {
    '@context': SCHEMA,
    '@type': 'Album',
    tracks,
    productionType,
    release,
    releaseType,
    artist,
  };
}

function newRelease(
  tracks: Array<Object>, catalogNumber: string, duration: string,
  format: string, recordLabel: string, releaseOf: Object,
): Object {
  return {
    '@context': SCHEMA,
    '@type': 'Release',
    tracks,
    catalogNumber,
    duration,
    format,
    recordLabel,
    releaseOf,
  };
}

function newCompositionRight(
  compositionId: string, percentageShares: number, validFrom: string,
  validThrough: string, territories: string[],
): Object {
  return {
    '@context': SCHEMA,
    '@type': 'CompositionRight',
    compositionId,
    percentageShares,
    validFrom,
    validThrough,
    territories,
  };
}

function newUser(name: string, id: string) {
  return `${name}: ${id}`;
}

/**
 * Gets the data objects ID
 * @param {Object} data
 * @returns {string} id
 */
function getId(data) {
  return data.get('@id');
}

