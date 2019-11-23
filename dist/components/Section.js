"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Renderer = _interopRequireDefault(require("./Renderer"));

var _EndNotes = _interopRequireDefault(require("./EndNotes"));

var _Authors = _interopRequireDefault(require("./Authors"));

var _CitationsProvider = _interopRequireDefault(require("./CitationsProvider"));

var _peritextUtils = require("peritext-utils");

var _ResourcePreview = _interopRequireDefault(require("./ResourcePreview"));

var _Figures = _interopRequireDefault(require("./Figures"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Section extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "getChildContext", () => ({
      notes: this.props.section.data.contents.notes,
      figuresPosition: this.props.figuresPosition,
      figuresNumberMap: this.props.figuresNumberMap
    }));

    _defineProperty(this, "render", () => {
      const {
        citations,
        className = '',
        section: {
          id,
          metadata: {
            // title,
            subtitle,
            authors = []
          },
          data: {
            contents: {
              contents
            }
          }
        },
        figuresNumberMap,
        containerId,
        notesPosition,
        figuresPosition = 'endOfSections',
        figures,
        production,
        translate,
        publicationTitle,
        publicationSubtitle,
        displayHeader,
        level = 0
      } = this.props;
      const title = (0, _peritextUtils.getResourceTitle)(this.props.section);
      return _react.default.createElement("section", {
        className: `section has-notes-position-${notesPosition} has-figures-position-${figuresPosition} level-${level} ${className}`,
        title: title,
        id: `section-${containerId}-${id}`
      }, _react.default.createElement(_CitationsProvider.default, {
        citations: citations
      }, _react.default.createElement("h2", {
        className: 'composition-block-title section-title'
      }, title), _react.default.createElement("em", {
        className: 'section-title-running'
      }, title), _react.default.createElement("em", {
        className: 'publication-title-running'
      }, publicationTitle), displayHeader && _react.default.createElement(_ResourcePreview.default, {
        resource: this.props.section
      }), subtitle && _react.default.createElement("h2", {
        className: 'section-subtitle'
      }, subtitle), authors.length > 0 && _react.default.createElement("h3", {
        className: 'section-authors'
      }, _react.default.createElement(_Authors.default, {
        authors: authors
      })), _react.default.createElement("div", {
        className: 'section-contents-container'
      }, _react.default.createElement(_Renderer.default, {
        raw: contents,
        notesPosition: notesPosition,
        containerId: containerId
      })), notesPosition === 'endOfSections' && _react.default.createElement(_EndNotes.default, {
        sectionsIds: [id],
        production: production,
        translate: translate,
        citations: citations,
        publicationTitle: publicationTitle,
        publicationSubtitle: publicationSubtitle
      }), figuresPosition === 'endOfSections' && _react.default.createElement(_Figures.default, {
        figures: figures,
        production: production,
        figuresNumberMap: figuresNumberMap
      })));
    });
  }

}

var _default = Section;
exports.default = _default;
Section.childContextTypes = {
  notes: _propTypes.default.object,
  figuresPosition: _propTypes.default.object,
  figuresNumberMap: _propTypes.default.object
};