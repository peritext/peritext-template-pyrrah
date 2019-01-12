import Wrapper from './components/Wrapper';

import References from './components/References';
import Glossary from './components/Glossary';
import EndNotes from './components/EndNotes';
import Renderer from './components/Renderer';

import style from './defaultStyle';

import meta from './meta';

const components = {
  Edition: Wrapper,
  EndNotes,
  References,
  Glossary,
  Renderer,
};

export default {
  meta,
  components,
  css: style
};
