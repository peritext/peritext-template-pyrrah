"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Section = _interopRequireDefault(require("./Section"));

var _EndNotes = _interopRequireDefault(require("./EndNotes"));

var _Figures = _interopRequireDefault(require("./Figures"));

var _helpers = require("../helpers");

var _peritextUtils = require("peritext-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ResourceSections = ({
  production,
  translate,
  data = {
    showMentions: true,
    resourceTypes: ['glossary'],
    notesPosition: 'footnotes',
    figuresPosition: 'inBody',
    customSummary: {
      active: false,
      summary: []
    },
    level: 0
  },
  citationStyle,
  citationLocale,
  id,
  publicationTitle,
  publicationSubtitle
}, {}) => {
  const {
    /*
     * showMentions,
     * resourceTypes,
     */
    notesPosition,
    figuresPosition,
    displayHeader = false
  } = data;
  const summary = (0, _peritextUtils.buildResourceSectionsSummary)({
    production,
    options: data
  });
  const citations = (0, _peritextUtils.buildCitations)({
    production
    /*edition*/

  });
  const sectionsIds = summary.map(({
    resourceId
  }) => resourceId);
  const {
    figuresNumberMap,
    figures
  } = (0, _helpers.buildFiguresNumberMap)({
    production,
    sectionsIds,
    figuresPosition
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
      figuresPosition: figuresPosition,
      figuresNumberMap: figuresNumberMap,
      figures: figuresPosition === 'endOfSections' ? figures[resourceId] : undefined,
      level: level,
      containerId: id,
      translate: translate,
      citations: citations,
      citationStyle: citationStyle,
      citationLocale: citationLocale,
      publicationTitle: publicationTitle,
      publicationSubtitle: publicationSubtitle,
      displayHeader: displayHeader
    });
  }), notesPosition === 'endOfContents' ? _react.default.createElement(_EndNotes.default, {
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
  }) : null, figuresPosition === 'endOfContents' ? _react.default.createElement(_Figures.default, {
    production: production,
    translate: translate,
    figures: figures,
    figuresNumberMap: figuresNumberMap
  }) : null];
};

ResourceSections.contextTypes = {
  LinkComponent: _propTypes.default.func,
  MentionComponent: _propTypes.default.func
};
var _default = ResourceSections;
exports.default = _default;