"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _FootnoteRenderer = _interopRequireDefault(require("./FootnoteRenderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This module exports a stateless reusable note pointer component
 * ============
 * @module quinoa-production-player/components/NotePointer
 */

/**
 * Renders a not pointer as a pure component
 * @param {object} props
 * @param {array} props.children - children elements of the component
 * @param {array} props.noteId - the id of the note to point to
 * @param {object} context - the context data of the component
 * @return {ReactElement} component - the component
 */
const Footnote = ({
  // children,
  noteId = '',
  notesPosition
}, context) => {
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
};
/**
 * Component's properties types
 */


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