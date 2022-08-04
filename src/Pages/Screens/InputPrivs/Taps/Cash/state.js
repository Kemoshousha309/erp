export const costCenterPrivInitState = {
  fields: {
    from_cash_no: {
      fieldType: 'input',
      type: 'number',
      label: 'from_cash_no',
      validation: {
        length: 11,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: true,
      controlField: true,
      value: '',
      fillFields: [{ recordName: 'cash_no', stateName: 'from_cash_no' }],
    },
    to_cash_no: {
      fieldType: 'input',
      type: 'number',
      label: 'to',
      validation: {
        length: 30,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: true,
      controlField: true,
      value: '',
      fillFields: [{ recordName: 'cash_no', stateName: 'to_cash_no' }],
    },
    from_user_id: {
      fieldType: 'input',
      type: 'number',
      label: 'from_user_id',
      validation: {
        length: 30,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: true,
      controlField: true,
      value: '',
      fillFields: [{ recordName: 'user_id', stateName: 'from_user_id' }],
    },
    to_user_id: {
      fieldType: 'input',
      type: 'number',
      label: 'to',
      validation: {
        length: 30,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: true,
      controlField: true,
      value: '',
      fillFields: [{ recordName: 'user_id', stateName: 'to_user_id' }],
    },
    group_no: {
      fieldType: 'input',
      type: 'number',
      label: 'group_no',
      validation: {
        length: 30,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: true,
      controlField: true,
      value: '',
      fillFields: [{ recordName: 'group_no', stateName: 'group_no' }],
    },
  },
  fks: [
    'from_cash_no',
    'to_cash_no',
    'from_user_id',
    'to_user_id',
    'group_no',
  ],
  fkList: {
    from_cash_no: {
      mainFields: ["cash_no", { label: "name", propName: "cash_d_name" }],
      urls: {
        add: "cash",
        modify: "cash",
        search: "cash",
        pages: "cash/pages",
        page: "cash/page",
        lastPage: "cash/lastPage",
        filter: "cash/filteredPages",
        pageNo: "cash/pageNo",
        delete: "cash",
        preAdd: "cash/preAdd",
      },
    },
    to_cash_no: {
      mainFields: ["cash_no", { label: "name", propName: "cash_d_name" }],
      urls: {
        add: "cash",
        modify: "cash",
        search: "cash",
        pages: "cash/pages",
        page: "cash/page",
        lastPage: "cash/lastPage",
        filter: "cash/filteredPages",
        pageNo: "cash/pageNo",
        delete: "cash",
        preAdd: "cash/preAdd",
      },
    },
    from_user_id: {
      mainFields: [
        { label: 'user_no', propName: 'user_id' },
        { propName: 'direct_mang', label: 'direct_manager' },
        'group_no',
        { label: 'name', propName: 'user_d_name' },
      ],
      urls: {
        add: 'users',
        modify: 'users',
        search: 'users',
        pages: 'users/pages',
        page: 'users/page',
        lastPage: 'users/lastPage',
        filter: 'users/filteredPages',
        pageNo: 'users/pageNo',
        delete: 'users',
      },
    },
    to_user_id: {
      mainFields: [
        { label: 'user_no', propName: 'user_id' },
        { propName: 'direct_mang', label: 'direct_manager' },
        'group_no',
        { label: 'name', propName: 'user_d_name' },
      ],
      urls: {
        add: 'users',
        modify: 'users',
        search: 'users',
        pages: 'users/pages',
        page: 'users/page',
        lastPage: 'users/lastPage',
        filter: 'users/filteredPages',
        pageNo: 'users/pageNo',
        delete: 'users',
      },
    },
    group_no: {
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
    },
  },
  // to indicate the content of the privs table
  content: {
    header: [
      'cash_no',
      'name',
      'user_no',
      'name',
      {
        label: 'add',
        control: 'add_priv',
      },
      {
        label: 'view',
        control: 'view_priv',
      },
    ],
    propsName: [
      'cash_no',
      { d: 'bank_d_name', f: 'bank_f_name' },
      'user_id',
      { d: 'user_d_name', f: 'user_f_name' },
      'add_priv',
      'view_priv',
    ],
  },
  // to indicate the url of the screen
  url: 'cashes',
  // to indicate the props names
  propsNames: ['user_id', 'cash_no', 'add_priv', 'view_priv'],
  // pks
  identifiers: ['user_id', 'cash_no'],
}