
const style = `

/* variable used for the template */
:root {
  --color-link-default: #99B6BD;/* bleu délavé */
  --color-link-active:#D4613E;/* rouille */
  --color-text: #4d4c4c;

  font-family:'Source serif pro', serif;
  --gutter-medium: .5cm;

  --margin-bottom: 64.8mm;
  /*--margin-bottom: 33mm;*/
  --margin-top: 33mm;
  --margin-outside: 45.8mm;
  --margin-inside: 23.3mm;

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
  margin-top: var(--margin-top);
  margin-bottom: 33mm;;
  margin-left: 45.8mm;
  margin-right: var(--margin-inside);
  
  @top-left{
  }
  @top-left-corner {

  }
}

@page colophon:right {
  margin-top: var(--margin-top);
  margin-bottom: 33mm;;
  margin-right: 45.8mm;
  margin-left: var(--margin-inside);
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
  @bottom-center {
    content: counter(page);
    text-align: center;
  }
}
@page table-of-contents-wpnumber:right {
  @bottom-center {
    content: counter(page);
    text-align: center;
  }
}
@page custom-page {
}
@page custom-page-wpnumber:left {
  @bottom-center {
    content: counter(page);
    text-align: center;
  }
}
@page custom-page-wpnumber:right {
  @bottom-center {
    content: counter(page);
    text-align: center;
  }
}

@page section{

}

@page section:left {
  margin-top: var(--margin-top);
  margin-bottom: 33mm;;
  margin-left: 45.8mm;
  margin-right: var(--margin-inside);
  @top-center{
    content: element(publicationTitle);
  }
  @bottom-center {
    content: counter(page);
    text-align: center;
  }
}

@page section:right {
  margin-top: var(--margin-top);
  margin-bottom: 33mm;;
  margin-right: 45.8mm;
  margin-left: var(--margin-inside);
  @bottom-center{
    content: counter(page);
    text-align: center;
  }
  @top-center {
     content: element(sectionTitle);
  }
}

@page peritext{

}

@page peritext:left {
  margin-top: var(--margin-top);
  margin-bottom: 33mm;;
  margin-left: 45.8mm;
  margin-right: var(--margin-inside);
  @top-left{
    content: element(publicationTitle);
  }
  @bottom-center {
    content: counter(page);
    text-align: center;
  }
}

@page peritext:right {
  margin-top: var(--margin-top);
  margin-bottom: 33mm;;
  margin-right: 45.8mm;
  margin-left: var(--margin-inside);
  @bottom-center {
    content: counter(page);
    text-align: center;
  }
  @top-right {
  }
}
@page section:first{
  @top-center {
     content: none;
  }
}

@page end-figures:left {
  margin-top: var(--margin-top);
  margin-bottom: 33mm;;
  margin-left: 48mm;
  /* margin-left: 45.8mm;*/
  margin-right: var(--margin-inside);
  margin-left: 5mm;
  background: whitesmoke;
  @bottom-center {
    content: counter(page);
    text-align: center;
  }
}

@page end-figures:right {
  margin-top: var(--margin-top);
  margin-bottom: 33mm;;
  /* margin-right: 45.8mm;*/
  margin-right: 48mm;
  margin-left: var(--margin-inside);
  margin-right: 5mm;
  background: whitesmoke;
  @bottom-center {
    content: counter(page);
    text-align: center;
  }
  @top-right {
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
.front-cover.has-custom-html {
  page: cover-custom;
}
@page cover-custom {
  padding: 0;
  margin: 0;
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
.back-cover.has-custom-html {
  page: cover-custom;
}
.empty-page{
  page: empty-page;
}

.table-of-contents{
  page: table-of-contents;
  page-break-before: left;
}
.table-of-contents.has-page-number{
  page: table-of-contents-wpnumber;
  page-break-before: left;
}

.custom-page{
  page: custom-page;
  page-break-before: always;
}
.custom-page.has-custom-html {
  page: cover-custom;
}
.section{
  page: section;
  page-break-before: right;
}
.section.resource-section{
  page-break-before: never;
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

.end-figures{
  page: end-figures;
  page-break-before: always;
}
/*
.end-figures-title {
  padding-left : calc(45.8mm - 5mm);
}
*/

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
  // color: var(--color-link-default);
  color: inherit;
}
.page-link::after{
  content: target-counter(attr(href), page);
}
.publication-title-running{
  position: running(publicationTitle); 
  font-style: normal;
  font-variant: small-caps;
}
.section-title-running{
  position: running(sectionTitle); 
  font-style: normal;
  font-variant: small-caps;
}

.composition-block-title{
  font-weight: 800;
  font-size: 40px;
}

/**
 * Prevent overflow bugs
 */
/*
.csl-entry a{
  word-break: break-all;
}
*/

/* lists */
.mentions-container{
  padding: 0;
}
.mention-item{
  list-style-type: none;
  padding: 0;
  margin-bottom: var(--gutter-medium);
  page-break-inside: avoid;
}
/* .mention-item .title{} */

.glossary .mention-item .title{
  font-weight: 800;
}
/* .mention-item .description {} */
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
  hyphens: auto;
  orphans: 3;
  widows: 3;
  text-align: justify;
  line-height: 1.4;
}
.rendered-content .unstyled:first-of-type {
  text-indent: 0;
}

.rendered-content h1,
.rendered-content h2,
.rendered-content h3,
.rendered-content h4
{
  page-break-after: avoid;
  break-after: avoid;
  page-break-inside: avoid;
  widows: 3;
  orphans: 3;
  hyphens: none;
} 

.rendered-content h1 + .unstyled,
.rendered-content h2 + .unstyled,
.rendered-content h3 + .unstyled,
.rendered-content h4 + .unstyled
{
  orphans: 4;
} 

.rendered-content blockquote {
  page-break-before: avoid;
  widows: 3;
  orphans: 3;
  hyphens: auto;
  line-height: 1.4;
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

/*.footnote-area .footnote{}*/
.footnote-break {
  opacity: 0;
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
  page-break-inside: avoid;
}
.block-contextualization-container .figure-caption{
  padding-top: calc(.5 * var(--gutter-medium));
}
.block-contextualization-container .figure-title{
  margin: 0;
  font-weight: normal;
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
.block-contextualization-container .figure-caption .authors,
.block-contextualization-container .figure-caption .source {
  font-style: italic;
  font-size: .8em;
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
  max-height: 100%;
  max-height: 10.5cm;
  background: white;
}
.block-contextualization-container.vegaLite img {
  max-height: 12.5cm;
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
 * Aside figures
 */
.section.has-figures-position-endOfSections .section-contents-container .block-contextualization-container,
.section.has-figures-position-endOfContents .section-contents-container .block-contextualization-container
{
  position: absolute;
}
.pagedjs_left_page .section.has-figures-position-endOfSections .section-contents-container .block-contextualization-container,
.pagedjs_left_page .section.has-figures-position-endOfContents .section-contents-container .block-contextualization-container
{
left: -4cm;
}


.pagedjs_right_page .section.has-figures-position-endOfSections .section-contents-container .block-contextualization-container,
.pagedjs_right_page .section.has-figures-position-endOfContents .section-contents-container .block-contextualization-container
{
right: -4cm;
}

.section.has-figures-position-endOfSections .section-contents-container .block-contextualization-container img,
.section.has-figures-position-endOfContents .section-contents-container .block-contextualization-container img
{
  max-width: 3cm;
}

.section.has-figures-position-endOfSections .section-contents-container .block-contextualization-container .specific-image-container:not(:first-of-type),
.section.has-figures-position-endOfContents .section-contents-container .block-contextualization-container .specific-image-container:not(:first-of-type)
{
  display: none
}

.block-contextualization-placeholder{
  background: lightgrey;
  width: 3cm;
  height: 2cm;
}

/**
 * End figures
 */
.figures-list{
  list-style: none;
  padding: 0;
}
.figures-list .end-figure-container{
  margin-bottom: calc(2 * var(--gutter-medium));
}

.figures-list .end-figure-container figure:not(.table):not(.vegaLite) {
  display: flex;
  flex-flow: row nowrap;
}

.figures-list .end-figure-container figure figcaption {
  overflow: hidden;
}
.figures-list .end-figure-container figure .source {
  word-break: break-word;
}
.figures-list .end-figure-container:nth-child(even) figure:not(.table):not(.vegaLite) {
  flex-direction: row-reverse;
}
.figures-list .end-figure-container:nth-child(odd) figure:not(.table):not(.vegaLite) figcaption {
  padding-left: 1rem;
}
.figures-list .end-figure-container:nth-child(even) figure:not(.table):not(.vegaLite) figcaption {
  padding-right: 1rem;
}

.figures-list .end-figure-container figure:not(.table) figcaption {
  max-width: 30%;
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

.block-contextualization-container.table table {
  border-left: 1px solid black;
  border-top: 1px solid black;
  background: white;
}

.block-contextualization-container table th {
  padding: 10px;
}

.block-contextualization-container.table table th,
.block-contextualization-container.table table tr
 {
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    font-size: 12px;
}
.block-contextualization-container.table table tbody th{
  font-weight: 400;
}

.block-contextualization-container.bib .figure-caption{
  display: none;
}
cite{
  font-style: inherit;
}

/* images */
.block-contextualization-container.image .static-images-container{
  display: flex;
  flex-flow: row wrap;
  // justify-content: center;
}
.block-contextualization-container.image:not(.pagedjs_no-page-overflow-y) .static-images-container.multiple-images{
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  display: grid;
}

.specific-image-container {
  max-height: 9.5cm;
  flex: 1;
}
.specific-image-container:not(:last-of-type) {
  padding-right: 10px;
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
.inline-images-container {
  padding-left: .3rem;
  page-break-before: avoid;
}
.inline-images-container img {
  max-width: 2rem;
  max-height: .9rem;
  padding-right: 0;
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
.block-contextualization-container.vegaLite img {
  background: white;
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
  // color: var(--color-link-active);
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
.front-cover svg {}
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
  // color: var(--color-link-active);
  font-size: 16px;
}
.back-cover .back-cover-text{
  max-height: 60%;
}
.back-cover .back-cover-footer{
  font-style: italic;
}

/* references view components */
.reference-type-title {
  page-break-after: avoid;
}

/* toc views components */
.table-of-contents .table-of-contents-elements-container{
  padding: 0;
}
.table-of-contents .table-of-contents-element{
  list-style-type: none;
  margin: 0;
  font-size: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: flex-end;
  box-sizing: border-box;
  width: 100%;
  page-break-inside: avoid;
}
.table-of-contents .table-of-contents-element .element-title
{
  overflow: hidden;
  flex: 1;
}


.table-of-contents .table-of-contents-element .element-leading{
  flex: 1;
  content: " ";
  border-bottom: 1px dashed var(--color-text);
  position: absolute;
  width: 100%;
  bottom: 0.5rem;
  margin-left: 0.5rem;
}

.table-of-contents .table-of-contents-element .element-title,
.table-of-contents .table-of-contents-element .page-link
{
   position: relative;
   top: .25em;
}
.table-of-contents .table-of-contents-element .page-link{
  text-align: right;
  min-width: 25px;
}
.table-of-contents .table-of-contents-element.level-0{
  font-weight: 800;
  font-size: 1.5rem;
  page-break-after: avoid;
}
.table-of-contents-element.level-0:not(:first-of-type) {
 margin-top: 1rem;
}


.table-of-contents-element.level-0 + .level-1,
.table-of-contents-element.level-1 + .level-2,
.table-of-contents-element.level-2 + .level-3,
.table-of-contents-element.level-3 + .level-4
 {
 margin-top: .3em; 
}
.table-of-contents-element.level-1 + .table-of-contents-element.level-0,
.table-of-contents-element.level-2 + .table-of-contents-element.level-1,
.table-of-contents-element.level-3 + .table-of-contents-element.level-2,
.table-of-contents-element.level-4 + .table-of-contents-element.level-3
 {
 margin-top: .7em; 
}
.table-of-contents-element.level-1 + .table-of-contents-element.level-0,
.table-of-contents-element.level-2 + .table-of-contents-element.level-1
{
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.table-of-contents .table-of-contents-element.level-2 {
  font-size: .95em;
}

.table-of-contents .table-of-contents-element.level-3 {
  font-size: .9em;
}

.table-of-contents .table-of-contents-element.level-4,
.table-of-contents .table-of-contents-element.level-5,
.table-of-contents .table-of-contents-element.level-6,
.table-of-contents .table-of-contents-element.level-7,
.table-of-contents .table-of-contents-element.level-8 {
  font-size: .85em;
}

.table-of-contents .table-of-contents-element.level-1{
  padding-left: calc(.4 * var(--gutter-medium)); 
}
.table-of-contents .table-of-contents-element.level-2{
  padding-left: calc(.8 * var(--gutter-medium)); 
  
}
.table-of-contents .table-of-contents-element.level-3{
  padding-left: calc(1.4 * var(--gutter-medium)); 
}
.table-of-contents .table-of-contents-element.level-4{
  padding-left: calc(1.8 * var(--gutter-medium)); 
  
}
.table-of-contents .table-of-contents-element.level-5{
  padding-left: calc(2.2 * var(--gutter-medium)); 
  
}
.table-of-contents .table-of-contents-element.level-6{
  padding-left: calc(2.6 * var(--gutter-medium)); 
}

.table-of-contents .table-of-contents-element .element-leading,
.table-of-contents .table-of-contents-element .page-link {
  font-size: 1rem;
  font-weight: 400;
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

.footnote-ref{
  page-break-after: avoid;
  page-break-before: avoid;
  page-break-inside: avoid;
}

.section-title,
.composition-block-title{
  bookmark-label: content(text);
  bookmark-level: 1;
}
.section.level-2 .section-title {
  bookmark-level: 2;
}
.section.level-3 .section-title {
  bookmark-level: 3;
}
.section.level-4 .section-title {
  bookmark-level: 4;
}
.section.level-5 .section-title {
  bookmark-level: 5;
}
.section.level-6 .section-title {
  bookmark-level: 6;
}

.resource-section .section-title{
  margin-top: 0;
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
  // background: white;
  // var(--color-text);
  color: white;
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
