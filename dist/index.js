"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Wrapper = _interopRequireDefault(require("./components/Wrapper"));

var _References = _interopRequireDefault(require("./components/References"));

var _Glossary = _interopRequireDefault(require("./components/Glossary"));

var _EndNotes = _interopRequireDefault(require("./components/EndNotes"));

var _Renderer = _interopRequireDefault(require("./components/Renderer"));

var _defaultStyle = _interopRequireDefault(require("./defaultStyle"));

var _meta = _interopRequireDefault(require("./meta"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const components = {
  Edition: _Wrapper.default,
  EndNotes: _EndNotes.default,
  References: _References.default,
  Glossary: _Glossary.default,
  Renderer: _Renderer.default
};
var _default = {
  meta: _meta.default,
  components,
  css: _defaultStyle.default
};
exports.default = _default;