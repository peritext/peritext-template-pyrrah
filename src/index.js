import Wrapper from './components/Wrapper';

import References from './components/References';
import Glossary from './components/Glossary';
import EndNotes from './components/EndNotes';

import style from './defaultStyle';

import meta from './meta';

const components = {
  Edition: Wrapper,
  EndNotes,
  References,
  Glossary,
};

export default {
  meta,
  components,
  css: style
};
