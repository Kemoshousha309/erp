export const costCenterGroupInitState = {
  fields: {
    group_no: {
      fieldType: 'input',
      type: 'number',
      label: 'group_no',
      validation: {
        required: true,
        size: 2147483647,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: '',
    },
    group_d_name: {
      fieldType: 'input',
      type: 'text',
      label: 'name',
      validation: {
        required: true,
        length: 100,
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
        length: 100,
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
  tapName: 'costcentergroup',
  searchFields: ['group_no'],
  mainFields: ['group_no', { label: 'name', propName: 'group_d_name' }],
  urls: {
    add: 'costcentergroup',
    modify: 'costcentergroup',
    search: 'costcentergroup',
    pages: 'costcentergroup/pages',
    page: 'costcentergroup/page',
    lastPage: 'costcentergroup/lastPage',
    filter: 'costcentergroup/filteredPages',
    pageNo: 'costcentergroup/pageNo',
    delete: 'costcentergroup',
    preAdd: 'costcentergroup/preAdd',
    preModify: 'costcentergroup/preModify',
  },
  preAdd: {
    state: true,
    content: null,
  },
  preModify: {
    state: true,
    content: null,
  },
}