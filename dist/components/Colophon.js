"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _MarkdownPlayer = _interopRequireDefault(require("./MarkdownPlayer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = ({
  data: {
    customText,
    copyright,
    issn,
    isbn
  } = {},
  id
}) => {
  return _react.default.createElement("section", {
    id: id,
    className: 'composition-block colophon'
  }, _react.default.createElement("div", {
    className: 'colophon-content'
  }, customText && customText.length > 0 && _react.default.createElement("div", {
    className: 'colophon-custom-text'
  }, _react.default.createElement(_MarkdownPlayer.default, {
    src: customText
  })), copyright && copyright.length > 0 && _react.default.createElement("div", {
    className: 'colophon-copyright'
  }, _react.default.createElement(_MarkdownPlayer.default, {
    src: copyright
  })), isbn && isbn.length > 0 && _react.default.createElement("div", {
    className: 'colophon-isbn'
  }, "ISBN ", isbn), issn && issn.length > 0 && _react.default.createElement("div", {
    className: 'colophon-issn'
  }, "ISSN ", issn)));
};

exports.default = _default;