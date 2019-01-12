"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Renderer = _interopRequireDefault(require("./Renderer"));

var _reactCiteproc = require("react-citeproc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = ({
  production: {
    sections
  },
  sectionsIds: sectionsOrder,
  translate,
  title,
  citations,
  citationStyle,
  citationLocale,
  id
}) => _react.default.createElement("section", {
  className: 'end-notes',
  title: title,
  id: id
}, _react.default.createElement(_reactCiteproc.ReferencesManager, {
  style: citationStyle,
  locale: citationLocale,
  items: citations.citationItems,
  citations: citations.citationData,
  componentClass: 'references-manager'
}, _react.default.createElement("h1", {
  className: 'section-title'
}, title || translate('Notes')), _react.default.createElement("ol", {
  className: 'end-notes'
}, sectionsOrder.reduce((results, sectionId) => results.concat(Object.keys(sections[sectionId].notes).map(thatId => sections[sectionId].notes[thatId])), []).map((note, index) => {
  return _react.default.createElement("li", {
    id: `note-content-${note.id}`,
    key: index
  }, _react.default.createElement("a", {
    href: `#note-pointer-${note.id}`,
    className: 'note-number'
  }, index + 1), _react.default.createElement(_Renderer.default, {
    raw: note.contents
  }));
}))));

exports.default = _default;