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
    textColor,
    useAbstract = true,
    customMarkdownContents,
    animatedBackground,
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
      className: 'composition-block back-cover has-custom-html',
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
    className: `composition-block back-cover ${animatedBackground && animatedBackground !== 'none' ? `with-animated-background-${animatedBackground}` : ''}`,
    style: {
      backgroundColor,
      color: textColor
    }
  }, _react.default.createElement("div", {
    className: 'back-cover-content'
  }, _react.default.createElement("h2", {
    id: id,
    className: 'back-cover-title'
  }, finalTitle), finalSubtitle && _react.default.createElement("h3", {
    className: 'back-cover-subtitle'
  }, finalSubtitle), metadata.authors && _react.default.createElement("h3", {
    className: 'back-cover-authors'
  }, _react.default.createElement(_Authors.default, {
    authors: authors
  })), _react.default.createElement("div", {
    className: 'back-cover-text'
  }, useAbstract && _react.default.createElement(_MarkdownPlayer.default, {
    src: metadata.abstract
  }), customMarkdownContents && customMarkdownContents.trim().length ? _react.default.createElement(_MarkdownPlayer.default, {
    src: customMarkdownContents
  }) : null), customCoverFooter && customCoverFooter.length > 0 && _react.default.createElement("div", {
    className: 'back-cover-footer'
  }, _react.default.createElement(_MarkdownPlayer.default, {
    src: customCoverFooter
  }))));
};

exports.default = _default;