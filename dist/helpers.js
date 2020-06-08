"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildFiguresNumberMap = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const parseEligibleContextualizations = (production, contents) => Object.keys(contents.entityMap || {}).reduce((res2, entityKey) => {
  const entity = contents.entityMap[entityKey];

  if (['BLOCK_ASSET', 'INLINE_ASSET'].includes(entity.type)) {
    const contextualizationId = entity.data.asset.id;
    const contextualization = production.contextualizations[contextualizationId];
    const contextualizer = production.contextualizers[contextualization.contextualizerId];

    if (['image', 'video', 'embed', 'table', 'vegaLite'].includes(contextualizer.type)) {
      if (!(contextualizer.type === 'video' && entity.type === 'INLINE_ASSET')) {
        return [...res2, contextualizationId];
      }
    }
  }

  return res2;
}, []);

const buildFiguresNumberMap = ({
  production,
  sectionsIds,
  figuresPosition
}) => {
  if (figuresPosition === 'endOfContents') {
    const contextualizations = sectionsIds.filter(sectionId => production.resources[sectionId]).reduce((res, sectionId) => {
      const contents = production.resources[sectionId].data.contents;
      const mainContents = contents.contents;
      return [...res, ...parseEligibleContextualizations(production, mainContents), ...contents.notesOrder.reduce((res2, noteId) => {
        const noteContents = contents.notes[noteId];
        return [...res2, ...parseEligibleContextualizations(production, noteContents)];
      }, [])];
    }, []);
    const figuresNumberMap = contextualizations.reduce((res, contextualizationId, index) => _objectSpread({}, res, {
      [contextualizationId]: index + 1
    }), {});
    const figures = Object.keys(figuresNumberMap).sort((c1, c2) => {
      const n1 = figuresNumberMap[c1];
      const n2 = figuresNumberMap[c2];

      if (n1 < n2) {
        return -1;
      } else return 1;
    }).map(contextualizationId => {
      return {
        contextualizationId,
        order: figuresNumberMap[contextualizationId]
      };
    });
    return {
      figuresNumberMap,
      figures
    };
  } else if (figuresPosition === 'endOfSections') {
    const figures = {};
    const figuresNumberMap = sectionsIds.filter(sectionId => production.resources[sectionId]).reduce((res, sectionId) => {
      const contents = production.resources[sectionId].data.contents;
      const mainContents = contents.contents;
      const contextualizations = [...parseEligibleContextualizations(production, mainContents), ...contents.notesOrder.reduce((res2, noteId) => {
        const noteContents = contents.notes[noteId];
        return [...res2, ...parseEligibleContextualizations(production, noteContents)];
      }, [])];
      const sectionOrderMap = contextualizations.reduce((res2, contextualizationId, index) => _objectSpread({}, res2, {
        [contextualizationId]: index + 1
      }), {});
      figures[sectionId] = Object.keys(sectionOrderMap).sort((c1, c2) => {
        const n1 = sectionOrderMap[c1];
        const n2 = sectionOrderMap[c2];

        if (n1 < n2) {
          return -1;
        } else return 1;
      }).map(contextualizationId => {
        return {
          contextualizationId,
          order: sectionOrderMap[contextualizationId]
        };
      });
      return _objectSpread({}, res, {}, sectionOrderMap);
    }, {});
    return {
      figuresNumberMap,
      figures
    };
  }

  return {};
};

exports.buildFiguresNumberMap = buildFiguresNumberMap;