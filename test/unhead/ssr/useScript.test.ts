import { describe, it } from 'vitest'
import { createHead, useScript } from 'unhead'
import { renderSSRHead } from '@unhead/ssr'

describe('dom useScript', () => {
  it('default', async () => {
    const head = createHead()

    useScript({
      src: 'https://cdn.example.com/script.js',
    })

    const ctx = await renderSSRHead(head)
    expect(ctx).toMatchInlineSnapshot(`
      {
        "bodyAttrs": "",
        "bodyTags": "",
        "bodyTagsOpen": "",
        "headTags": "",
        "htmlAttrs": "",
      }
    `)
  })
  it('server', async () => {
    const head = createHead()

    useScript({
      src: 'https://cdn.example.com/script.js',
    }, {
      trigger: 'server',
    })

    const ctx = await renderSSRHead(head)
    expect(ctx).toMatchInlineSnapshot(`
      {
        "bodyAttrs": "",
        "bodyTags": "",
        "bodyTagsOpen": "",
        "headTags": "<script defer fetchpriority="low" src="https://cdn.example.com/script.js" onload="this.dataset.onloadfired = true" onerror="this.dataset.onerrorfired = true" data-hid="438d65b"></script>",
        "htmlAttrs": "",
      }
    `)
  })
})
