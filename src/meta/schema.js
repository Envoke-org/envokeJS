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
 * Gets the data objects ID
 * @param {Object} data
 * @returns {string} id
 */
function getId(data) {
  return data.get('@id');
}

class Person {
  /*
  * A person (alive, dead, undead, or fictional).
  * {string} birthDate
  * {string} familyName - The last name of an Person.
  * {string} givenName - The first name of a Person.
  */

  birthDate: string;
  familyName: string;
  givenName: string;

  constructor(birthDate: string, familyName: string, givenName: string) {
    this.birthDate = birthDate;
    this.familyName = familyName;
    this.givenName = givenName;
  }
}

class Organization {
  /*
  * An organization such as a school, NGO, corporation, club, etc.
  * {string} name
  * {string} description
  * {string} email
  * {Array<string>} memberNames
  */

  name: string;
  description: string;
  email: string;
  memberNames: Array<string>

  constructor(
    name: string, description: string, email: string, memberNames: Array<string>,
  ) {
    this.name = name;
    this.description = description;
    this.email = email;
    if (typeof memberNames !== 'undefined') {
      // TODO
    }
  }
}

class MusicGroup extends Organization {
  /*
  * A musical group, such as a band, an orchestra, or a choir. Can also be a solo musician.
  * {string} genre
  */

  genre: string;

  constructor(genre) {
    super();
    this.genre = genre;
  }
}

class Composition {
  /*
  * A composition represents the written music and lyrics of a musical work.
  * @param {string} name
  * @param {string} composerId
  * @param {string} iswc
  */

  name: string;
  composerId: string;
  iswc: string;

  constructor(name: string, composerId: string, iswc: string) {
    this.name = name;
    this.composerId = composerId;
    this.iswc = iswc;
  }
}

class Recording {
  /**
  * A recording represents a recorded performance of a composition.
  * @param {Artist} byArtist - The artist that performed this album or recording.
  * @param {string} duration - The duration of the item in ISO 8601 date format ie 2017-03-08.
  * @param {Album} inAlbum - The album to which this recording belongs.
  * @param {Playlist} inPlaylist - The playlist to which this recording belongs.
  * @param {string} isrc - The International Standard Recording Code for the recording.
  * @param {Composition} composition - The composition this track is a recording of.
  */

  byArtist: Object;
  duration: string;
  inAlbum: Album;
  inPlaylist: Playlist;
  isrc: string;
  composition: Composition;

  constructor(
    byArtist: Object, duration: string, inAlbum: Album,
    inPlaylist: Playlist, isrc: string, composition: Composition,
  ) {
    this.byArtist = byArtist;
    this.duration = duration;
    this.inAlbum = inAlbum;
    this.inPlaylist = inPlaylist;
    this.isrc = isrc;
    this.composition = composition;
  }
}

class Playlist {
  /**
  * A collection of music tracks in playlist form.
  * @param {Array<Recording>} tracks
  */

  tracks: Array<Recording>;

  constructor(tracks: Array<Recording>) {
    this.tracks = tracks;
  }
}

class Album extends Playlist {
  /**
  * A collection of music tracks.
  * @param {string} productionType - soundtrack, live album, studio album, etc.
  * @param {Release} release - a release of this album
  * @param {string} releaseType - The kind of release which this album is: single, EP or LP
  * @param {Artist} artist - The artist that performed this album or recording.
  */

  productionType: string;
  release: Release;
  releaseType: string;
  artist: Object;

  constructor(productionType: string, release: Release, releaseType: string, artist: Object) {
    super();
    this.productionType = productionType;
    this.release = release;
    this.releaseType = releaseType;
    this.artist = artist;
  }
}

class Release extends Playlist {
  /**
  * A Release is a specific release of a music album.
  * @param {string} catalogNumber - The catalog number for the release.
  * @param {string} duration - The duration of the item in ISO 8601 date format ie 2017-03-08.
  * @param {string} format - digital, vinyl, tape, compact disc, etc.
  * @param {string} recordLabel - The label that issued the release.
  * @param {Album} releaseOf - The album this is a release of.
  */

  catalogNumber: string;
  duration: string;
  format: string;
  recordLabel: string;
  releaseOf: Album;

  constructor(
    catalogNumber: string, duration: string, format: string,
    recordLabel: string, releaseOf: Album,
  ) {
    super();
    this.catalogNumber = catalogNumber;
    this.duration = duration;
    this.format = format;
    this.recordLabel = recordLabel;
    this.releaseOf = releaseOf;
  }
}

class CompositionRight {
  /**
  * A composition right indicates ownership of a composition.
  * The amount in the transaction output specifies the percentage shares.
  * @param {string} compositionId
  * @param {number} percentageShares - percentage of ownership between 0 and 100.
  * @param {string} validFrom
  * @param {string} validThrough
  * @param {string[]} territories - country codes.
  */

  compositionId: string;
  percentageShares: number;
  validFrom: string;
  validThrough: string;
  territories: Array<string>;

  constructor(
    compositionId: string, percentageShares: number, validFrom: string,
    validThrough: string, territories: Array<string>,
  ) {
    this.compositionId = compositionId;
    this.percentageShares = percentageShares;
    this.validFrom = validFrom;
    this.validFrom = validThrough;
    this.territories = territories;
  }
}

class User {

  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }

  toString() {
    return `${this.name}: ${this.id}}`;
  }
}

export {
  User,
  Composition,
  Recording,
  Playlist,
  Album,
  Release,
  CompositionRight,
};
