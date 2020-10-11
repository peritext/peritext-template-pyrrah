import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { buildCitations, getResourceTitle } from 'peritext-utils';

import { buildFiguresNumberMap } from '../helpers';

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
import Figures from './Figures';
import buildResourceSectionsSummary from 'peritext-utils/dist/buildResourceSectionsSummary';

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
        const { customSummary = { active: false }, level: blockLevel = 0, figuresPosition = 'endOfSections' } = data;
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

              if ( level > 0 && thatSection && thatSection.data && thatSection.data.contents ) {
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

                if ( figuresPosition === 'endOfSections' ) {
                  const { figuresNumberMap, figures } = buildFiguresNumberMap( {
                    production,
                    sectionsIds: [resourceId],
                    figuresPosition
                  } );
                  if (Object.keys(figures).reduce((sum, key) => sum + figures[key].length, 0)) {
                    newItems.push( {
                      title: translate( 'Figures' ),
                      level: thatLevel + 1,
                      href: `end-figures-${id}-${resourceId}`
                    } );
                  }
                  
                }
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
          return [
            ...res,
            ...buildResourceSectionsSummary( { production, option: data } )
            .reduce( ( resLoc, { resourceId, level: initLevel } ) => {
                const thatSection = production.resources[resourceId];
                const thatLevel = initLevel;
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
                if ( level > 0 && thatSection && thatSection.data && thatSection.data.contents ) {
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
                if ( figuresPosition === 'endOfSections' ) {
                  const { figuresNumberMap, figures } = buildFiguresNumberMap( {
                    production,
                    sectionsIds: [resourceId],
                    figuresPosition
                  } );
                  if (Object.keys(figures).reduce((sum, key) => sum + figures[key].length, 0)) {
                    newItems.push( {
                      title: translate( 'Figures' ),
                      level: thatLevel + 1,
                      href: `end-figures-${id}-${resourceId}`
                    } );
                  }
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
              if ( level > 0 && thatSection && thatSection.data && thatSection.data.contents ) {
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
              if ( figuresPosition === 'endOfSections' ) {
                const { figuresNumberMap, figures } = buildFiguresNumberMap( {
                  production,
                  sectionsIds: [resourceId],
                  figuresPosition
                } );
                if (Object.keys(figures).reduce((sum, key) => sum + figures[key].length, 0)) {
                  newItems.push( {
                    title: translate( 'Figures' ),
                    level: thatLevel + 1,
                    href: `end-figures-${id}-${resourceId}`
                  } );
                }
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
  publicationTitle,
  publicationSubtitle,
  id,
} ) => {
  const summary = edition.data.plan.summary;
  const {
    notesPosition = 'footnotes',
    figuresPosition = 'endOfSections',
    displayHeader = false
  } = data;

  const sectionsBlocks = summary.filter( ( s ) => s.type === 'sections' );

  const sectionsIds = sectionsBlocks.reduce( ( res, sectionBlock ) => {
    return [
      ...res,
      ...buildSectionBlockSummary( sectionBlock, production )
    ];
  }, [] );

  const { figuresNumberMap, figures } = buildFiguresNumberMap( {
    production,
    sectionsIds: sectionsIds.map( ( { resourceId } ) => resourceId ),
    figuresPosition
  } );
  return [
    ...sectionsIds.map( ( { resourceId }, index ) => {
      const section = production.resources[resourceId];
      return (
        <Section
          section={ section }
          notesPosition={ notesPosition }
          figuresPosition={ figuresPosition }
          figuresNumberMap={ figuresNumberMap }
          figures={ figuresPosition === 'endOfSections' ? figures[resourceId] : undefined }
          key={ `${index}-${resourceId}` }
          displayHeader={ displayHeader }
          production={ production }
          containerId={ id }
          translate={ translate }
          citations={ citations }
          publicationTitle={ publicationTitle }
          publicationSubtitle={ publicationSubtitle }
        />
      );
    } ),
    notesPosition === 'endOfContents' ?
      <EndNotes
        key={ 'endnotes' }
        sectionsIds={ sectionsIds }
        production={ production }

        translate={ translate }
        citations={ citations }
        publicationTitle={ publicationTitle }
        publicationSubtitle={ publicationSubtitle }
      /> : null,
    figuresPosition === 'endOfContents' ?
      <Figures
        production={ production }

        translate={ translate }
        figures={ figures }
        figuresNumberMap={ figuresNumberMap }
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
        if ( element.data.customHTML && element.data.customHTML.length ) {
          return (
            <div
              id={ element.data.customCssId || element.id }
              key={ index }
              className={ `composition-block custom-page  has-custom-html ${element.data.displayPageNumber ? 'has-page-number' : ''}` }
              dangerouslySetInnerHTML={ {
                __html: element.data.customHTML
              } }
            />
          );

        }
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

const editionHasGlossary = (edition = {}) => {
  if (edition.data && edition.data.plan && edition.data.plan.summary) {
    const summary = edition.data.plan.summary;
    return summary.find(e => e.type === 'glossary') !== undefined;
  }
  return false;
}
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
      preprocessedData: this.props.preprocessedData,

      contextualizers: this.props.contextualizers,
      translate: this.translate,
      useGlossary: editionHasGlossary(this.props.edition)
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
        preprocessedData,
      },
      translate,
    } = this;

    const {
      data = {},
    } = edition;
    const {
      additionalHTML = '',
    } = data;

    const citations = preprocessedData && preprocessedData.global && preprocessedData.global.citations ? preprocessedData.global.citations : buildCitations( { production, edition }, true );
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
  preprocessedData: PropTypes.object,
  useGlossary: PropTypes.bool
};
