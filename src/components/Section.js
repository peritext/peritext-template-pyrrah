import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Renderer from './Renderer';
import EndNotes from './EndNotes';
import Authors from './Authors';
import { ReferencesManager } from 'react-citeproc';
import { getResourceTitle } from 'peritext-utils';

import ResourcePreview from './ResourcePreview';

class Section extends Component {
  constructor( props ) {
    super( props );

  }

  getChildContext = () => ( {
    notes: this.props.section.data.contents.notes
  } )

  render = () => {
    const {
      citations,
      citationStyle,
      citationLocale,
      className = '',
      section: {
        id,
        metadata: {
          // title,
          subtitle,
          authors = [],
        },
        data: {
          contents: {
            contents
          }
        },
      },
      containerId,
      notesPosition,
      production,
      translate,
      publicationTitle,
      publicationSubtitle,
      displayHeader,
      level = 0,
    } = this.props;
    const title = getResourceTitle( this.props.section );
    return (
      <section
        className={ `section has-notes-position-${notesPosition} level-${level} ${className}` }
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

          {
            displayHeader &&
            <ResourcePreview resource={ this.props.section } />
          }

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
