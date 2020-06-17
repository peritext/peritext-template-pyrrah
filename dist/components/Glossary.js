"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _MarkdownPlayer = _interopRequireDefault(require("./MarkdownPlayer"));

var _peritextUtils = require("peritext-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Glossary = ({
  production,
  edition,
  translate,
  // citations,
  id,
  data = {
    showMentions: true,
    showDescriptions: true
  },
  // LinkComponent: propLinkComponent,
  MentionComponent: propMentionComponent
}, {
  // LinkComponent: contextLinkComponent,
  MentionComponent: contextMentionComponent,
  preprocessedData
}) => {
  // const LinkComponent = propLinkComponent || contextLinkComponent;
  const MentionComponent = propMentionComponent || contextMentionComponent;
  const {
    showMentions,
    customTitle,
    showDescriptions
  } = data;
  const glossary = preprocessedData && preprocessedData.blocks && preprocessedData.blocks[id] && preprocessedData.blocks[id].glossaryData || (0, _peritextUtils.buildGlossary)({
    options: data,
    production,
    edition
  });
  return _react.default.createElement("section", {
    className: 'composition-block glossary',
    title: customTitle || translate('Glossary list')
  }, _react.default.createElement("h2", {
    className: 'composition-block-title peritext-block-title',
    id: `glossary-block-${id}`
  }, customTitle || translate('Glossary list')), _react.default.createElement("ul", {
    className: 'mentions-container'
  }, glossary.sort((a, b) => {
    if (a.resource.data.name.toLowerCase() > b.resource.data.name.toLowerCase()) {
      return 1;
    }

    return -1;
  }).map((entry, index) => {
    // const entryName = entry.title;
    return _react.default.createElement("li", {
      key: index,
      id: entry.resource.metadata.id,
      className: 'mention-item'
    }, _react.default.createElement("div", {
      className: 'title'
    }, entry.resource.data.name), showDescriptions && _react.default.createElement("div", {
      className: 'description'
    }, _react.default.createElement(_MarkdownPlayer.default, {
      src: entry.resource.data.description
    })), showMentions && entry.mentions.length > 0 && _react.default.createElement("div", {
      className: 'mentions-list'
    }, entry.mentions.filter(mention => mention !== undefined && mention.contextContent).map((mention, count) => {
      const {
        contextContent: {
          /*
           * targetContents,
           * contents,
           * sectionTitle,
           */
          sectionId
        },
        id: thatId,
        containerId
      } = mention;
      return _react.default.createElement(MentionComponent, {
        key: count,
        href: `#contextualization-${containerId}-${thatId}`,
        sectionId: sectionId
      });
    }).reduce((prev, curr, thatIndex) => {
      return thatIndex > 0 ? [prev, ', ', curr] : [curr];
    }, [])));
  })));
};

Glossary.contextTypes = {
  LinkComponent: _propTypes.default.func,
  MentionComponent: _propTypes.default.func,
  preprocessedData: _propTypes.default.object
};
var _default = Glossary;
exports.default = _default;