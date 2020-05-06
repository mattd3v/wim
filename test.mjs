/* test/spec.mjs
 * Application tests.
 * Matt Dumler <mattd3v@pm.me>
 */

// Electron testing framework and runtime.
import spectron from 'spectron'
import electron from 'electron'

// Node assertion API for testing.
import assert from 'assert'

// Create new Spectron app instance.
const app = new spectron.Application({
  path: electron,
  args: [ './main.js' ]
})

// Chain app start, test, stop, and handle any errors.
app.start()
  .then(function () {
    return app.client.getText('#header')
  })
  .then(function (el) {
    assert.equal(el, 'Hello, 🌎!')
  })
  .catch((err) => console.error(err.message))
  .finally(() => app.stop())
