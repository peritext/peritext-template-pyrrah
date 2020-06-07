"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Renderer = _interopRequireDefault(require("./Renderer"));

var _CitationsProvider = _interopRequireDefault(require("./CitationsProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = ({
  production: {
    resources
  },
  sectionsIds = [],
  translate,
  title,
  citations,
  id
}) => {
  const notes = sectionsIds.reduce((results, resourceId) => {
    const theseNotes = resources[resourceId] && resources[resourceId].data && resources[resourceId].data.contents && resources[resourceId].data.contents.notes || {};
    return results.concat(Object.keys(theseNotes).map(thatId => _objectSpread({}, theseNotes[thatId], {
      id: thatId
    })));
  }, []);
  return _react.default.createElement("section", {
    className: 'end-notes',
    title: title,
    id: id
  }, _react.default.createElement(_CitationsProvider.default, {
    citations: citations
  }, notes.length > 0 ? _react.default.createElement("h1", {
    className: 'section-title'
  }, title || translate('Notes')) : null, _react.default.createElement("ol", {
    className: 'end-notes'
  }, notes.map((note, index) => {
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
};

exports.default = _default;