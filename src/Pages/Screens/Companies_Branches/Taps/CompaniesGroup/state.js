export const companiesGroupInitState = {
  fields: {
    group_no: {
      fieldType: 'input',
      type: 'number',
      label: 'group_no',
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
      autoIncrement: 'companyGroup/nextPK',
    },
    group_d_name: {
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
    group_f_name: {
      fieldType: 'input',
      type: 'text',
      label: 'foreign_name',
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
  },
  pks: ['group_no'],
  mode: 'start',
  mainFields: ['group_no', 'group_d_name'],
  tapName: 'companyGroup',
  searchFields: ['group_no'],
  urls: {
    add: 'companyGroup',
    modify: 'companyGroup',
    search: 'companyGroup',
    pages: 'companyGroup/pages',
    page: 'companyGroup/page',
    lastPage: 'companyGroup/lastPage',
    filter: 'companyGroup/filteredPages',
    pageNo: 'companyGroup/pageNo',
    delete: 'companyGroup',
  },
}