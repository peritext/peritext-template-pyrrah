/**
 * This module exports a stateless reusable note pointer component
 * ============
 * @module quinoa-production-player/components/NotePointer
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Renderer from './FootnoteRenderer';

/**
 * Renders a not pointer as a pure component
 * @param {object} props
 * @param {array} props.children - children elements of the component
 * @param {array} props.noteId - the id of the note to point to
 * @param {object} context - the context data of the component
 * @return {ReactElement} component - the component
 */
class Footnote extends Component {
  static childContextTypes = {
    inNote: PropTypes.bool
  }
  getChildContext = () => ( {
    inNote: true
  } )

  render = () => {
    const {
      // children,
      noteId = '',
      notesPosition
    } = this.props;
    const {
      context
    } = this;
    const notes = context.notes;
    if ( notes ) {
      const note = notes[noteId];
      if ( note ) {
        return (
          <sup
            className={ notesPosition === 'sidenotes' ? 'sidenote' : 'footnote' }
            id={ `note-pointer-${noteId}` }
            data-notenumber={ note.order }
          >
            <span className={ 'footnote-content' }>
              <Renderer raw={ note.contents } />
            </span>
          </sup>
        );
      }
      return null;
    }
    return null;
  }
}

/**
 * Component's properties types
 */
Footnote.propTypes = {

  /**
   * Children react components
   */
  children: PropTypes.array,

  /**
   * id of the note to render
   */
  noteId: PropTypes.string,
};

/**
 * Component's context used properties
 */
Footnote.contextTypes = {

  /**
   * Map of available notes to look into
   */
  notes: PropTypes.object,
};

export default Footnote;
