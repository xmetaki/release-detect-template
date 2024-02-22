var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/constant.ts
var constant_exports = {};
__export(constant_exports, {
  DEFAULT_HOST: () => DEFAULT_HOST,
  DEFAULT_PORT: () => DEFAULT_PORT
});
module.exports = __toCommonJS(constant_exports);
var DEFAULT_PORT = 88;
var DEFAULT_HOST = "127.0.0.1";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DEFAULT_HOST,
  DEFAULT_PORT
});
