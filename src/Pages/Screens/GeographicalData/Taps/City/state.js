export const cityInitState = {
  fields: {
    city_no: {
      fieldType: 'input',
      type: 'number',
      label: 'city_no',
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
      autoIncrement: 'city/nextPK',
    },
    city_d_name: {
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
    city_f_name: {
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
      fKTable: {
        SPN: 'province',
        PN: 'province_no',
      },
      fillFields: [
        {
          recordName: 'province_no',
          stateName: 'province_no',
        },
        {
          recordName: 'province_d_name',
          stateName: 'province_no_d_name',
        },
        {
          recordName: 'province_f_name',
          stateName: 'province_no_f_name',
        },
        {
          recordName: 'country_no',
          stateName: 'country_no',
        },
        {
          recordName: 'country_no_d_name',
          stateName: 'country_no_d_name',
        },
        {
          recordName: 'country_no_f_name',
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
    province_no_name: {
      fieldType: 'input',
      label: 'name',
      readOnly: true,
      value: '',
    },

    country_no: {
      fieldType: 'input',
      label: 'country_no',
      readOnly: true,
      value: '',
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
  pks: ['city_no'],
  tapTools: [], // to be deleted and view the others
  tapName: 'city',
  searchFields: ['city_no'],
  mainFields: ['city_no', 'city_d_name', 'shortcut'],
  urls: {
    add: 'city',
    modify: 'city',
    search: 'city',
    pages: 'city/pages',
    page: 'city/page',
    lastPage: 'city/lastPage',
    filter: 'city/filteredPages',
    pageNo: 'city/pageNo',
    delete: 'city',
  },
  fks: ['region_no', 'country_no', 'province_no'],
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
    province_no: {
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
    },
  },
}