module.exports = {
  id: 'pyrrah',
  type: 'peritext-template',
  name: 'Pyrrah template',
  renderingTypes: [ 'paged' ],
  generatorsTypes: [ 'pdf', 'epub' ],
  summaryType: 'linear',
  options: {
    referencesScope: {
      type: 'string',
      enum: [ 'sections', 'edition' ],
      default: 'edition'
    }
  },
  defaultBibType: 'book',
  defaultAdditionalHTML: '<link href="https://fonts.googleapis.com/css?family=Source+Serif+Pro:400,600,700" rel="stylesheet">',
  defaultPlan: {
      type: 'linear',
      summary: [
          {
              type: 'frontCover',
              data: {
                animatedBackground: 'none',
                backgroundColor: '#466CA6',
                textColor: '#FFF'
              },
          },
          {
            type: 'titlePage'
          },
          {
              type: 'tableOfContents',
              data: {
                displayPageNumber: true,
                level: 0,
              }
          },
          {
              type: 'sections',
              data: {
                notesPosition: 'footnotes',
                figuresPosition: 'endOfSections',
                customSummary: {
                  active: false,
                  summary: []
                }
              }
          },
          {
              type: 'backCover',
              data: {
                backgroundColor: '#D6CFC4',
                textColor: '#FFF',
                useAbstract: true
              },
          }

      ]
  },
  summaryBlockDataTypes: {
    sections: {
      type: 'object',
      properties: {

        customSummary: {
          type: 'object',
          uiType: 'customSectionsSummary',
          properties: {
            active: {
              type: 'boolean'
            },
            summary: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  sectionId: {
                    type: 'string',
                  },
                  sectionLevel: {
                    type: 'number'
                  }
                }
              }
            }
          }
        },
        notesPosition: {
          type: 'string',
          enum: [ 'footnotes', 'endOfSections', 'endOfContents' ]
        },
        figuresPosition: {
          type: 'string',
          enum: [ 'inBody', 'endOfSections', 'endOfContents' ]
        },

      },
      default: {
        customSummary: {
          active: false,
          summary: []
        },
        notesPosition: 'footnotes'
      }
    },
    resourceSections: {
      type: 'object',
      default: {
        resourceTypes: [ 'glossary' ],
        tags: [],
        customSummary: {
          active: false,
          summary: []
        },
        notesPosition: 'footnotes',
        figuresPosition: 'inBody',
        level: 0
      },
      properties: {
        level: {
          type: 'number',
          uiType: 'select',
          enum: [ 0, 1, 2, 3, 4, 5, 6 ]
        },
        tags: {
          type: 'array',
          items: {
            type: 'string',
          },
          uiType: 'select',
          description: 'which tags to include for displaying the contents',
          enumTargetMap: 'tags',
          enumId: 'id',
          enumLabel: 'name'
        },
        resourceTypes: {
          type: 'array',
          items: {
            type: 'string',
            enum: [ 'bib', 'image', 'table', 'video', 'embed', 'webpage', 'glossary' ]
          },
          uiType: 'select',
          description: 'which types of resources to show'
        },
        customSummary: {
          type: 'object',
          uiType: 'customResourcesSummary',
          properties: {
            active: {
              type: 'boolean'
            },
            summary: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  resourceId: {
                    type: 'string',
                  },
                  level: {
                    type: 'number'
                  }
                }
              }
            }
          }
        },
        hideEmptyResources: {
          type: 'boolean',
          description: 'whether to hide resources with no contents'
        },
        displayHeader: {
          type: 'boolean',
          description: 'whether to display resources headers in their views'
        },
        notesPosition: {
          type: 'string',
          enum: [ 'footnotes', 'endOfSections' ]
        },
        figuresPosition: {
          type: 'string',
          enum: [ 'inBody', 'endOfSections', 'endOfContents' ]
        },
      }
    },
    frontCover: {
      type: 'object',
      default: {
        animatedBackground: 'none',
        backgroundColor: '#466CA6',
        textColor: '#FFF',
        customHTML: ''
      },
      properties: {
        backgroundColor: {
          type: 'string',
          uiType: 'color'
        },
        textColor: {
          type: 'string',
          uiType: 'color'
        },
        customCoverFooter: {
          type: 'string',
          longString: true
        },
        customHTML: {
          type: 'string',
          longString: true
        },
        animatedBackground: {
          type: 'string',
          description: 'animated background to use',
          enum: [ 'gradient', 'none' ]
        }
      }
    },
    titlePage: {
      type: 'object',
      default: {
      },
      properties: {
        customCoverFooter: {
          type: 'string',
          longString: true
        },
      }
    },
    colophon: {
      type: 'object',
      default: {
      },
      properties: {
        customText: {
          type: 'string',
          longString: true
        },
        copyright: {
          type: 'string'
        },
        issn: {
          type: 'string'
        },
        isbn: {
          type: 'string'
        }
      }
    },
    backCover: {
      type: 'object',
      default: {
        backgroundColor: '#D6CFC4',
        textColor: '#FFF',
        useAbstract: true,
        customHTML: ''
      },
      properties: {
        backgroundColor: {
          type: 'string',
          uiType: 'color'
        },
        textColor: {
          type: 'string',
          uiType: 'color'
        },
        useAbstract: {
          type: 'boolean'
        },
        customMarkdownContents: {
          type: 'string',
          description: 'custom content to put on this page',
          longString: true
        },
        customHTML: {
          type: 'string',
          longString: true
        },
        animatedBackground: {
          type: 'string',
          description: 'animated background to use',
          enum: [ 'gradient', 'none' ]
        },
        customCoverFooter: {
          type: 'string',
          longString: true
        },
      },

    },
    tableOfContents: {
      type: 'object',
      properties: {
        customTitle: {
          type: 'string',
          description: 'Custom title of the table of contents section'
        },
        displayPageNumber: {
          type: 'boolean',
          description: 'whether to display page number'
        },
        level: {
          type: 'number',
          enum: [ 0, 1, 2, 3, 4 ],
          description: 'level to use for displaying items in the table of contents'
        }
      },
      default: {
        displayPageNumber: true
      }

    },

    customPage: {
      type: 'object',
      default: {
        displayInTableOfContents: true,
        displayPageNumber: true,
        customHTML: '',
      },
      properties: {
        title: {
          type: 'string'
        },
        markdownContents: {
          type: 'string',
          longString: true
        },
        customHTML: {
          type: 'string',
          longString: true
        },
        customCssId: {
          type: 'string',
          description: 'custom id for this page'
        },
        displayInTableOfContents: {
          type: 'boolean',
          description: 'whether to display this content in table of contents'
        },
        displayPageNumber: {
          type: 'boolean',
          description: 'whether to display page number'
        }
      }
    },
    emptyPage: {
      type: 'object',
      properties: {
      }
    },

    references: {
      type: 'object',
      default: {
        showUncitedReferences: false,
        showMentions: true,
        showExpandedMentions: false,
        resourceTypes: [ 'bib' ],
        sortingKey: 'date',
        sortingAscending: true
      },
      properties: {
        customTitle: {
          type: 'string'
        },
        resourceTypes: {
          type: 'array',
          items: {
            type: 'string',
            enum: [ 'bib', 'image', 'table', 'video', 'embed', 'webpage' ]
          },
          uiType: 'select',
          description: 'which types of resources to show as references'
        },
        showUncitedReferences: {
          type: 'boolean',
          description: 'whether to show references which are not cited in the contents of the edition',
        },
        showMentions: {
          type: 'boolean',
          description: 'whether to show active mentions in the text for each reference',
        },
        showExpandedMentions: {
          type: 'boolean',
          description: 'whether to show expanded mentions in the text for each reference element',
        },
        groupingBy: {
          type: 'string',
          description: 'key to use for sorting references',
          enum: [ 'none', 'general', 'detailed' ]
        },
        sortingKey: {
          type: 'string',
          description: 'key to use for sorting references',
          enum: [ 'authors', 'title', 'date' ]
        },
        sortingAscending: {
          type: 'boolean',
          description: 'whether to sort references in ascending order'
        }
      }
    },

    glossary: {
      type: 'object',
      default: {
        showDescription: true,
        showMentions: true,
        showExpandedMentions: false,
        showUncited: false,
        glossaryTypes: [ 'person', 'place', 'event', 'notion', 'other' ],
        tags: []
      },
      properties: {
        customTitle: {
          type: 'string',
        },
        showDescriptions: {
          type: 'boolean',
          description: 'whether to show elements descriptions in the glossary',
        },
        showMentions: {
          type: 'boolean',
          description: 'whether to show active mentions in the text for each glossary element',
        },
        showExpandedMentions: {
          type: 'boolean',
          description: 'whether to show expanded mentions in the text for each glossary element',
        },
        glossaryTypes: {
          type: 'array',
          items: {
            type: 'string',
            enum: [ 'person', 'place', 'event', 'notion', 'other' ]
          },
          uiType: 'select',
          description: 'which types of glossary items to show'
        },
        tags: {
          type: 'array',
          items: {
            type: 'string',
          },
          uiType: 'select',
          description: 'which tags to include for displaying the contents',
          enumTargetMap: 'tags',
          enumId: 'id',
          enumLabel: 'name'
        },
        showUncited: {
          type: 'boolean',
          description: 'whether to show uncited glossary items',
        }
      }
    }
  },
};
