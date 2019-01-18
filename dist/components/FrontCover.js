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
    backgroundColor,
    customCoverFooter,
    animatedBackground
  } = {},
  id
}) => {
  const {
    data: editionData = {}
  } = edition;
  const finalTitle = editionData.publicationTitle || metadata.title;
  const finalSubtitle = editionData.publicationSubtitle || metadata.subtitle;
  return _react.default.createElement("section", {
    id: 'front-cover',
    className: `composition-block front-cover ${animatedBackground && animatedBackground !== 'none' ? `with-animated-background-${animatedBackground}` : ''}`,
    style: {
      backgroundColor
    }
  }, _react.default.createElement("div", {
    className: 'front-cover-content'
  }, _react.default.createElement("h1", {
    id: id,
    className: 'front-cover-title'
  }, finalTitle), finalSubtitle && _react.default.createElement("h2", {
    className: 'front-cover-subtitle'
  }, finalSubtitle), _react.default.createElement("h3", {
    className: 'front-cover-authors'
  }, metadata.authors && _react.default.createElement(_Authors.default, {
    authors: metadata.authors
  }))), customCoverFooter && customCoverFooter.length > 0 && _react.default.createElement("div", {
    className: 'front-cover-footer'
  }, _react.default.createElement(_MarkdownPlayer.default, {
    src: customCoverFooter
  })));
};

exports.default = _default;