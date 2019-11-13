"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _peritextUtils = require("peritext-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const References = ({
  production,
  edition,
  translate,
  data = {
    showMentions: true,
    showUncitedReferences: false,
    resourceTypes: ['bib'],
    sortingKey: 'authors',
    sortingAscending: true
  },
  // citations,
  id,
  // LinkComponent: propLinkComponent,
  MentionComponent: propMentionComponent
}, {
  // LinkComponent: contextLinkComponent,
  MentionComponent: contextMentionComponent,
  preprocessedData
}) => {
  const {
    showMentions,
    showUncitedReferences,
    resourceTypes,
    sortingKey,
    sortingAscending,
    customTitle
  } = data; // const LinkComponent = propLinkComponent || contextLinkComponent;

  const MentionComponent = propMentionComponent || contextMentionComponent;
  const preprocessedBiblio = preprocessedData && preprocessedData.blocks && preprocessedData.blocks[id] && preprocessedData.blocks[id].bibliographyData;
  let references;

  if (preprocessedBiblio) {
    references = preprocessedBiblio;
  } else {
    references = (0, _peritextUtils.buildBibliography)({
      production,
      edition,
      // contextualizations,
      options: {
        showUncitedReferences,
        resourceTypes,
        sortingKey,
        sortingAscending
      }
    });
  }

  return _react.default.createElement("section", {
    className: 'composition-block references',
    title: customTitle || translate('References')
  }, _react.default.createElement("h2", {
    id: `reference-block-${id}`,
    className: 'composition-block-title peritext-block-title'
  }, customTitle || translate('References')), _react.default.createElement("ul", {
    className: 'mentions-container'
  }, references.map((entry, index) => {
    // const entryName = entry.title;
    return _react.default.createElement("li", {
      key: index,
      id: entry.citationKey,
      className: 'mention-item'
    }, _react.default.createElement("div", {
      className: 'title'
    }, _react.default.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: entry.html
        /* eslint react/no-danger: 0 */

      }
    })), showMentions && entry.resource.mentions && entry.resource.mentions.find(mention => mention && mention.contextContent) && _react.default.createElement("div", {
      className: 'mentions-list'
    }, entry.resource.mentions.filter(mention => mention !== undefined && mention.contextContent).map((mention, count) => {
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
      if (thatIndex === 0) {
        return [curr];
      }

      return [prev, ', ', curr];
    }, [])));
  })));
};

References.contextTypes = {
  LinkComponent: _propTypes.default.func,
  MentionComponent: _propTypes.default.func,
  preprocessedData: _propTypes.default.object
};
var _default = References;
exports.default = _default;