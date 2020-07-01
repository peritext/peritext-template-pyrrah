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
    customCoverFooter,
    customHTML
  } = {},
  id
}) => {
  const {
    data: editionData = {}
  } = edition;

  if (customHTML && customHTML.length) {
    return _react.default.createElement("section", {
      className: 'composition-block title-page  has-custom-html',
      dangerouslySetInnerHTML: {
        /* eslint react/no-danger : 0 */
        __html: customHTML
      }
    });
  }

  const finalTitle = editionData.publicationTitle || metadata.title;
  const finalSubtitle = editionData.publicationSubtitle || metadata.subtitle;
  const authors = editionData.publicationAuthors && editionData.publicationAuthors.length ? editionData.publicationAuthors : metadata.authors;
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
  }, authors && authors.length > 0 ? _react.default.createElement(_Authors.default, {
    authors: authors
  }) : null)), customCoverFooter && customCoverFooter.length > 0 && _react.default.createElement("div", {
    className: 'title-page-footer'
  }, _react.default.createElement(_MarkdownPlayer.default, {
    src: customCoverFooter
  })));
};

exports.default = _default;