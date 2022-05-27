import assert from 'node:assert'
import { resolve } from 'node:path'
import { env } from 'node:process'
import fetch from 'node-fetch'
import { joinUrl, setup, teardown } from '../_testHelpers/index.js'

describe('Lambda.invokeAsync tests', function desc() {
  this.timeout(30000)

  beforeEach(() =>
    setup({
      servicePath: resolve(__dirname),
    }),
  )

  afterEach(() => teardown())

  //
  ;[
    {
      description: '...',
      expected: {
        Status: 200,
      },
      path: '/dev/invoke-async',
      status: 200,
    },
  ].forEach(({ description, expected, path, status }) => {
    it(description, async () => {
      const url = joinUrl(env.TEST_BASE_URL, path)

      const response = await fetch(url)
      assert.equal(response.status, status)

      const json = await response.json()
      assert.deepEqual(json, expected)
    })
  })
})
