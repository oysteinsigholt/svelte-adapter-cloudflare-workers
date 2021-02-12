import { render } from './app';
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', (event) => {
  event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
  try {
    return await getAssetFromKV(event);
  } catch (e) {
    return await handleRender(event);
  }
}

async function handleRender(event) {
  const url = new URL(event.request.url);

  const { status, headers, body } = await render({
    host: null,
    method: event.request.method,
    headers: event.request.headers,
    path: url.pathname,
    query: url.searchParams,
    body: event.request.body,
  });

  return new Response(body, {
    status,
    headers: {
      'content-type': 'text/html;charset=UTF-8',
      ...headers,
    },
  });
}
