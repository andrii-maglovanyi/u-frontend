import buildAngularManifest from "./build-angular-manifest";

export interface Options {
  source: string;
}

export default (type: string, options: Options) => {
  try {
    switch (type) {
      case "angular":
        return buildAngularManifest(options);
    }
  } catch (err) {
    console.log(err);
  }
};
