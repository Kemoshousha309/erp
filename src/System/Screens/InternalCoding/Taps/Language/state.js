export const langInitState = {
  fields: {
    lang_no: {
      fieldType: 'input',
      type: 'number',
      label: 'lang_no',
      validation: {
        required: true,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
      autoIncrement: '/public/language/nextPK',
    },
    lang_name: {
      fieldType: 'input',
      type: 'text',
      label: 'name',
      validation: {
        required: true,
        length: 50,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
    },
    lang_dir: {
      fieldType: 'select',
      type: 'number',
      label: 'lang_dir',
      validation: {
        required: true,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
    },
    report_ext: {
      fieldType: 'input',
      type: 'text',
      label: 'report_ext',
      validation: {
        required: true,
        length: 10,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
    },
    lang_ext: {
      fieldType: 'input',
      type: 'text',
      label: 'lang_ext',
      validation: {
        required: true,
        length: 10,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
    },
    lang_dfl: {
      fieldType: 'checkbox',
      type: 'checkbox',
      label: 'lang_dfl',
      writability: false,
      value: false,
    },
    active: {
      fieldType: 'checkbox',
      type: 'checkbox',
      label: 'active',
      writability: false,
      value: false,
    },
  },
  pks: ['lang_no'],
  tapTools: [], // to be deleted and view the others
  mainFields: ['lang_no', 'lang_name', 'lang_dir'],
  tapName: 'language',
  searchFields: ['lang_no'],
  urls: {
    add: 'public/language',
    modify: 'public/language',
    search: 'public/language',
    pages: 'public/language/pages',
    page: 'public/language/page',
    lastPage: 'public/language/lastPage',
    filter: 'public/language/filteredPages',
    pageNo: 'public/language/pageNo',
    delete: 'public/language',
  },
}