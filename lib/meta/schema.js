'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/* eslint-disable no-unused-vars */

/**
 * @module envokeJS/src/meta/schema
 * @description Schema definitions for Envoke.
 */

var ENVOKE = '<envoke placeholder>';
var COALA = '<coalaip placeholder>';
var SCHEMA = 'http://schema.org/';

/**
* A person (alive, dead, undead, or fictional).
* @param {string} birthDate -  ISO 8601 date format ie 2017-03-01.
* @param {string} familyName - The last name of an Person.
* @param {string} givenName - The first name of a Person.
* @returns {Object}
*/
function newPerson(birthDate, familyName, givenName) {
  return {
    '@context': SCHEMA,
    '@type': 'Person',
    birthDate: birthDate,
    familyName: familyName,
    givenName: givenName
  };
}

/**
* An organization such as a school, NGO, corporation, club, etc.
* @param {string} name
* @param {string} description
* @param {string} email
* @param {Object[]} members
* @returns {Object}
*/
function newOrganization(name, description, email, members) {
  return {
    '@context': SCHEMA,
    '@type': 'Organization',
    name: name,
    description: description,
    email: email,
    members: members
  };
}

/**
* A musical group, such as a band, an orchestra, or a choir. Can also be a solo musician.
* @param {string} name
* @param {string} description
* @param {string} email
* @param {Object[]} members
* @returns {Object}
*/
function newMusicGroup(name, description, email, members) {
  return {
    '@context': SCHEMA,
    '@type': 'Organization',
    name: name,
    description: description,
    email: email,
    members: members
  };
}

/**
* A composition represents the written music and lyrics of a musical work.
* @param {string} name - The name of the item.
* @param {string} composer - The person or organization who wrote a composition.
* @param {string} iswcCode - The International Standard Musical Work Code for the composition.
* @returns {Object}
*/
function newMusicComposition(name, composer, iswc) {
  return {
    '@context': SCHEMA,
    '@type': 'MusicComposition',
    name: name,
    composer: composer,
    iswc: iswc
  };
}

/**
* A recording represents a recorded performance of a composition.
* @param {MusicGroup} byArtist - The artist that performed this album or recording.
* @param {string} duration - The duration of the item in ISO 8601 date format ie 2017-03-08.
* @param {Album} inAlbum - The album to which this recording belongs.
* @param {Playlist} inPlaylist - The playlist to which this recording belongs.
* @param {string} isrc - The International Standard Recording Code for the recording.
* @param {Composition} composition - The composition this track is a recording of.
* @param {AudioObject} audio - An audio file.
* @returns {Object}
*/
function newMusicRecording(byArtist, duration, inAlbum, inPlaylist, isrc, composition, audio) {
  return {
    '@context': SCHEMA,
    '@type': 'MusicRecording',
    byArtist: byArtist,
    duration: duration,
    inAlbum: inAlbum,
    inPlaylist: inPlaylist,
    isrc: isrc,
    composition: composition,
    audio: audio
  };
}

/**
* An audio file.
* @param {string} contentUrl - Actual bytes of the media object.
* @param {string} encodingFormat - mp3, wav, flac, etc.
* @returns {Object}
*/
function newAudioObject(contentUrl, encodingFormat) {
  return {
    '@context': SCHEMA,
    '@type': 'AudioObject',
    contentUrl: contentUrl,
    encodingFormat: encodingFormat
  };
}

/**
* An image file.
* @param {string} contentUrl - Actual bytes of the media object.
* @param {string} encodingFormat - jpeg, gif, png, etc.
* @returns {Object}
*/
function newImageObject(contentUrl, encodingFormat) {
  return {
    '@context': SCHEMA,
    '@type': 'ImageObject',
    contentUrl: contentUrl,
    encodingFormat: encodingFormat
  };
}

/**
* A collection of music tracks in playlist form.
* @param {Recording[]} tracks
* @returns {Object}
*/
function newMusicPlaylist(tracks) {
  return {
    '@context': SCHEMA,
    '@type': 'MusicPlaylist',
    tracks: tracks
  };
}

/**
* A collection of music tracks.
* @param {string} productionType - soundtrack, live album, studio album, etc.
* @param {Release} release - a release of this album
* @param {string} releaseType - The kind of release which this album is: single, EP or LP
* @param {MusicGroup} byArtist - The artist that performed this album or recording.
* @returns {Object}
*/
function newMusicAlbum(tracks, productionType, release, releaseType, byArtist) {
  return {
    '@context': SCHEMA,
    '@type': 'MusicAlbum',
    tracks: tracks,
    productionType: productionType,
    release: release,
    releaseType: releaseType,
    byArtist: byArtist
  };
}

/**
* A MusicRelease is a specific release of a music album.
* @param {Object} tracks - The catalog number for the release.
* @param {string} catalogNumber - The catalog number for the release.
* @param {string} duration - The duration of the item in ISO 8601 date format ie 2017-03-08.
* @param {string} musicReleaseFormat - digital, vinyl, tape, compact disc, etc.
* @param {Organization} recordLabel - The label that issued the release.
* @param {Album} releaseOf - The album this is a release of.
* @returns {Object}
*/
function newMusicRelease(tracks, catalogNumber, duration, musicReleaseFormat, recordLabel, releaseOf) {
  return {
    '@context': SCHEMA,
    '@type': 'MusicRelease',
    tracks: tracks,
    catalogNumber: catalogNumber,
    duration: duration,
    musicReleaseFormat: musicReleaseFormat,
    recordLabel: recordLabel,
    releaseOf: releaseOf
  };
}

/**
* A composition right indicates ownership of a composition.
* The amount in the transaction output specifies the percentage shares.
* @param {string} compositionId
* @param {number} percentageShares - percentage of ownership between 0 and 100.
* @param {string} validFrom
* @param {string} validThrough
* @param {string[]} territories - country codes.
* @returns {Object}
*/
function newMusicCompositionRight(compositionId, percentageShares, validFrom, validThrough, territories) {
  return {
    '@context': SCHEMA,
    '@type': 'MusicCompositionRight',
    compositionId: compositionId,
    percentageShares: percentageShares,
    validFrom: validFrom,
    validThrough: validThrough,
    territories: territories
  };
}

exports.newPerson = newPerson;
exports.newOrganization = newOrganization;
exports.newMusicGroup = newMusicGroup;
exports.newMusicComposition = newMusicComposition;
exports.newMusicRecording = newMusicRecording;
exports.newAudioObject = newAudioObject;
exports.newImageObject = newImageObject;
exports.newMusicPlaylist = newMusicPlaylist;
exports.newMusicAlbum = newMusicAlbum;
exports.newMusicRelease = newMusicRelease;
exports.newMusicCompositionRight = newMusicCompositionRight;