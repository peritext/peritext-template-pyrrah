"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uniq = _interopRequireDefault(require("lodash/uniq"));

var _reactCiteproc = require("react-citeproc");

var _peritextUtils = require("peritext-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Computes interactive bibliography materials
 * @return {array} items - list of context-loaded items
 */
function buildBibliography({
  production,
  edition,
  citations,
  contextualizations,
  showUncitedReferences,
  resourceTypes,
  sortingKey,
  sortingAscending
}) {
  const {
    resources
  } = production;
  /**
   * Select relevant resources
   */
  // filter cited references only

  let citedResourcesIds = showUncitedReferences ? Object.keys(resources) : (0, _uniq.default)(contextualizations.map(element => {
    const contextualization = element.contextualization;
    return contextualization.sourceId;
  })); // filter by type of resource

  citedResourcesIds = citedResourcesIds.filter(resourceId => {
    const type = resources[resourceId].metadata.type;
    return resourceTypes.includes(type);
  });
  const resourcesMap = citedResourcesIds.reduce((res, resourceId) => {
    const mentions = contextualizations.filter(c => c.contextualization.sourceId === resourceId).map(c => _objectSpread({}, c, {
      id: c.contextualization.id,
      contextContent: (0, _peritextUtils.buildContextContent)(production, c.contextualization.id)
    }));
    const citation = (0, _peritextUtils.resourceToCslJSON)(resources[resourceId])[0];

    if (resources[resourceId].metadata.type === 'bib') {
      return _objectSpread({}, res, {
        [resources[resourceId].data[0].id]: _objectSpread({}, resources[resourceId], {
          citation,
          mentions
        })
      });
    }

    return _objectSpread({}, res, {
      [resourceId]: _objectSpread({}, resources[resourceId], {
        mentions,
        citation
      })
    });
  }, {});
  const bibliographyData = (0, _reactCiteproc.makeBibliography)(citations.citationItems, edition.data.citationStyle.data, edition.data.citationLocale.data);
  const ids = bibliographyData[0].entry_ids.map(group => group[0]);
  let items = ids // .filter( ( id ) => resourcesMap[id] )
  .map((id, index) => ({
    id,
    resource: resourcesMap[id],
    citation: resourcesMap[id] && resourcesMap[id].citation,
    html: bibliographyData[1][index]
  })).filter(i => i.citation);
  items = items.sort((a, b) => {
    switch (sortingKey) {
      case 'mentions':
        if (a.resource.mentions.length > b.resource.mentions.length) {
          return -1;
        }

        return 1;

      case 'date':
        const datePartsA = a.citation.issued && a.citation.issued['date-parts'];
        const datePartsB = b.citation.issued && b.citation.issued['date-parts'];

        if (datePartsA && datePartsB && datePartsA.length && datePartsB.length) {
          if (datePartsA[0] > datePartsB[0]) {
            return 1;
          } else if (datePartsA[0] < datePartsB[0]) {
            return -1;
          } else if (datePartsA.length > 1 && datePartsB.length > 1) {
            if (datePartsA[1] > datePartsB[1]) {
              return 1;
            } else if (datePartsA[1] < datePartsB[1]) {
              return -1;
            } else return 0;
          } else {
            return 0;
          }
        } else if (!datePartsB || datePartsB && !datePartsB.length) {
          return -1;
        } else if (!datePartsA || datePartsA && !datePartsA.length) {
          return 1;
        } else {
          return 0;
        }

      case 'authors':
        if (a.citation.author && b.citation.author) {
          const authorsA = a.citation.author && a.citation.author.map(author => `${author.family}-${author.given}`.toLowerCase()).join('');
          const authorsB = b.citation.author && b.citation.author.map(author => `${author.family}-${author.given}`.toLowerCase()).join('');

          if (authorsA > authorsB) {
            return 1;
          } else return -1;
        } else if (!b.citation.author) {
          return -1;
        } else if (!a.citation.author) {
          return 1;
        } else return 0;

      case 'title':
        if (a.citation.title.toLowerCase() > b.citation.title.toLowerCase()) {
          return 1;
        }

        return -1;

      default:
        break;
    }
  });

  if (!sortingAscending) {
    items = items.reverse();
  }

  return items;
}

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
  citationStyle,
  citationLocale,
  id,
  // LinkComponent: propLinkComponent,
  MentionComponent: propMentionComponent
}, {
  // LinkComponent: contextLinkComponent,
  MentionComponent: contextMentionComponent
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
  const contextualizations = (0, _peritextUtils.getContextualizationsFromEdition)(production, edition);
  const citations = (0, _peritextUtils.buildCitations)({
    production,
    edition
  });
  const references = buildBibliography({
    production,
    edition,
    citations,
    contextualizations,
    showUncitedReferences,
    resourceTypes,
    sortingKey,
    sortingAscending
  });
  return _react.default.createElement("section", {
    className: 'composition-block references',
    title: customTitle || translate('References')
  }, _react.default.createElement(_reactCiteproc.ReferencesManager, {
    style: citationStyle,
    locale: citationLocale,
    items: citations.citationItems,
    citations: citations.citationData,
    componentClass: 'references-manager'
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
    })), showMentions && entry.mentions && entry.mentions.find(mention => mention && mention.contextContent) && _react.default.createElement("div", {
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
      if (thatIndex === 0) {
        return [curr];
      }

      return [prev, ', ', curr];
    }, [])));
  }))));
};

References.contextTypes = {
  LinkComponent: _propTypes.default.func,
  MentionComponent: _propTypes.default.func
};
var _default = References;
exports.default = _default;