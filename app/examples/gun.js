// Copied/modified from https://github.com/amark/gun/wiki/Getting-Started-%28v0.3.x%29
import Gun from './gun.js';

// Connect local db to  peers
var peers = ['example1.com', 'example2.com'];

var gun = new Gun(peers);

// Create an interface for the `greetings`
// key, storing it in a variable.
var greetings = gun.get('greetings');

// Update the value on `greetings`.
greetings.put({hello: 'world'});

// Read the value and listen for
// any changes.
greetings.on(function(data) {
  console.log('Update!', data);
});
