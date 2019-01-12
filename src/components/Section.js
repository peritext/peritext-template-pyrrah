import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReferencesManager } from 'react-citeproc';

import Renderer from './Renderer';
import EndNotes from './EndNotes';
import Authors from './Authors';

class Section extends Component {
  constructor( props ) {
    super( props );

  }

  getChildContext = () => ( {
    notes: this.props.section.notes
  } )

  render = () => {
    const {
      citations,
      citationStyle,
      citationLocale,
      section: {
        id,
        metadata: {
          title,
          subtitle,
          authors = [],
        },
        contents,
      },
      containerId,
      notesPosition,
      production,
      translate,
      publicationTitle,
      publicationSubtitle,
    } = this.props;
    return (
      <section
        className={ `section has-notes-position-${notesPosition}` }
        title={ title }
        id={ `section-${containerId}-${id}` }
      >
        <ReferencesManager
          style={ citationStyle }
          locale={ citationLocale }
          items={ citations.citationItems }
          citations={ citations.citationData }
          componentClass={ 'references-manager' }
        >
          <h2 className={ 'composition-block-title section-title' }>{title}</h2>
          <em className={ 'section-title-running' }>{title}</em>
          <em className={ 'publication-title-running' }>{publicationTitle}</em>

          {subtitle && <h2 className={ 'section-subtitle' }>{subtitle}</h2>}
          {
            authors.length > 0 &&
            <h3 className={ 'section-authors' }>
              <Authors authors={ authors } />
            </h3>
          }
          <Renderer
            raw={ contents }
            notesPosition={ notesPosition }
            containerId={ containerId }
          />
          {
            notesPosition === 'endOfSections' &&
            <EndNotes
              sectionsIds={ [ id ] }
              production={ production }

              translate={ translate }
              citations={ citations }
              citationStyle={ citationStyle }
              citationLocale={ citationLocale }
              publicationTitle={ publicationTitle }
              publicationSubtitle={ publicationSubtitle }
            />
          }
        </ReferencesManager>
      </section>
    );
  }
}

export default Section;

Section.childContextTypes = {
  notes: PropTypes.object,
};
