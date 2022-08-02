export const provinceInitState = {
  fields: {
    province_no: {
      fieldType: 'input',
      type: 'number',
      label: 'province_no',
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
      autoIncrement: 'province/nextPK',
    },
    province_d_name: {
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
    province_f_name: {
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
      fKTable: {
        SPN: 'country',
        PN: 'country_no',
      },
      fillFields: [
        {
          recordName: 'country_no',
          stateName: 'country_no',
        },
        {
          recordName: 'country_d_name',
          stateName: 'country_no_d_name',
        },
        {
          recordName: 'country_f_name',
          stateName: 'country_no_f_name',
        },
        {
          recordName: 'region_no',
          stateName: 'region_no',
        },
        {
          recordName: 'region_no_d_name',
          stateName: 'region_no_d_name',
        },
        {
          recordName: 'region_no_f_name',
          stateName: 'region_no_f_name',
        },
      ],
    },
    country_no_name: {
      fieldType: 'input',
      label: 'name',
      readOnly: true,
      value: '',
    },

    region_no: {
      fieldType: 'input',
      label: 'region_no',
      readOnly: true,
      value: '',
    },
    region_no_name: {
      fieldType: 'input',
      label: 'name',
      readOnly: true,
      value: '',
    },
  },
  pks: ['province_no'],
  tapName: 'province',
  searchFields: ['province_no'],
  mainFields: ['province_no', 'province_d_name', 'shortcut'],
  urls: {
    add: 'province',
    modify: 'province',
    search: 'province',
    pages: 'province/pages',
    page: 'province/page',
    lastPage: 'province/lastPage',
    filter: 'province/filteredPages',
    pageNo: 'province/pageNo',
    delete: 'province',
  },
  fks: ['region_no', 'country_no'],
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
    country_no: {
      mainFields: ['country_no', 'country_d_name', 'shortcut'],
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
    },
  },
}