"use strict";

const style = `

/* variable used for the template */
:root {
  --color-link-default: #99B6BD;/* bleu délavé */
  --color-link-active:#D4613E;/* rouille */
  --color-text: #4d4c4c;

  font-family:'Source serif pro', serif;
  --gutter-medium: .5cm;
}

/**
 *
 * PAGES LAYOUTS
 *
 */
@page{
  format: A4 portrait;
}

/* front cover */

@page front-cover {
  margin: 0e-6cm;
}
@page back-cover {
  margin: 0e-6cm;
}
@page front-cover{
}
@page colophon:left {
  margin-top: 33mm;
  margin-bottom: 64.8mm;
  margin-left: 45.8mm;
  margin-right: 23.3mm;
  
  @top-left{
  }
  @top-left-corner {

  }
}

@page colophon:right {
  margin-top: 33mm;
  margin-bottom: 64.8mm;
  margin-right: 45.8mm;
  margin-left: 23.3mm;
  @top-right-corner {
  }
  @top-right {
  }
}
@page empty-page {
}
@page table-of-contents {
}
@page table-of-contents-wpnumber:left {
  @top-left-corner {
    content: counter(page);
    text-align: center;
  }
}
@page table-of-contents-wpnumber:right {
  @top-right-corner {
    content: counter(page);
    text-align: center;
  }
}
@page custom-page {
}
@page custom-page-wpnumber:left {
  @top-left-corner {
    content: counter(page);
    text-align: center;
  }
}
@page custom-page-wpnumber:right {
  @top-right-corner {
    content: counter(page);
    text-align: center;
  }
}

@page section{

}

@page section:left {
  margin-top: 33mm;
  margin-bottom: 64.8mm;
  margin-left: 45.8mm;
  margin-right: 23.3mm;
  @top-left{
    content: element(publicationTitle);
  }
  @top-left-corner {
    content: counter(page);
    text-align: center;
  }
}

@page section:right {
  margin-top: 33mm;
  margin-bottom: 64.8mm;
  margin-right: 45.8mm;
  margin-left: 23.3mm;
  @top-right-corner {
    content: counter(page);
    text-align: center;
  }
  @top-right {
     content: element(sectionTitle);
  }
}

@page peritext{

}

@page peritext:left {
  margin-top: 33mm;
  margin-bottom: 64.8mm;
  margin-left: 45.8mm;
  margin-right: 23.3mm;
  @top-left{
    content: element(publicationTitle);
  }
  @top-left-corner {
    content: counter(page);
    text-align: center;
  }
}

@page peritext:right {
  margin-top: 33mm;
  margin-bottom: 64.8mm;
  margin-right: 45.8mm;
  margin-left: 23.3mm;
  @top-right-corner {
    content: counter(page);
    text-align: center;
  }
  @top-right {
  }
}
@page section:first{
  @top-right {
     content: none;
  }
}


.front-cover{
  page: front-cover;
  page-break-before: right;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.title-page{
  page: title-page;
  page-break-before: right;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}


.colophon{
  page: colophon;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.back-cover{
  page: back-cover;
  page-break-before: left;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.empty-page{
  page: empty-page;
}

.table-of-contents{
  page: table-of-contents;
  page-break-before: right;
}
.table-of-contents.has-page-number{
  page: table-of-contents-wpnumber;
  page-break-before: right;
}

.custom-page{
  page: custom-page;
}
.section{
  page: section;
  page-break-before: right;
}

.glossary{
  page: peritext;
}
.reference{
  page: peritext;
}

.custom-page.has-page-number{
  page: custom-page-wpnumber;
}

/**
 *
 * =================
 * =================
 * =================
 * =================
 * =================
 * REUSED COMPONENTS
 * =================
 * =================
 * =================
 * =================
 * =================
 *
 */
body{
  text-rendering: optimizeLebility;
  color: var(--color-text);
}
a,
.page-link{
  text-decoration: none;
  color: var(--color-link-default);
}
.page-link::after{
  content: target-counter(attr(href), page);
}
.publication-title-running{
  position: running(publicationTitle); 
}
.section-title-running{
  position: running(sectionTitle); 
}

.composition-block-title{
  font-weight: 800;
  font-size: 50px;
}

/**
 * Prevent overflow bugs
 */
.csl-entry,
a{
  word-break: break-all;
}

/* lists */
.mentions-container{
  padding: 0;
}
.mention-item{
  list-style-type: none;
  padding: 0;
  margin-bottom: var(--gutter-medium);
}
.mention-item .title{

}
.glossary .mention-item .title{
  font-weight: 800;
}
.mention-item .description {

}
.mention-item .mentions-list{
  opacity: .8;
  font-size: 80%;
}

.mention-item .mentions-list::before{
  content: "◉";
  font-style: normal;
  padding-right: calc(.5 * var(--gutter-medium));
}

/* rendered content */
.rendered-content .unstyled{
  text-indent: var(--gutter-medium);
  margin-bottom: calc(.4 * var(--gutter-medium));
}
.rendered-content > .unstyled {
  text-indent: none;
}

ul + .unstyled,
blockquote + .unstyled,
figure + .unstyled,
.csl-entry{
  text-indent: none;
}

.rendered-content sup{
  line-height: 0;
  vertical-align: super;
      position: relative;
    top: .2em;
}
.footnote-area .footnote{
}
.footnote-area .footnote sup{
  vertical-align: baseline;
  font-size: 100%;
}
.footnote-area .footnote sup::after{
  content: ".";
  padding-right: .5em;
}

/**
 * Figures (general)
 */
.block-contextualization-container,
.block-contextualization-container figure
{
  padding: 0;
  margin: 0;
}
.block-contextualization-container .figure-caption{
  padding-top: calc(.5 * var(--gutter-medium));
  font-style: italic;
}
.block-contextualization-container .figure-title{
  margin: 0;
}
.block-contextualization-container .figure-title .mention-context-pointer{
  font-size: 1.2rem;
  padding: 0;
}
.block-contextualization-container .figure-legend{
  font-size: 1em;
  margin-top: 0;
}
.block-contextualization-container .figure-legend p{
  margin-top: 0;
}
.block-contextualization-container figure{
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  position: relative;
}
.block-contextualization-container img
{
  max-width: 100%;
  max-height: 4cm;
}
.block-contextualization-container iframe
{
  min-height: 30%;
  outline: none;
  border: none;
  width: 100%;
  max-height: 4cm;
  min-height: 3cm;
}
/**
 * Figures (specific)
 */
/* tables */
.block-contextualization-container.table{
  page-break-before: always;
  max-width: 100%;
  overflow: hidden;
}

.block-contextualization-container.table table th,
.block-contextualization-container.table table tr
 {
    border-right: 1px solid black;
    border-bottom: 1px solid black;
  font-size: 8px;
}

.block-contextualization-container.bib .figure-caption{
  display: none;
}
/* images */
.block-contextualization-container.image .static-images-container{
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
}
.block-contextualization-container.image .static-images-container img{
  display: block;
}
.block-contextualization-container.image .image-specific-caption {
  font-style: italic;
  font-size: 70%;
  opacity: .8;
  padding: calc(.5 * var(--gutter-medium));
  padding-left: 0;
}
/* vegaLite visualizations */
.block-contextualization-container.vegaLite .vegaLite > div {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  padding: var(--gutter-medium);
  page-break-inside: avoid;
}
/**
 *
 * =================
 * =================
 * =================
 * =================
 * =================
 * VIEW SPECIFIC COMPONENTS
 * =================
 * =================
 * =================
 * =================
 * =================
 *
 */
/* front cover components */
.front-cover .front-cover-title {
    font-size: 50px;
    margin-bottom: 0;
}
.front-cover .front-cover-subtitle {
    font-size: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.front-cover .front-cover-authors{
  color: var(--color-link-active);
  font-size: 20px;
}
.front-cover .front-cover-footer{
  font-style: italic;
}
/* title-page */
.title-page{
  text-align: center;
}
.title-page .title-page-title {
    font-size: 50px;
    margin-bottom: 0;
}
.title-page .title-page-subtitle {
    font-size: 30px;
    margin-top: 15px;
    margin-bottom: 15px;
}
.title-page .title-page-authors{
  font-size: 22px;
}
.title-page .title-page-footer{
  font-style: italic;
}
/* colophon components */
.colophon-content{
  position: absolute;
  bottom: 0;
}

/* back cover components */
.back-cover .back-cover-title {
    font-size: 30px;
    margin-bottom: 0;
}
.back-cover .back-cover-subtitle {
    font-size: 20px;
    margin-top: 5px;
    margin-bottom: 15px;
}
.back-cover .back-cover-authors{
  color: var(--color-link-active);
  font-size: 16px;
}
.back-cover .back-cover-text{
  max-height: 60%;
}
.back-cover .back-cover-footer{
  font-style: italic;
}

/* toc views components */
.table-of-contents .table-of-contents-elements-container{
  padding: 0;
}
.table-of-contents .table-of-contents-element{
  list-style-type: none;
  margin: 0;
  font-size: 20px;
}
.table-of-contents .table-of-contents-element { 
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  
}
.table-of-contents .table-of-contents-element .element-leading{
  flex: 1;
  content: " ";
  border-bottom: 1px dashed var(--color-text);
}
.table-of-contents .table-of-contents-element .element-title,
.table-of-contents .table-of-contents-element .page-link
{
   position: relative;
   top: .25em;
   min-width: 20px;
}
.table-of-contents .table-of-contents-element.level-0{
}
.table-of-contents .table-of-contents-element.level-1{
  margin-left: calc(.3 * var(--gutter-medium)); 
}
.table-of-contents .table-of-contents-element.level-2{
  margin-left: calc(.6 * var(--gutter-medium)); 
  
}
.table-of-contents .table-of-contents-element.level-3{
  margin-left: calc(.9 * var(--gutter-medium)); 
}
.table-of-contents .table-of-contents-element.level-4{
  margin-left: calc(1.2 * var(--gutter-medium)); 
  
}
.table-of-contents .table-of-contents-element.level-5{
  margin-left: calc(1.5 * var(--gutter-medium)); 
  
}
.table-of-contents .table-of-contents-element.level-6{
  margin-left: calc(1.8 * var(--gutter-medium)); 
  
}
/* sections views */
.section.has-notes-position-sidenotes .sidenote { 
  color: var(--color-link-default);
  border-left: 3px solid var(--color-link-default);
  margin-left: .5em;
  padding-left: .5em;
  font-size: .8em;
  vertical-align: baseline;
}
.end-notes{
  padding-left: 0;
}
.end-notes li{
  list-style-type: none;
  margin-left: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
}

.end-notes li .rendered-content{
  flex: 1;
  padding-left: 1rem;
}

.end-notes li .rendered-content .unstyled:first-of-type {
  text-indent: 0;
}
  
.footnote{
  font-size: 80%;
  vertical-align: baseline;
  opacity: .8;
}


.section-title{
  margin-top: 50%;
}

/* front cover and back cover */
.front-cover{
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.title-page{
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.back-cover{
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.front-cover .front-cover-footer,
.back-cover .back-cover-footer,
.title-page .title-page-footer
{
  position : absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
}

.front-cover .front-cover-content,
.back-cover .back-cover-content
{
  background: white;
  color: var(--color-text);
  padding: 2cm;
}
.back-cover-content {
  margin: 2cm;
}
.front-cover.with-animated-background-gradient,
.back-cover.with-animated-background-gradient
{
  background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
  background-size: 400% 400%;
  -webkit-animation: Gradient 15s ease infinite;
  -moz-animation: Gradient 15s ease infinite;
  animation: Gradient 15s ease infinite;
}

@-webkit-keyframes Gradient {
  0% {
    background-position: 0% 50%
  }
  50% {
    background-position: 100% 50%
  }
  100% {
    background-position: 0% 50%
  }
}

@-moz-keyframes Gradient {
  0% {
    background-position: 0% 50%
  }
  50% {
    background-position: 100% 50%
  }
  100% {
    background-position: 0% 50%
  }
}

@keyframes Gradient {
  0% {
    background-position: 0% 50%
  }
  50% {
    background-position: 100% 50%
  }
  100% {
    background-position: 0% 50%
  }
}

`;
module.exports = style;