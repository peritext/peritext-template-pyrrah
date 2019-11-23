import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Renderer from './Renderer';
import EndNotes from './EndNotes';
import Authors from './Authors';
import CitationsProvider from './CitationsProvider';
import { getResourceTitle } from 'peritext-utils';

import ResourcePreview from './ResourcePreview';
import Figures from './Figures';

class Section extends Component {
  constructor( props ) {
    super( props );

  }

  getChildContext = () => ( {
    notes: this.props.section.data.contents.notes,
    figuresPosition: this.props.figuresPosition,
    figuresNumberMap: this.props.figuresNumberMap,
  } )

  render = () => {
    const {
      citations,
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
      level = 0,
    } = this.props;
    const title = getResourceTitle( this.props.section );
    return (
      <section
        className={ `section has-notes-position-${notesPosition} has-figures-position-${figuresPosition} level-${level} ${className}` }
        title={ title }
        id={ `section-${containerId}-${id}` }
      >
        <CitationsProvider
          citations={ citations }
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
          <div className={ 'section-contents-container' }>
            <Renderer
              raw={ contents }
              notesPosition={ notesPosition }
              containerId={ containerId }
            />
          </div>
          {
            notesPosition === 'endOfSections' &&
            <EndNotes
              sectionsIds={ [ id ] }
              production={ production }

              translate={ translate }
              citations={ citations }
              publicationTitle={ publicationTitle }
              publicationSubtitle={ publicationSubtitle }
            />
          }
          {
            figuresPosition === 'endOfSections' &&
            <Figures
              figures={ figures }
              production={ production }
              figuresNumberMap={ figuresNumberMap }
            />
          }
        </CitationsProvider>
      </section>
    );
  }
}

export default Section;

Section.childContextTypes = {
  notes: PropTypes.object,
  figuresPosition: PropTypes.object,
  figuresNumberMap: PropTypes.object,
};
