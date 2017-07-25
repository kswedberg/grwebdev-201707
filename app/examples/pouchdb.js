// Copied/modified from pouchdb.com

import PouchDB from 'pouchdb';

var db = new PouchDB('grwebdev');

db.changes().on('change', function() {
  console.log('Ch-Ch-Changes');
});

db.put({
  _id: 'karl@example.com',
  name: 'Karl',
  age: 32
});

db.replicate.to('http://example.com/mydb');
