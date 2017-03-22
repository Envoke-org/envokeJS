import { expect } from 'chai'
import { describe, it } from 'mocha';
import r from 'rethinkdb';

describe('RethinkDB', () => {
  it('connects to the database', () => {
    r.connect({ host: 'localhost', port: 28015 }, (err) => {
      if (err) throw err;
    });
  });

  it('creates a table', () => {
    r.connect({ host: 'localhost', port: 28015 }, (_, conn) => {
      r.db('test').tableCreate('person').run(conn, (err, result) => {
        if (err) throw err;
      });
    });
  });

  it('inserts data', () => {
    r.connect({ host: 'localhost', port: 28015 }, (_, conn) => {
      r.table('person').insert([
        { name: 'William Adama' },
        { name: 'Laura Roslin' },
        { name: 'Jean-Luc Picard' },
      ]).run(conn, (err) => {
        if (err) throw err;
      });
    });
  });

  it('gets data', async function(done) {
    var results = null;
    try {
      r.connect({ host: 'localhost', port: 28015 }, (_, conn) => {
        r.table('person').run(conn).then().then((results) => {
          console.log(results);
          return (results);
        }).catch((err) => {
          console.log(err);
        });
      });
      expect(results).to.equal([{ name: 'William Adama' }, { sname: 'Jean-Luc Picard' }, { name: 'Laura Roslin' }]);
      done();
    } catch (err) {
      done(err);
    }
  });
});
