/**
 * houston/src/worker/task/appstream/id.spec.ts
 * Tests the appstream id test
 */

import { AppstreamId } from './id'

import { mock } from '../../../../test/utility/worker'

test('passes with a matching ID', async () => {
  const worker = await mock({
    nameAppstream: 'com.github.philip-scott.spice-up.desktop',
    nameDomain: 'com.github.philip-scott.spice-up'
  })

  await worker.mock('task/appstream/spice-up.xml', 'package/usr/share/metainfo/com.github.philip-scott.spice-up.appdata.xml')

  worker.tasks.push(AppstreamId)

  await worker.setup()
  await worker.run()
  await worker.teardown()

  expect(worker.context.logs).toHaveLength(0)
})

test('fails with an incorrect ID', async () => {
  const worker = await mock({
    nameAppstream: 'com.github.elementary.houston.desktop',
    nameDomain: 'com.github.philip-scott.spice-up'
  })

  await worker.mock('task/appstream/spice-up.xml', 'package/usr/share/metainfo/com.github.elementary.houston.appdata.xml')

  worker.tasks.push(AppstreamId)

  await worker.setup()
  await worker.run()
  await worker.teardown()

  expect(worker.context.logs).toHaveLength(1)
})
