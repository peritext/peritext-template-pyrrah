"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _FootnoteRenderer = _interopRequireDefault(require("./FootnoteRenderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Renders a not pointer as a pure component
 * @param {object} props
 * @param {array} props.children - children elements of the component
 * @param {array} props.noteId - the id of the note to point to
 * @param {object} context - the context data of the component
 * @return {ReactElement} component - the component
 */
class Footnote extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "getChildContext", () => ({
      inNote: true
    }));

    _defineProperty(this, "render", () => {
      const {
        // children,
        noteId = '',
        notesPosition
      } = this.props;
      const {
        context
      } = this;
      const notes = context.notes;

      if (notes) {
        const note = notes[noteId];

        if (note) {
          return _react.default.createElement("sup", {
            className: notesPosition === 'sidenotes' ? 'sidenote' : 'footnote',
            id: `note-pointer-${noteId}`,
            "data-notenumber": note.order
          }, _react.default.createElement("span", {
            className: 'footnote-content'
          }, _react.default.createElement(_FootnoteRenderer.default, {
            raw: note.contents
          })));
        }

        return null;
      }

      return null;
    });
  }

}
/**
 * Component's properties types
 */


_defineProperty(Footnote, "childContextTypes", {
  inNote: _propTypes.default.bool
});

Footnote.propTypes = {
  /**
   * Children react components
   */
  children: _propTypes.default.array,

  /**
   * id of the note to render
   */
  noteId: _propTypes.default.string
};
/**
 * Component's context used properties
 */

Footnote.contextTypes = {
  /**
   * Map of available notes to look into
   */
  notes: _propTypes.default.object
};
var _default = Footnote;
exports.default = _default;