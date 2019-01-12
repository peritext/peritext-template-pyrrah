/**
 * This module exports a statefull reusable draft-js raw-to-react renderer component
 * It wrapps around the redraft engine that converts draft-s raw to a react representation,
 * providing it specific settings and callbacks.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import redraft from 'redraft';
import { constants } from 'peritext-schemas';

import Link from './Link';
import BlockAssetWrapper from './BlockAssetWrapper';
import InlineAssetWrapper from './InlineAssetWrapper';
import InternalLink from './InternalLink';

/*
 * import NotePointer from './NotePointer';
 * import Footnote from './Footnote';
 */
const {
  LINK,
  BLOCK_ASSET,
  INLINE_ASSET,
  SECTION_POINTER,
} = constants.draftEntitiesNames;

// just a helper to add a <br /> after each block
const addBreaklines = ( children ) => children.map( ( child, index ) => [ child, <br key={ index + 1 } /> ] );

/**
 * Define the renderers
 */
const renderers = {

  /**
   * Those callbacks will be called recursively to render a nested structure
   */
  inline: {
    // The key passed here is just an index based on rendering order inside a block
    BOLD: ( children, { key } ) => <strong key={ key }>{children}</strong>,
    ITALIC: ( children, { key } ) => <em key={ key }>{children}</em>,
    UNDERLINE: ( children, { key } ) => <u key={ key }>{children}</u>,
    CODE: ( children, { key } ) => <span key={ key }>{children}</span>,
  },

  /**
   * Blocks receive children and depth
   * Note that children are an array of blocks with same styling,
   */
  blocks: {
    'unstyled': ( children ) => children.map( ( child, index ) => (
      <span
        key={ index }
        className={ 'footnote-p' }
      >
        {child}
      </span>
    ) ),
    'blockquote': ( children ) => <span className={ 'footnote-blockquote' } >{addBreaklines( children )}</span>,
    'header-one': ( children, { keys } ) => children.map( ( child, index ) => (
      <span
        className={ 'footnote-h1' }
        key={ index }
        id={ keys[index] }
      >
        {child}
      </span>
    ) ),
    'header-two': ( children, { keys } ) => children.map( ( child, index ) => (
      <span
        className={ 'footnote-h2' }
        key={ index }
        id={ keys[index] }
      >
        {child}
      </span>
    ) ),
    'header-three': ( children, { keys } ) => children.map( ( child, index ) => (
      <span
        className={ 'footnote-h3' }
        key={ index }
        id={ keys[index] }
      >
        {child}
      </span>
    ) ),
    'header-four': ( children, { keys } ) => children.map( ( child, index ) => (
      <span
        className={ 'footnote-h4' }
        key={ index }
        id={ keys[index] }
      >
        {child}
      </span>
    ) ),
    'header-five': ( children, { keys } ) => children.map( ( child, index ) => (
      <span
        className={ 'footnote-h5' }
        key={ index }
        id={ keys[index] }
      >
        {child}
      </span>
    ) ),
    'header-six': ( children, { keys } ) => children.map( ( child, index ) => (
      <span
        className={ 'footnote-h6' }
        key={ index }
        id={ keys[index] }
      >
        {child}
      </span>
    ) ),

    // You can also access the original keys of the blocks
    'code-block': ( children, { keys } ) => (
      <span
        className={ 'footnote-pre' }
        key={ keys[0] }
      >
        {addBreaklines( children )}
      </span>
    ),
    // or depth for nested lists
    'unordered-list-item': ( children, { depth, keys } ) => (
      <span
        // className={ 'footnote-ul' }
        key={ keys[keys.length - 1] }
        className={ `ul-level-${depth}` }
      >
        {
        children.map( ( child, index ) => (
          <span
            className={ 'footnote-li' }
            key={ index }
          >
            {child}
          </span>
        ) )
      }
      </span> ),
    'ordered-list-item': ( children, { depth, keys } ) => (
      <span
        // className={ 'footnote-ol' }
        key={ keys.join( '|' ) }
        className={ `ol-level-${depth}` }
      >
        {
        children.map( ( child, index ) => (
          <span
            className={ 'footnote-li' }
            key={ keys[index] }
          >
            {child}
          </span>
        ) )
      }
      </span>
    ),

    /*
     * If your blocks use meta data it can also be accessed like keys
     * atomic: (children, { keys, data }) => children.map((child, i) => <Atomic key={keys[i]} {...data[i]}>{child}</Atomic>),
     */
  },

  /**
   * Entities receive children and the entity data
   */
  entities: {
  //   // key is the entity key value from raw
    [LINK]: ( children, data, { key } ) =>
      (
        <Link
          key={ key }
          to={ data.url }
        >
          {children}
        </Link>
      ),
    [BLOCK_ASSET]: ( children, data, { key } ) => {
      return (
        <BlockAssetWrapper
          key={ key }
          data={ data }
        />
      );
    },
    [INLINE_ASSET]: ( children, data, { key } ) => {
      return (
        <InlineAssetWrapper
          data={ data }
          key={ key }
        >
          {children}
        </InlineAssetWrapper>
      );
    },
    [SECTION_POINTER]: ( children, data, { key } ) => {
      return (
        <InternalLink
          key={ key }
          sectionId={ data.sectionId }
        >
          {children}
        </InternalLink>
      );
    },
  },
};

/**
 * Renderer class for building raw-to-react rendering react component instances
 */
class Renderer extends Component {

  /**
   * constructor
   * @param {object} props - properties given to instance at instanciation
   */
  constructor ( props ) {
    super( props );
  }

  /**
   * Determines whether to update the component or not
   * @param {object} nextProps - the future properties of the component
   * @return {boolean} shouldUpdate - yes or no
   */
  shouldComponentUpdate( ) {
    return true;
    // return this.props.raw !== nextProps.raw;
  }

  /**
   * Displays something when no suitable content state is provided to the renderer
   * @return {ReactElement} default message
   */
  renderWarning() {
    return <div />;
  }

  /**
   * Renders the component
   * @return {ReactElement} component - the component
   */
  render() {
    const {
      raw,
    } = this.props;
    if ( !raw ) {
      return this.renderWarning();
    }
    const rendered = redraft( raw, renderers );
    // redraft can return a null if there's nothing to render
    if ( !rendered ) {
      return this.renderWarning();
    }
    return (
      <span>
        {rendered}
      </span>
    );
  }
}

/**
 * Component's properties types
 */
Renderer.propTypes = {

  /**
   * Draft-js raw representation of some contents
   * see https://draftjs.org/docs/api-reference-data-conversion.html
   */
  raw: PropTypes.object
};

export default Renderer;
