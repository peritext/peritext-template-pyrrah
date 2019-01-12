"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This module exports a stateless reusable note pointer component
 * ============
 * @module quinoa-production-player/components/NotePointer
 */

/**
 * Renders a note pointer as a pure component
 * @param {object} props
 * @param {array} props.children - children elements of the component
 * @param {array} props.noteId - the id of the note to point to
 * @param {object} context - the context data of the component
 * @return {ReactElement} component - the component
 */
const NotePointer = ({
  children,
  noteId = ''
}, context) => {
  const notes = context.notes;
  const NoteLinkComponent = context.NoteLinkComponent;

  if (notes) {
    const note = notes[noteId];

    if (note) {
      return _react.default.createElement("sup", {
        className: 'note-pointer',
        id: `note-pointer-${noteId}`
      }, NoteLinkComponent ? _react.default.createElement(NoteLinkComponent, {
        href: `#note-content-${noteId}`
      }, note.order, children) : _react.default.createElement("a", {
        href: `#note-content-${noteId}`
      }, note.order, children));
    }

    return null;
  }

  return null;
};
/**
 * Component's properties types
 */


NotePointer.propTypes = {
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

NotePointer.contextTypes = {
  /**
   * Map of available notes to look into
   */
  notes: _propTypes.default.object,

  /**
   * Triggers a callback upstream when the pointer is clicked
   */
  onNoteContentPointerClick: _propTypes.default.func,
  NoteLinkComponent: _propTypes.default.func
};
var _default = NotePointer;
exports.default = _default;