#!/usr/bin/env node

try {
  require("../dist/builder");
} catch (err) {
  require("@babel/register")({ extensions: [".js", ".ts", ".tsx"] });
  require("../src/bin");
}
