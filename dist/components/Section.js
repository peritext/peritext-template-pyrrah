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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Section extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "getChildContext", () => ({
      notes: this.props.section.data.contents.notes
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
        containerId,
        notesPosition,
        production,
        translate,
        publicationTitle,
        publicationSubtitle,
        displayHeader,
        level = 0
      } = this.props;
      const title = (0, _peritextUtils.getResourceTitle)(this.props.section);
      return _react.default.createElement("section", {
        className: `section has-notes-position-${notesPosition} level-${level} ${className}`,
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
      })), _react.default.createElement(_Renderer.default, {
        raw: contents,
        notesPosition: notesPosition,
        containerId: containerId
      }), notesPosition === 'endOfSections' && _react.default.createElement(_EndNotes.default, {
        sectionsIds: [id],
        production: production,
        translate: translate,
        citations: citations,
        publicationTitle: publicationTitle,
        publicationSubtitle: publicationSubtitle
      })));
    });
  }

}

var _default = Section;
exports.default = _default;
Section.childContextTypes = {
  notes: _propTypes.default.object
};