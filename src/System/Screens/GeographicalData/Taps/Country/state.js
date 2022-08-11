export const countryInitState = {
  fields: {
    country_no: {
      fieldType: 'input',
      type: 'number',
      label: 'country_no',
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
      autoIncrement: 'country/nextPK',
    },
    country_d_name: {
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
    country_f_name: {
      fieldType: 'input',
      type: 'text',
      label: 'foreign_name',
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
    shortcut: {
      fieldType: 'input',
      type: 'text',
      label: 'shortcut',
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

    region_no: {
      fieldType: 'input',
      type: 'number',
      label: 'region_no',
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
      fKTable: {
        SPN: 'region',
        PN: 'region_no',
      },
      fillFields: [
        {
          recordName: 'region_no',
          stateName: 'region_no',
        },
        {
          recordName: 'region_d_name',
          stateName: 'region_no_d_name',
        },
        {
          recordName: 'region_f_name',
          stateName: 'region_no_f_name',
        },
      ],
    },
    region_no_name: {
      fieldType: 'input',
      label: 'name',
      readOnly: true,
      value: '',
    },
  },
  pks: ['country_no'],
  tapTools: [], // to be deleted and view the others
  mainFields: ['country_no', 'country_d_name', 'shortcut'],
  tapName: 'country',
  searchFields: ['country_no'],
  urls: {
    add: 'country',
    modify: 'country',
    search: 'country',
    pages: 'country/pages',
    page: 'country/page',
    lastPage: 'country/lastPage',
    filter: 'country/filteredPages',
    pageNo: 'country/pageNo',
    delete: 'country',
  },
  fks: ['region_no'],
  fkList: {
    region_no: {
      mainFields: ['region_no', 'region_d_name', 'shortcut'],
      urls: {
        add: 'region',
        modify: 'region',
        search: 'region',
        pages: 'region/pages',
        page: 'region/page',
        lastPage: 'region/lastPage',
        filter: 'region/filteredPages',
        pageNo: 'region/pageNo',
        delete: 'region',
      },
    },
  },
}