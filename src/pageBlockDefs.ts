export type PageBlockOption = {
  label: string;
  value: string;
};
export type PageBlockItemFields = {
  html?: string; // convert to markdown1
  html1?: string; // convert to markdown1
  html2?: string; // convert to markdown2
  text?: string; // convert to markdown1
  photo?: string;
  align?: string;
  tcol?: string;
  headline?: string;
  button_text?: string;
  button_link?: string;
  gallery_slug?: string;
  headlines?: string;
  subheadline?: string;
  num_show?: string;
  slug?: string;
  photo1?: string;
  photo2?: string;
  photo3?: string;
  sm_name?: string;
  sm_phone?: string;
  sm_email?: string;
  asm_name?: string;
  asm_phone?: string;
  asm_email?: string;
  comm_chair?: string;
  spaces?: string;
};
export type PageBlockField = {
  label: string;
  slug: string;
  type: string;
  colsize: number;
  options?: PageBlockOption[];
};
export type PageBlock = {
  slug: string;
  title: string;
  fields: PageBlockField[];
};

export const pageBlocks: PageBlock[] = [
  {
    slug: '1-col',
    title: '1 Column Text (Contained)',
    fields: [
      {
        label: '',
        slug: 'html',
        type: 'markdownarea',
        colsize: 12
      }
    ]
  },
  {
    slug: '2-col',
    title: '2 Column Text (Contained)',
    fields: [
      {
        label: 'Left',
        slug: 'html1',
        type: 'markdownarea',
        colsize: 12
      },
      {
        label: 'Right',
        slug: 'html2',
        type: 'markdownarea',
        colsize: 12
      }
    ]
  },
  {
    slug: '2-col-photo',
    title: '2 Column Text with Photo',
    fields: [
      {
        label: '',
        slug: 'html',
        type: 'markdownarea',
        colsize: 12
      },
      {
        label: 'Image',
        slug: 'photo',
        type: 'image',
        colsize: 12
      },
      {
        label: 'Text Alignment',
        slug: 'align',
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' }
        ],
        colsize: 6
      },
      {
        label: 'Text on Left or Right',
        slug: 'tcol',
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Right', value: 'right' }
        ],
        colsize: 6
      }
    ]
  },
  {
    slug: 'cta-one',
    title: 'Call to action',
    fields: [
      {
        label: 'Headline',
        slug: 'headline',
        type: 'text',
        colsize: 12
      },
      {
        label: 'Sub-Headline',
        slug: 'text',
        type: 'markdownarea',
        colsize: 12
      },
      {
        label: 'Button Text',
        slug: 'button_text',
        type: 'text',
        colsize: 6
      },
      {
        label: 'Button Link',
        slug: 'button_link',
        type: 'text',
        colsize: 6
      }
    ]
  },
  {
    slug: 'header-slider',
    title: 'Header - Slider',
    fields: [
      {
        label: 'Gallery Slug',
        slug: 'gallery_slug',
        type: 'text',
        colsize: 6
      },
      {
        label: 'Headlines (1 per line)',
        slug: 'headlines',
        type: 'markdownarea',
        colsize: 6
      }
    ]
  },
  {
    slug: 'header-static',
    title: 'Header - Static',
    fields: [
      {
        label: 'Headline',
        slug: 'headline',
        type: 'text',
        colsize: 6
      },
      {
        label: 'Sub-Headline',
        slug: 'subheadline',
        type: 'text',
        colsize: 6
      },
      {
        label: 'Image',
        slug: 'photo',
        type: 'image',
        colsize: 12
      }
    ]
  },
  {
    slug: 'calendar',
    title: 'Calendar',
    fields: [
      {
        label: 'Number of Events to Show (0 = show all)',
        slug: 'num_show',
        type: 'text',
        colsize: 12
      }
    ]
  },
  {
    slug: 'announcements',
    title: 'Announcements',
    fields: [
      {
        label: 'Number of Announcements to Show (0 = show all)',
        slug: 'num_show',
        type: 'text',
        colsize: 12
      }
    ]
  },
  {
    slug: 'pull-quote',
    title: 'Pull Quote',
    fields: [
      {
        label: '',
        slug: 'headline',
        type: 'text',
        colsize: 12
      },
      {
        label: 'Image (leave blank for color)',
        slug: 'photo',
        type: 'image',
        colsize: 12
      }
    ]
  },
  // {
  //   slug: 'contact-form',
  //   title: 'Contact Form',
  //   fields: []
  // },
  {
    slug: 'gallery',
    title: 'Image Gallery',
    fields: [
      {
        label: 'Gallery Slug',
        slug: 'slug',
        type: 'text',
        colsize: 12
      }
    ]
  },
  {
    slug: 'img-full',
    title: 'Full-Width Image',
    fields: [
      {
        label: '',
        slug: 'photo',
        type: 'image',
        colsize: 12
      }
    ]
  },
  {
    slug: 'img-grid-1',
    title: 'Image Grid 1',
    fields: [
      {
        label: 'Image 1 (Horizontal)',
        slug: 'photo1',
        type: 'image',
        colsize: 12
      },
      {
        label: 'Image 1 (Square)',
        slug: 'photo2',
        type: 'image',
        colsize: 12
      },
      {
        label: 'Image 3 (Square)',
        slug: 'photo3',
        type: 'image',
        colsize: 12
      }
    ]
  },
  {
    slug: 'contact-list',
    title: 'Contacts: Adult Leadership',
    fields: [
      {
        label: 'Scoutmaster Name',
        slug: 'sm_name',
        type: 'text',
        colsize: 4
      },
      {
        label: 'Scoutmaster Phone',
        slug: 'sm_phone',
        type: 'text',
        colsize: 4
      },
      {
        label: 'Scoutmaster Email',
        slug: 'sm_email',
        type: 'text',
        colsize: 4
      },
      {
        label: 'Asst. Scoutmaster Name',
        slug: 'asm_name',
        type: 'text',
        colsize: 4
      },
      {
        label: 'Asst. Scoutmaster Phone',
        slug: 'asm_phone',
        type: 'text',
        colsize: 4
      },
      {
        label: 'Asst. Scoutmaster Email',
        slug: 'asm_email',
        type: 'text',
        colsize: 4
      },
      {
        label: 'Committe Chair',
        slug: 'comm_chair',
        type: 'text',
        colsize: 4
      },
      {
        label: 'Committe Chair',
        slug: 'comm_chair',
        type: 'text',
        colsize: 4
      }
    ]
  },
  {
    slug: 'galleries-list',
    title: 'Galleries List',
    fields: []
  },
  {
    slug: 'contact-form',
    title: 'Contact Form',
    fields: []
  },
  {
    slug: 'spacer',
    title: 'Spacer',
    fields: [
      {
        label: 'Vertical Spacing',
        slug: 'spaces',
        type: 'text',
        colsize: 12
      }
    ]
  }
];
