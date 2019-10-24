"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactCiteproc = require("react-citeproc");

var _lodash = require("lodash");

var _MarkdownPlayer = _interopRequireDefault(require("./MarkdownPlayer"));

var _peritextUtils = require("peritext-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildGlossary = ({
  production,
  edition,
  options
}) => {
  const {
    resources
  } = production;
  const {
    showUncited = false,
    glossaryTypes = ['person', 'place', 'event', 'notion', 'other']
  } = options; // let items;

  const usedContextualizations = (0, _peritextUtils.getContextualizationsFromEdition)(production, edition);
  const citedResourcesIds = (showUncited ? Object.keys(resources).filter(resourceId => resources[resourceId].metadata.type === 'glossary') : (0, _lodash.uniq)(usedContextualizations.filter(c => resources[c.contextualization.sourceId].metadata.type === 'glossary').map(c => c.contextualization.sourceId))).filter(resourceId => {
    return glossaryTypes.includes(resources[resourceId].data.entryType);
  }).sort((a, b) => {
    if (resources[a].data.name.toLowerCase() > resources[b].data.name.toLowerCase()) {
      return 1;
    } else {
      return -1;
    }
  });
  const items = citedResourcesIds.map(resourceId => {
    const mentions = usedContextualizations.filter(c => c.contextualization.sourceId === resourceId).map(c => c.contextualization.id).map(contextualizationId => (0, _peritextUtils.getContextualizationMentions)({
      contextualizationId,
      production,
      edition
    })).reduce((res2, contextualizationMentions) => [...res2, ...contextualizationMentions.map(({
      containerId,
      contextualizationId
    }) => ({
      id: contextualizationId,
      containerId,
      contextContent: (0, _peritextUtils.buildContextContent)(production, contextualizationId)
    }))], []);
    return {
      resourceId,
      resource: production.resources[resourceId],
      mentions
    };
  });
  return items;
  /*
   * if ( showUncited ) {
   *   items = Object.keys( production.resources )
   *       .filter( ( resourceId ) => production.resources[resourceId].metadata.type === 'glossary' )
   *       .map( ( resourceId ) => production.resources[resourceId] )
   *       .map( ( resource ) => {
   *         return {
   *           resource,
   *           mentions: usedContextualizations.filter( ( c ) => c.contextualization.sourceId === resource.id )
   *         };
   *       } );
   * } else {
   *   items = usedContextualizations
   *     .filter( ( element ) => {
   *       const contextualization = element.contextualization;
   *       const contextualizerId = contextualization.contextualizerId;
   *       const contextualizer = contextualizers[contextualizerId];
   *       return contextualizer && contextualizer.type === 'glossary';
   *     } )
   *     .map( ( element ) => {
   *       const contextualization = element.contextualization;
   *       return {
   *         ...contextualization,
   *         contextualizer: contextualizers[contextualization.contextualizerId],
   *         resource: resources[contextualization.sourceId],
   *         contextContent: buildContextContent( production, contextualization.id ),
   *         containerId: element.containerId,
   *       };
   *     } )
   *     .reduce( ( entries, contextualization ) => {
   *       return {
   *         ...entries,
   *         [contextualization.sourceId]: {
   *           resource: contextualization.resource,
   *           mentions: entries[contextualization.sourceId] ?
   *                       entries[contextualization.sourceId].mentions.concat( contextualization )
   *                       : [ contextualization ]
   *         }
   *       };
   *     }, {} );
   *     items = Object.keys( items ).map( ( resourceId ) => ( {
   *       resource: items[resourceId].resource,
   *       mentions: items[resourceId].mentions
   *     } ) );
   * }
   */

  /*
   * const glossaryMentions = items
   * .filter( ( item ) => {
   *   return glossaryTypes.includes( item.resource.data.entryType );
   * } )
   * .sort( ( a, b ) => {
   *   if ( a.resource.data.name.toLowerCase() > b.resource.data.name.toLowerCase() ) {
   *     return 1;
   *   }
   *   else {
   *     return -1;
   *   }
   * } );
   */
  // return glossaryMentions;
};

const Glossary = ({
  production,
  edition,
  translate,
  citations,
  citationStyle,
  citationLocale,
  id,
  data = {
    showMentions: true,
    showDescriptions: true
  },
  // LinkComponent: propLinkComponent,
  MentionComponent: propMentionComponent
}, {
  // LinkComponent: contextLinkComponent,
  MentionComponent: contextMentionComponent
}) => {
  // const LinkComponent = propLinkComponent || contextLinkComponent;
  const MentionComponent = propMentionComponent || contextMentionComponent;
  const {
    showMentions,
    customTitle,
    showDescriptions
  } = data;
  const glossary = buildGlossary({
    options: data,
    production,
    edition
  });
  return _react.default.createElement("section", {
    className: 'composition-block glossary',
    title: customTitle || translate('Glossary list')
  }, _react.default.createElement(_reactCiteproc.ReferencesManager, {
    style: citationStyle,
    locale: citationLocale,
    items: citations.citationItems,
    citations: citations.citationData,
    componentClass: 'references-manager'
  }, _react.default.createElement("h2", {
    className: 'composition-block-title peritext-block-title',
    id: `glossary-block-${id}`
  }, customTitle || translate('Glossary list')), _react.default.createElement("ul", {
    className: 'mentions-container'
  }, glossary.map((entry, index) => {
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
  }))));
};

Glossary.contextTypes = {
  LinkComponent: _propTypes.default.func,
  MentionComponent: _propTypes.default.func
};
var _default = Glossary;
exports.default = _default;