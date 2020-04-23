import { readdirSync, writeFileSync } from "fs";
import { resolve } from "path";

export type Asset = {
  src: string;
};

export const listFilesByFilter = (dirname: string) => {
  const assets: Asset[] = [];
  const filenames = readdirSync(dirname, "utf8");

  filenames.forEach(function (filename) {
    if (filename.split(".").pop() === "js") {
      assets.push({ src: filename });
    }
  });
  return assets;
};

export const writeFile = (filepath: string, contents: object) => {
  const absolutePath = resolve(process.cwd(), filepath);
  writeFileSync(absolutePath, JSON.stringify(contents), "utf8");
};
