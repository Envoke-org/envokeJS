/* eslint-disable consistent-return */
import { MongoClient } from 'mongodb';

const state = {
  db: null,
};

const TEST_DATABASE = 'mongodb://localhost:27017/test';
export const TESTING = true;

export async function connect(url = TEST_DATABASE) {
  state.db = await MongoClient.connect(url);
}

export function getDB() {
  return state.db;
}

export async function drop() {
  const collections = await state.db.collections();
  for (const collection of collections) {
    collection.remove();
  }
}

export async function fixtures(data) {
  const db = state.db;
  if (!db) {
    return new Error('Missing database connection.');
  }

  const names = Object.keys(data.collections);
  for (const name of names) {
    let collection = await db.createCollection(name);
    let test = await collection.insert(data.collections[name]);
  }
}
