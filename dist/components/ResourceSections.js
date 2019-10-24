"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Section = _interopRequireDefault(require("./Section"));

var _EndNotes = _interopRequireDefault(require("./EndNotes"));

var _peritextUtils = require("peritext-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ResourceSections = ({
  production,
  // edition,
  translate,
  data = {
    showMentions: true,
    resourceTypes: ['glossary'],
    notesPosition: 'footnotes',
    customSummary: {
      active: false,
      summary: []
    },
    level: 0
  },
  // citations,
  citationStyle,
  citationLocale,
  id,
  publicationTitle,
  publicationSubtitle
  /*
   * LinkComponent: propLinkComponent,
   * MentionComponent: propMentionComponent,
   */

}, {
  /*
   * LinkComponent: contextLinkComponent,
   * MentionComponent: contextMentionComponent,
   */
}) => {
  const {
    // showMentions,
    resourceTypes,
    notesPosition,
    customSummary,
    level: inputLevel
  } = data;
  const blockLevel = !isNaN(inputLevel);
  /*
   * const LinkComponent = propLinkComponent || contextLinkComponent;
   * const MentionComponent = propMentionComponent || contextMentionComponent;
   */

  let summary;

  if (customSummary && customSummary.active) {
    summary = customSummary.summary;
  } else {
    summary = Object.keys(production.resources).filter(resourceId => {
      const resource = production.resources[resourceId];
      return resourceTypes.includes(resource.metadata.type) && (0, _peritextUtils.resourceHasContents)(resource);
    }).map(resourceId => ({
      resourceId,
      level: blockLevel
    })).sort(_peritextUtils.defaultSortResourceSections);
  }

  const citations = (0, _peritextUtils.buildCitations)({
    production
    /*edition*/

  });
  return [...summary.map(({
    resourceId,
    level
  }) => {
    const section = production.resources[resourceId];
    return _react.default.createElement(_Section.default, {
      section: section,
      className: 'resource-section',
      notesPosition: notesPosition,
      key: `${id}-${resourceId}`,
      production: production,
      level: level,
      containerId: id,
      translate: translate,
      citations: citations,
      citationStyle: citationStyle,
      citationLocale: citationLocale,
      publicationTitle: publicationTitle,
      publicationSubtitle: publicationSubtitle
    });
  }), // @todo endnotes relative to sections and not to production sectionsOrder
  notesPosition === 'endOfContents' ? _react.default.createElement(_EndNotes.default, {
    key: 'endnotes',
    sectionsIds: summary.map(({
      resourceId
    }) => resourceId),
    production: production,
    translate: translate,
    citations: citations,
    citationStyle: citationStyle,
    citationLocale: citationLocale,
    publicationTitle: publicationTitle,
    publicationSubtitle: publicationSubtitle
  }) : null];
};

ResourceSections.contextTypes = {
  LinkComponent: _propTypes.default.func,
  MentionComponent: _propTypes.default.func
};
var _default = ResourceSections;
exports.default = _default;