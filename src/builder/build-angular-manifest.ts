import { listFilesByFilter, writeFile, Asset } from "./lib/manage-files";

import { Options } from "./index";

interface Manifest {
  scripts?: Asset[];
}

export default ({ source }: Options) => {
  const manifest: Manifest = {};
  const assets = listFilesByFilter(source);
  manifest.scripts = assets;

  writeFile(`${source}/u-manifest.json`, manifest);
};
