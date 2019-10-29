import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { buildCitations, resourceHasContents, defaultSortResourceSections, getResourceTitle } from 'peritext-utils';

import FrontCover from './FrontCover';
import TitlePage from './TitlePage';
import BackCover from './BackCover';
import Colophon from './Colophon';
import References from './References';
import Glossary from './Glossary';
import EndNotes from './EndNotes';
import DefaultLinkComponent from './DefaultLinkComponent';
import DefaultMentionComponent from './DefaultMentionComponent';
import DefaultSectionLinkComponent from './DefaultSectionLinkComponent';
import MarkdownPlayer from './MarkdownPlayer';
import TableOfContents from './TableOfContents';
import ResourceSections from './ResourceSections';

import Section from './Section';

import templateStyle from '../defaultStyle';

const EmptyPage = () => (
  <div className={ 'composition-block empty-page' } />
);

const updateStyles = ( props ) => {
    const {
      edition: {
        data = {}
      },
      contextualizers = {},
    } = props;

    const {
          style: {
            css = '',
            mode = 'merge',
          } = { css: '' }
    } = data;

    const contextualizersStyles = Object.keys( contextualizers )
        .map( ( type ) => contextualizers[type] && contextualizers[type].defaultCss || '' )
        .join( '\n' );
    if ( mode === 'merge' ) {

      return [
        templateStyle,
        // templateStylesheet,
        contextualizersStyles,
        css
      ]
      .join( '\n' );
    }
    else { // styleMode === 'replace'
      return [
        // templateStylesheet,
        contextualizersStyles,
        css
      ]
      .join( '\n' );
    }

  };

/**
 * @todo externalize
 */
const buildToc = ( production, edition, translate ) => {
  const summary = edition.data.plan.summary;

   const tocEl = summary.find( ( el ) => el.type === 'tableOfContents' );
   const level = ( tocEl && +tocEl.data.level ) || 0;

  return summary.reduce( ( res, element ) => {
    const {
      data = {}
    } = element;
    switch ( element.type ) {
      case 'customPage':
        const { title, displayInTableOfContents } = data;
        if ( displayInTableOfContents ) {
          return [
            ...res,
            {
              title,
              level: 0,
              href: `custom-block-${element.id}`
            }
          ];
        }
        return res;
      case 'sections':
      case 'resourceSections':
        const { id } = element;
        const { customSummary = { active: false }, level: blockLevel = 0 } = data;
        if ( customSummary.active ) {
          const { summary: thatCustomSummary } = customSummary;
          return [
            ...res,
            ...thatCustomSummary.reduce( ( resLoc, { resourceId, level: thatLevel } ) => {
              const thatSection = production.resources[resourceId];
              const titlesMap = {
                'header-one': 1,
                'header-two': 2,
                'header-three': 3,
                'header-four': 4,
              };
              const newItems = [ {
                title: getResourceTitle( thatSection ),
                level: blockLevel + thatLevel,
                href: `section-${id}-${resourceId}`
              } ];
              if ( level > 0 ) {
                const blocks = thatSection.data.contents.contents.blocks;
                blocks.forEach( ( block ) => {
                  if ( titlesMap[block.type] ) {
                    newItems.push( {
                      title: block.text,
                      level: blockLevel + thatLevel + titlesMap[block.type],
                      href: `title-${block.key}`
                    } );
                  }
                } );
              }

              return [
                ...resLoc,
                ...newItems
              ];
            }, [] )
            .filter( ( s ) => s )
          ];
        }
        else if ( element.type === 'resourceSections' ) {
          const {
            data: {
              hideEmptyResources = false
            }
          } = element;
          return [
            ...res,
            ...Object.keys( production.resources )
            .filter( ( resourceId ) => {
              const resource = production.resources[resourceId];
              return data.resourceTypes.includes( resource.metadata.type );
            } )
            .filter( ( resourceId ) => {
              if ( hideEmptyResources ) {
                const resource = production.resources[resourceId];
                return resourceHasContents( resource );
              }
              return true;
            } )
            .sort( defaultSortResourceSections )
            .reduce( ( resLoc, resourceId ) => {
                const thatSection = production.resources[resourceId];
                const thatLevel = 0;
                const titlesMap = {
                  'header-one': 1,
                  'header-two': 2,
                  'header-three': 3,
                  'header-four': 4,
                };
                const newItems = [ {
                  title: getResourceTitle( thatSection ),
                  level: blockLevel + thatLevel,
                  href: `section-${id}-${resourceId}`
                } ];
                if ( level > 0 ) {
                  const blocks = thatSection.data.contents.contents.blocks;
                  blocks.forEach( ( block ) => {
                    if ( titlesMap[block.type] ) {
                      newItems.push( {
                        title: block.text,
                        level: blockLevel + thatLevel + titlesMap[block.type],
                        href: `title-${block.key}`
                      } );
                    }
                  } );
                }
                return [
                  ...resLoc,
                  ...newItems
                ];
            }, [] )
          ];
        }
        return [
          ...res,
          ...production.sectionsOrder.reduce( ( resLoc, { resourceId, level: thatLevel } ) => {
              const thatSection = production.resources[resourceId];
              const titlesMap = {
                'header-one': 1,
                'header-two': 2,
                'header-three': 3,
                'header-four': 4,
              };
              const newItems = [ {
                title: getResourceTitle( thatSection ),
                level: blockLevel + thatLevel,
                href: `section-${id}-${resourceId}`
              } ];
              if ( level > 0 ) {
                const blocks = thatSection.data.contents.contents.blocks;
                blocks.forEach( ( block ) => {
                  if ( titlesMap[block.type] ) {
                    newItems.push( {
                      title: block.text,
                      level: blockLevel + thatLevel + titlesMap[block.type],
                      href: `title-${block.key}`
                    } );
                  }
                } );
              }
              return [
                ...resLoc,
                ...newItems
              ];
          }, [] )
        ];
      case 'glossary':
        return [
          ...res,
          {
            title: data.customTitle || translate( 'Glossary list' ),
            level: 0,
            href: `glossary-block-${element.id}`
          }
        ];
      case 'references':
        return [
          ...res,
          {
            level: 0,
            title: data.customTitle || translate( 'References' ),
            href: `reference-block-${element.id}`
          }
        ];
      default:
        return res;
    }
  }, [] );
};

const buildSectionBlockSummary = ( sectionBlock, production ) => {
  if ( sectionBlock.data.customSummary && sectionBlock.data.customSummary.active ) {
    return sectionBlock.data.customSummary.summary;
  }
  return production.sectionsOrder;
};

const Sections = ( {
  production,
  edition,
  translate,
  data = {},
  citations,
  citationStyle,
  citationLocale,
  publicationTitle,
  publicationSubtitle,
  id,
} ) => {
  const summary = edition.data.plan.summary;
  const {
    notesPosition = 'footnotes',
    displayHeader = false
  } = data;

  const sectionsBlocks = summary.filter( ( s ) => s.type === 'sections' );

  const sectionsIds = sectionsBlocks.reduce( ( res, sectionBlock ) => {
    // @todo handle custom sections order
    return [
      ...res,
      ...buildSectionBlockSummary( sectionBlock, production )
    ];
  }, [] );

  return [
    ...sectionsIds.map( ( { resourceId }, index ) => {
      const section = production.resources[resourceId];
      return (
        <Section
          section={ section }
          notesPosition={ notesPosition }
          key={ `${index}-${resourceId}` }
          displayHeader={ displayHeader }
          production={ production }
          containerId={ id }
          translate={ translate }
          citations={ citations }
          citationStyle={ citationStyle }
          citationLocale={ citationLocale }
          publicationTitle={ publicationTitle }
          publicationSubtitle={ publicationSubtitle }
        />
      );
    } ),
    // @todo endnotes relative to sections and not to production sectionsOrder
    notesPosition === 'endOfContents' ?
      <EndNotes
        key={ 'endnotes' }
        sectionsIds={ sectionsIds }
        production={ production }

        translate={ translate }
        citations={ citations }
        citationStyle={ citationStyle }
        citationLocale={ citationLocale }
        publicationTitle={ publicationTitle }
        publicationSubtitle={ publicationSubtitle }
      /> : null
  ];
};

const renderSummary = ( {
  production,
  edition,
  translate,
  citations,
} ) => {
  const summary = edition.data.plan.summary;
  const citationStyle = edition.data.citationStyle.data;
  const citationLocale = edition.data.citationLocale.data;

  const {
    data: editionData = {}
  } = edition;
  const {
    metadata
  } = production;

  const finalTitle = editionData.publicationTitle || metadata.title;
  const finalSubtitle = editionData.publicationSubtitle || metadata.subtitle;

  return summary.map( ( element, index ) => {
    switch ( element.type ) {
      case 'frontCover':
        return (
          <FrontCover
            key={ index }
            production={ production }
            edition={ edition }
            translate={ translate }
            { ...element }
          />
        );
      case 'titlePage':
        return (
          <TitlePage
            key={ index }
            production={ production }
            edition={ edition }
            translate={ translate }
            { ...element }
          />
        );
      case 'colophon':
        return (
          <Colophon
            key={ index }
            production={ production }
            edition={ edition }
            translate={ translate }
            { ...element }
          />
        );
      case 'backCover':
        return (
          <BackCover
            key={ index }
            production={ production }
            edition={ edition }
            translate={ translate }
            { ...element }
          />
        );
      case 'emptyPage':
        return <EmptyPage key={ index } />;
      case 'tableOfContents':
        const toc = buildToc( production, edition, translate );
        return (
          <TableOfContents
            key={ index }
            data={ element.data }
            tableOfContents={ toc }
            translate={ translate }
            id={ element.id }
          />
        );

      case 'customPage':
        return (
          <div
            id={ element.data.customCssId || element.id }
            key={ index }
            className={ `composition-block custom-page ${element.data.displayPageNumber ? 'has-page-number' : ''}` }
          >
            {element.data.title &&
              <h1
                id={ `custom-block-${element.id}` }
                className={ 'composition-block-title peritext-block-title' }
              >
                {element.data.title}
              </h1>
            }
            {element.data.markdownContents &&
              <MarkdownPlayer src={ element.data.markdownContents } />
            }
          </div>
        );
      case 'sections':
        return (
          <Sections
            key={ index }
            production={ production }
            edition={ edition }
            translate={ translate }
            citations={ citations }
            citationStyle={ citationStyle }
            citationLocale={ citationLocale }
            publicationTitle={ finalTitle }
            publicationSubtitle={ finalSubtitle }
            { ...element }
          />
        );
      case 'glossary':
        return (
          <Glossary
            key={ index }
            production={ production }
            edition={ edition }
            translate={ translate }
            citations={ citations }
            citationStyle={ citationStyle }
            citationLocale={ citationLocale }
            { ...element }
          />
        );
      case 'references':
        return (
          <References
            key={ index }
            production={ production }
            edition={ edition }
            translate={ translate }
            citations={ citations }
            citationStyle={ citationStyle }
            citationLocale={ citationLocale }
            { ...element }
          />
        );
        case 'resourceSections':
            return (
              <ResourceSections
                key={ index }
                production={ production }
                edition={ edition }
                translate={ translate }
                citations={ citations }
                citationStyle={ citationStyle }
                citationLocale={ citationLocale }
                publicationTitle={ finalTitle }
                publicationSubtitle={ finalSubtitle }
                { ...element }
              />
            );

      default:
        return (
          <div
            id={ element.id }
            className={ 'composition-block' }
            key={ index }
          >
            {element.type}
          </div>
        );
    }
  } );
};

export default class Template extends Component {
  constructor( props ) {
    super( props );
  }

  getChildContext() {
    return {
      LinkComponent: this.props.LinkComponent || DefaultLinkComponent,
      MentionComponent: this.props.MentionComponent || DefaultMentionComponent,
      SectionLinkComponent: this.props.SectionLinkComponent || DefaultSectionLinkComponent,
      production: this.props.production,
      productionAssets: this.props.production.assets,

      contextualizers: this.props.contextualizers,
      translate: this.translate,
    };
  }

  shouldComponentUpdate = () => true;

  translate = ( key ) => {
    const { locale = {} } = this.props;
    return locale[key] || key;
  }

  render () {
    const {
      props: {
        production,
        edition,
        contextualizers,
        renderAdditionalHTML = false,
      },
      translate,
    } = this;

    const {
      data = {},
    } = edition;
    const {
      additionalHTML = '',
    } = data;

    const citations = buildCitations( { production, edition } );
    const finalStyles = updateStyles( { edition, contextualizers } );

    /**
     * We render an array
     * to have our sections as a flat collection
     * which facilitates @paged rules about pages breaks
     */
    return [
      ...renderSummary( {
        production,
        edition,
        translate,
        citations,
      } ),
      <style
        key={ 'styles' }
        dangerouslySetInnerHTML={ { __html: finalStyles/* eslint react/no-danger : 0 */
         } }
      />,
      renderAdditionalHTML ?
        <div
          id={ 'additional-html' }
          key={ 'additional-html' }
          dangerouslySetInnerHTML={ {/* eslint react/no-danger : 0 */
          __html: `${additionalHTML } `
        } }
        /> : null
    ].filter( ( s ) => s );

  }
}

Template.childContextTypes = {
  LinkComponent: PropTypes.func,
  MentionComponent: PropTypes.func,
  SectionLinkComponent: PropTypes.func,
  translate: PropTypes.func,
  production: PropTypes.object,
  productionAssets: PropTypes.object,
  contextualizers: PropTypes.object,
};
