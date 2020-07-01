import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BlockAssetWrapper from './BlockAssetWrapper';

export default class Figures extends Component {

  static childContextTypes = {
    figuresPosition: PropTypes.object,
    production: PropTypes.object,
    figuresNumberMap: PropTypes.object,
  }
  getChildContext = () => ( {
    figuresPosition: 'inBody',
    production: this.props.production,
    figuresNumberMap: this.props.figuresNumberMap,

  } )
  render = () => {
    const {
      figures = [],
      containerId,
      production,
      id,
    } = this.props;
    return figures.length ? (
      <section
        className={ 'end-figures' }
        id={ `end-figures-${containerId}-${id}` }
      >
        <h2 className={ 'end-figures-title' }>Figures</h2>
        <ul className={ 'figures-list' }>
          {
            figures
            .filter( ( figure ) => {
              const contextualization = production && production.contextualizations && production.contextualizations[figure.contextualizationId];
              if ( !contextualization ) {
                return false;
              }
              const {
                visibility = {
                    screened: true,
                    paged: true
                  }
              } = contextualization;
              if ( !visibility.paged ) {
                return false;
              }
              return true;
            } )
            .map( ( { contextualizationId }, index ) => {
              return (
                <li
                  id={ `end-figure-container-${contextualizationId}` }
                  className={ 'end-figure-container' }
                  key={ index }
                >
                  <BlockAssetWrapper
                    data={ { asset: { id: contextualizationId } } }
                    displayFigureNumber
                  />
                </li>
              );
            } )
          }
        </ul>
      </section>
    ) : null;
  }
}
