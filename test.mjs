/* test/spec.mjs
 * Application tests.
 * Matt Dumler <mattd3v@pm.me>
 */

// Node assertion API for testing.
import assert from 'assert';

// Electron testing framework and runtime.
import spectron from 'spectron';
import electron from 'electron';

// Test runner.
async function test () {
  // Create new Spectron app instance.
  const app = new spectron.Application({
    path: electron,
    args: ['main.js']
  });

  // Start, test, and stop app.
  try {
    await app.start();

    /* Tests start here. */

    // Test that focus starts on textarea,
    // and it takes user input.
    const input = 'hello';
    await app.client.keys(Array.from(input))
    const val = await app.client.getValue('textarea')
    assert.equal(val, input);

  } finally {
    await app.stop();
  }
}

// Possible exit statuses
const OK = 0, FAIL = 1;

// Exit status
let status = OK;

// Execute test suite
test().catch(function ({ message }) {
    console.error(message)
    status = FAIL
  })
  .finally(function () {
    process.exit(status)
  })

