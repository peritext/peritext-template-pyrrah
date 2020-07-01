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
    customCoverFooter,
    animatedBackground,
    customHTML
  } = {},
  id
}) => {
  if (customHTML && customHTML.length) {
    return _react.default.createElement("section", {
      className: 'composition-block front-cover  has-custom-html',
      dangerouslySetInnerHTML: {
        /* eslint react/no-danger : 0 */
        __html: customHTML
      }
    });
  } // if ( svgData ) {
  //   return (
  //     <section
  //       id={ 'front-cover' }
  //       className={ 'composition-block front-cover' }
  //       dangerouslySetInnerHTML={ {/* eslint react/no-danger : 0 */
  //         __html: svgData
  //       } }
  //     />
  //   );
  // }


  const {
    data: editionData = {}
  } = edition;
  const finalTitle = editionData.publicationTitle || metadata.title;
  const finalSubtitle = editionData.publicationSubtitle || metadata.subtitle;
  const authors = editionData.publicationAuthors && editionData.publicationAuthors.length ? editionData.publicationAuthors : metadata.authors;
  return _react.default.createElement("section", {
    id: 'front-cover',
    className: `composition-block front-cover ${animatedBackground && animatedBackground !== 'none' ? `with-animated-background-${animatedBackground}` : ''}`,
    style: {
      backgroundColor,
      color: textColor
    }
  }, _react.default.createElement("div", {
    className: 'front-cover-content'
  }, _react.default.createElement("h1", {
    id: id,
    className: 'front-cover-title',
    style: {
      color: textColor
    }
  }, finalTitle), finalSubtitle && _react.default.createElement("h2", {
    className: 'front-cover-subtitle',
    style: {
      color: textColor
    }
  }, finalSubtitle), _react.default.createElement("h3", {
    className: 'front-cover-authors',
    style: {
      color: textColor
    }
  }, metadata.authors && _react.default.createElement(_Authors.default, {
    authors: authors
  }))), customCoverFooter && customCoverFooter.length > 0 && _react.default.createElement("div", {
    className: 'front-cover-footer',
    style: {
      color: textColor
    }
  }, _react.default.createElement(_MarkdownPlayer.default, {
    src: customCoverFooter
  })));
};

exports.default = _default;