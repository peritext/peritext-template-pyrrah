"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _MarkdownPlayer = _interopRequireDefault(require("./MarkdownPlayer"));

var _Authors = _interopRequireDefault(require("./Authors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = ({
  production: {
    metadata
  },
  edition,
  data: {
    customCoverFooter
  } = {},
  id
}) => {
  const {
    data: editionData = {}
  } = edition;
  const finalTitle = editionData.publicationTitle || metadata.title;
  const finalSubtitle = editionData.publicationSubtitle || metadata.subtitle;
  return _react.default.createElement("section", {
    className: 'composition-block title-page'
  }, _react.default.createElement("div", {
    className: 'title-page-content'
  }, _react.default.createElement("h1", {
    id: id,
    className: 'title-page-title'
  }, finalTitle), finalSubtitle && _react.default.createElement("h2", {
    className: 'title-page-subtitle'
  }, finalSubtitle), _react.default.createElement("h3", {
    className: 'title-page-authors'
  }, metadata.authors && _react.default.createElement(_Authors.default, {
    authors: metadata.authors
  }))), customCoverFooter && customCoverFooter.length > 0 && _react.default.createElement("div", {
    className: 'title-page-footer'
  }, _react.default.createElement(_MarkdownPlayer.default, {
    src: customCoverFooter
  })));
};

exports.default = _default;