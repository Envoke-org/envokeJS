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
* @param {ImageObject} image
* @returns {Object}
*/
function newPerson(birthDate, familyName, givenName, image) {
  return {
    '@context': SCHEMA,
    '@type': 'Person',
    birthDate: birthDate,
    familyName: familyName,
    givenName: givenName,
    image: image
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
function newOrganization(name, description, email, members, image) {
  return {
    '@context': SCHEMA,
    '@type': 'Organization',
    name: name,
    description: description,
    email: email,
    members: members,
    image: image
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
function newMusicGroup(name, description, email, members, image) {
  return {
    '@context': SCHEMA,
    '@type': 'MusicGroup',
    name: name,
    description: description,
    email: email,
    members: members,
    image: image
  };
}

/**
* A composition represents the written music and lyrics of a musical work.
* @param {string} name - The name of the item.
* @param {Person} composer - The person or organization who wrote a composition.
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
function newMusicCompositionRight(composition, composer, percentageShares, validFrom, validThrough, territories) {
  return {
    '@context': SCHEMA,
    '@type': 'MusicCompositionRight',
    composition: composition,
    composer: composer,
    percentageShares: percentageShares,
    validFrom: validFrom,
    validThrough: validThrough,
    territories: territories
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
function newMusicRecording(name, composition, byArtist, duration, isrc, audio, image) {
  return {
    '@context': SCHEMA,
    '@type': 'MusicRecording',
    name: name,
    composition: composition,
    byArtist: byArtist,
    duration: duration,
    isrc: isrc,
    audio: audio,
    image: image
  };
}

/**
* A collection of music tracks in playlist form.
* @param {Recording[]} tracks
* @param {ImageObject} image
* @returns {Object}
*/
function newMusicPlaylist(name, tracks, image) {
  return {
    '@context': SCHEMA,
    '@type': 'MusicPlaylist',
    name: name,
    tracks: tracks,
    image: image
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
function newMusicAlbum(name, tracks, albumProductionType, releaseType, byArtist, releases, image) {
  return {
    '@context': SCHEMA,
    '@type': 'MusicAlbum',
    name: name,
    tracks: tracks,
    albumProductionType: albumProductionType,
    releaseType: releaseType,
    byArtist: byArtist,
    releases: releases,
    image: image
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
function newMusicRelease(catalogNumber, musicReleaseFormat, recordLabel, image) {
  return {
    '@context': SCHEMA,
    '@type': 'MusicRelease',
    catalogNumber: catalogNumber,
    musicReleaseFormat: musicReleaseFormat,
    recordLabel: recordLabel,
    image: image
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