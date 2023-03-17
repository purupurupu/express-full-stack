import {
  generateRoutes,
  ExtendedRoutesConfig,
  generateSpec,
  ExtendedSpecConfig,
} from "tsoa";

(async () => {
  const specOptions: ExtendedSpecConfig = {
    basePath: "v1",
    entryFile: "src/index.ts",
    specVersion: 3,
    outputDirectory: "src/build",
    controllerPathGlobs: ["src/controllers/**/*.ts"],
    noImplicitAdditionalProperties: "throw-on-extras",
  };

  const routeOptions: ExtendedRoutesConfig = {
    entryFile: "src/index.ts",
    noImplicitAdditionalProperties: "throw-on-extras",
    routesDir: "src/middlewares/tsoa",
    basePath: "v1",
    controllerPathGlobs: ["src/controllers/**/*.ts"],
    iocModule: "src/middlewares/inversify/ioc.ts",
  };

  await Promise.all([generateSpec(specOptions)]);

  await Promise.all([generateRoutes(routeOptions)]);
})();
