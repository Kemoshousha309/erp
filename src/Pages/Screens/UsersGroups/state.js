export const usersGroupInitState = {
  fields: {
    group_no: {
      fieldType: 'input',
      type: 'number',
      label: 'group_no',
      validation: {
        requiered: true,
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
        requiered: true,
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
    group_f_name: {
      fieldType: 'input',
      type: 'text',
      label: 'foreign_name',
      validation: {
        requiered: true,
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
    admin_group: {
      fieldType: 'checkbox',
      type: 'checkbox',
      label: 'management',
      writability: false,
      value: false,
    },
  },
  pks: ['group_no'],
  tapName: 'usersgroups',
  searchFields: ['group_no'],
  mainFields: [
    'group_no',
    { label: 'name', propName: 'group_d_name' },
    'admin_group',
  ],
  urls: {
    add: 'usersgroups',
    modify: 'usersgroups',
    search: 'usersgroups',
    pages: 'usersgroups/pages',
    page: 'usersgroups/page',
    lastPage: 'usersgroups/lastPage',
    filter: 'usersgroups/filteredPages',
    pageNo: 'usersgroups/pageNo',
    delete: 'usersgroups',
  },
}