/* test/spec.mjs
 * Application tests.
 * Matt Dumler <mattd3v@pm.me>
 */

// Node assertion API for testing.
import assert from 'assert';

// Electron testing framework and runtime.
import spectron from 'spectron';
import electron from 'electron';

async function test (tests) {
  // Create new Spectron app instance.
  const app = new spectron.Application({
    path: electron,
    args: ['main.js']
  });

  await app.start();
  await tests(app);
  await app.stop();
}

async function suite ({ client }) {
  const t = await client.getText('#title');
  assert.equal(t, 'Hello, World!');
  const s = await client.getText('#subtitle');
  assert.equal(s, 'Goodbye, cruel World!');
}

// Exit status
const OK = 0, FAIL = 1;
let status = OK;

// Execute test suite
test(suite)
  .catch(function ({ message }) {
    console.error(message)
    status = FAIL
  })
  .finally(function () {
    process.exit(status)
  })

