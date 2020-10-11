import React from 'react';
import { storiesOf } from '@storybook/react';

import {preprocessEditionData} from 'peritext-utils'

import ContextProvider from './ContextProvider';

import template from '../src';
import production from './assets/production.json';
import { printEdition, editionTypes } from './assets/mocks';

const {
  components: {
    Edition
  }
} = template;

const contextualizers = {
  bib: require( 'peritext-contextualizer-bib' ),
  webpage: require( 'peritext-contextualizer-webpage' ),
  glossary: require( 'peritext-contextualizer-glossary' ),
  embed: require( 'peritext-contextualizer-embed' ),
  video: require( 'peritext-contextualizer-video' ),
  image: require( 'peritext-contextualizer-image' ),
  sourceCode: require( 'peritext-contextualizer-source-code' ),
  vegaLite: require( 'peritext-contextualizer-vegalite' ),
  table: require( 'peritext-contextualizer-table' ),
};

const extractSpecificView = ( viewType ) => {

  const newEdition = {
    ...printEdition,
    data: {
      ...printEdition.data,
      plan: {
        ...printEdition.data.plan,
        summary: [ editionTypes[viewType] ]
      }
    }
  };

  const thatPrepro = preprocessEditionData( {
    production,
    edition: newEdition
  } );
  return {
    edition: newEdition,
    preprocessedData: thatPrepro
  };
};

const renderWithEdition = (  { edition: thatEdition, preprocessedData: thatPrepro } ) => (
  <>
    <div id="source">
      <ContextProvider
          renderingMode={ 'screened' }
      >
          <Edition
            {
              ...{
                production,
                edition: thatEdition,
                preprocessedData: thatPrepro,
                lang: 'fr',
                contextualizers,
                previewMode: true,
                locale: {},
              }
            }
          />
        </ContextProvider>
      </div>
      <div id="preview" />
  </>
  
);

storiesOf( 'Template', module )
  .add( 'complete edition', () => renderWithEdition( printEdition ) )
  .add( 'sections', () => renderWithEdition( extractSpecificView( 'sections' ) ) )
  .add( 'front page', () => renderWithEdition( extractSpecificView( 'frontCover' ) ) )
  .add( 'title page', () => renderWithEdition( extractSpecificView( 'titlePage' ) ) )
  .add( 'references', () => renderWithEdition( extractSpecificView( 'references' ) ) )
  // .add( 'glossary', () => renderWithEdition( extractSpecificView( 'glossary' ) ) )
  .add( 'back cover', () => renderWithEdition( extractSpecificView( 'backCover' ) ) )
