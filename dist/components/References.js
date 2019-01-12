"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = require("lodash");

var _reactCiteproc = require("react-citeproc");

var _peritextUtils = require("peritext-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Builds an interactive bibliography for a given edition
 * @returns {ReactMarkup}
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
    /*
     * contextualizations,
     * contextualizers,
     */
    resources
  } = production;
  /**
   * Select relevant resources
   */
  // filter cited references only

  let citedResourcesIds = showUncitedReferences ? Object.keys(resources) : (0, _lodash.uniq)(contextualizations.map(element => {
    const contextualization = element.contextualization;
    return contextualization.resourceId;
  })); // filter by type of resource

  citedResourcesIds = citedResourcesIds.filter(resourceId => {
    const type = resources[resourceId].metadata.type;
    return resourceTypes.includes(type);
  });
  let items = citedResourcesIds.map(resourceId => {
    const cit = (0, _peritextUtils.resourceToCslJSON)(resources[resourceId]);
    const citationKey = cit && cit[0] && cit[0].id;
    const mentions = contextualizations.map(element => {
      if (element.contextualization.resourceId === resourceId) {
        return _objectSpread({}, element, {
          id: element.contextualization.id
        });
      }
    }).filter(s => s);
    let biblio;

    if (citations.citationItems[citationKey]) {
      biblio = (0, _reactCiteproc.makeBibliography)(citations.citationItems, edition.data.citationStyle.data, edition.data.citationLocale.data, {
        select: [{
          field: 'id',
          value: citationKey
        }]
      });
    } else {
      biblio = (0, _reactCiteproc.makeBibliography)({
        [resourceId]: _objectSpread({}, cit[0], {
          id: resourceId
        })
      }, edition.data.citationStyle.data, edition.data.citationLocale.data, {
        select: [{
          field: 'id',
          value: resourceId
        }]
      });
    }

    const title = biblio && biblio[1] && biblio[1][0];
    return {
      citationKey,
      title,
      item: citations.citationItems[citationKey] || cit[0],
      mentions: mentions.map(mention => _objectSpread({}, mention, {
        contextContent: (0, _peritextUtils.buildContextContent)(production, mention.id)
      }))
    };
  });
  items = items.sort((a, b) => {
    switch (sortingKey) {
      case 'date':
        const datePartsA = a.item.issued && a.item.issued['date-parts'];
        const datePartsB = b.item.issued && b.item.issued['date-parts'];

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
        if (a.item.author && b.item.author) {
          const authorsA = a.item.author && a.item.author.map(author => `${author.family}-${author.given}`.toLowerCase()).join('');
          const authorsB = b.item.author && b.item.author.map(author => `${author.family}-${author.given}`.toLowerCase()).join('');

          if (authorsA > authorsB) {
            return 1;
          } else return -1;
        } else if (!b.item.author) {
          return -1;
        } else if (!a.item.author) {
          return 1;
        } else return 0;

      case 'title':
        if (a.item.title.toLowerCase() > b.item.title.toLowerCase()) {
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
  citations,
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
  /**
   * @todo compute citations based on edition
   */

  const contextualizations = (0, _peritextUtils.getContextualizationsFromEdition)(production, edition);
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
    const entryName = entry.title;
    return _react.default.createElement("li", {
      key: index,
      id: entry.citationKey,
      className: 'mention-item'
    }, _react.default.createElement("div", {
      className: 'title'
    }, _react.default.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: entryName
        /* eslint react/no-danger: 0 */

      }
    })), showMentions && entry.mentions.find(mention => mention && mention.contextContent) && _react.default.createElement("div", {
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