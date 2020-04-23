import { listFilesByFilter, writeFile } from "./lib/manage-files";

import { Options } from "./index";

interface Manifest {
  scripts?: string[];
}

export default ({ source }: Options) => {
  const manifest: Manifest = {};
  const assets = listFilesByFilter(source);
  manifest.scripts = assets;

  writeFile(`${source}/u-manifest.json`, manifest);
};
