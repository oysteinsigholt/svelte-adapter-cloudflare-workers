import fs from 'fs-extra';
import tomlify from 'tomlify-j0.4';
import merge from 'deepmerge';
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const DEFAULT_OPTIONS = {
  out: 'build',
  wrangler: {
    type: 'webpack',
    account_id: '',
    workers_dev: true,
    route: '',
    zone_id: '',
    webpack_config: './webpack.config.cjs',
    site: {
      bucket: './assets',
      'entry-point': '.',
    },
  },
};

export default async function adapter(builder, options = DEFAULT_OPTIONS) {
  const dir = dirname(fileURLToPath(import.meta.url));
  const out = options.out || DEFAULT_OPTIONS.out;

  builder.log.minor('Writing client application...');
  const static_directory = join(out, 'assets');
  builder.copy_client_files(static_directory);
  builder.copy_static_files(static_directory);

  builder.log.minor('Building server');
  builder.copy_server_files(out);

  builder.log.minor('Writing worker project...');
  const worker_directory = join(dir, 'files');
  fs.copySync(worker_directory, out);

  builder.log.minor('Writing wrangler config file...');
  const wrangler_file = join(out, 'wrangler.toml');
  const wrangler_config = merge(DEFAULT_OPTIONS.wrangler, options.wrangler);
  writeFileSync(wrangler_file, tomlify.toToml(wrangler_config));

  builder.log.minor('Prerendering static pages...');
  await builder.prerender({
    dest: `${out}/prerendered`,
  });
}
