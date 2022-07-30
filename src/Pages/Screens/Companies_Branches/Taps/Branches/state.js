export const branchesInitState = {
  fields: {
    company_no: {
      fieldType: 'input',
      type: 'text',
      label: 'company_no',
      validation: {
        requiered: true,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
      fillFields: [
        {
          recordName: 'company_no',
          stateName: 'company_no',
        },
        {
          recordName: 'company_d_name',
          stateName: 'company_d_name',
        },
        {
          recordName: 'company_f_name',
          stateName: 'company_f_name',
        },
      ],
    },
    company_name: {
      fieldType: 'input',
      label: 'name',
      readOnly: true,
      value: '',
    },
    branch_no: {
      fieldType: 'input',
      type: 'number',
      label: 'branch_no',
      validation: {
        requiered: true,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
      autoIncrement: 'branches/nextPK',
    },
    branch_d_name: {
      fieldType: 'input',
      type: 'text',
      label: 'name',
      validation: {
        requiered: true,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
    },
    branch_f_name: {
      fieldType: 'input',
      type: 'text',
      label: 'foreign_name',
      validation: {
        requiered: false,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
    },
    shortcut_d: {
      fieldType: 'input',
      type: 'text',
      label: 'shortcut',
      validation: {
        requiered: true,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
    },
    shortcut_f: {
      fieldType: 'input',
      type: 'text',
      label: 'foreign_shortcut',
      validation: {
        requiered: false,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
    },
    logo: {
      fieldType: 'file',
      type: 'file',
      label: 'logo',
      validation: {
        requiered: true,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
    },
    line: {
      fieldType: 'line',
    },
    line1: {
      fieldType: 'line',
    },
    branch_d_address: {
      fieldType: 'input',
      type: 'text',
      label: 'address',
      validation: {
        requiered: true,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
    },
    branch_f_address: {
      fieldType: 'input',
      type: 'text',
      label: 'address_f',
      validation: {
        requiered: false,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
    },
    report_d_header1: {
      fieldType: 'input',
      type: 'text',
      label: 'report_header1',
      validation: {
        requiered: false,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
    },
    report_f_header1: {
      fieldType: 'input',
      type: 'text',
      label: 'report_header_f1',
      validation: {
        requiered: false,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
    },
    report_d_header2: {
      fieldType: 'input',
      type: 'text',
      label: 'report_header2',
      validation: {
        requiered: false,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
    },
    report_f_header2: {
      fieldType: 'input',
      type: 'text',
      label: 'report_header_f2',
      validation: {
        requiered: false,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
    },
    report_d_header3: {
      fieldType: 'input',
      type: 'text',
      label: 'report_header3',
      validation: {
        requiered: false,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
    },
    report_f_header3: {
      fieldType: 'input',
      type: 'text',
      label: 'report_header_f3',
      validation: {
        requiered: false,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
    },
    tax_no: {
      fieldType: 'input',
      type: 'number',
      label: 'tax_no',
      validation: {
        requiered: false,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
    },
    telephone_no: {
      fieldType: 'input',
      type: 'number',
      label: 'telephone_no',
      validation: {
        requiered: false,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
    },
    cr_no: {
      fieldType: 'input',
      type: 'number',
      label: 'cr_no',
      validation: {
        requiered: false,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
    },
    holder2: {
      fieldType: 'holder',
    },
    city_no: {
      fieldType: 'input',
      type: 'number',
      label: 'city_no',
      validation: {
        requiered: false,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
      fillFields: [
        { recordName: 'city_no', stateName: 'city_no' },
        { recordName: 'city_d_name', stateName: 'city_d_name' },
        { recordName: 'city_f_name', stateName: 'city_f_name' },
        { recordName: 'province_no', stateName: 'province_no' },
        { recordName: 'province_no_d_name', stateName: 'province_d_name' },
        { recordName: 'province_no_f_name', stateName: 'province_f_name' },
        { recordName: 'country_no', stateName: 'country_no' },
        { recordName: 'country_no_d_name', stateName: 'country_d_name' },
        { recordName: 'country_no_f_name', stateName: 'country_f_name' },
      ],
    },
    city_name: {
      fieldType: 'input',
      label: 'name',
      readOnly: true,
      value: '',
    },
    province_no: {
      fieldType: 'input',
      label: 'province_no',
      readOnly: true,
      value: '',
    },
    province_name: {
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
    country_name: {
      fieldType: 'input',
      label: 'name',
      readOnly: true,
      value: '',
    },
  },
  searchFields: ['branch_no'],
  pks: ['branch_no'],
  tapName: 'branches',
  mainFields: [
    'branch_no',
    'branch_d_name',
    { propName: { d: 'shortcut_d', f: 'shortcut_f' }, label: 'shortcut' },
  ],
  urls: {
    add: 'branches',
    modify: 'branches',
    search: 'branches',
    pages: 'branches/pages',
    page: 'branches/page',
    lastPage: 'branches/lastPage',
    filter: 'branches/filteredPages',
    pageNo: 'branches/pageNo',
    delete: 'branches',
  },
  fks: ['company_no', 'city_no'],
  fkList: {
    company_no: {
      mainFields: [
        'company_no',
        'company_d_name',
        {
          propName: { d: 'shortcut_d', f: 'shortcut_f' },
          label: 'shortcut',
        },
      ],
      urls: {
        add: 'company',
        modify: 'company',
        search: 'company',
        pages: 'company/pages',
        page: 'company/page',
        lastPage: 'company/lastPage',
        filter: 'company/filteredPages',
        pageNo: 'company/pageNo',
        delete: 'company',
      },
    },
    city_no: {
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
    },
  },
}