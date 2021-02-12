# svelte-adapter-cloudflare-workers
Adapter for Svelte apps that builds a Cloudflare Workers application.

## Quickstart
 - Install Wrangler `npm i @cloudflare/wrangler -g`
 - Install adapter `npm i -D svelte-adapter-cloudflare-workers`
 - Modify `svelte.config.js`
    ```
     kit: {
       adapter: [
         'svelte-adapter-cloudflare-workers',
         {
           wrangler: {
             name: '',
             account_id: '',
           },
         },
       ],
       target: '#svelte',
     },
   ``` 
 - `npm run build && npm run adapt`
 - `cd build && wrangler publish`