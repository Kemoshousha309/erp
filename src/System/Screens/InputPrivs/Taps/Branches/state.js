export const branchesPrivInitState = {
  fields: {
    from_branch_no: {
      fieldType: 'input',
      type: 'number',
      label: 'from_branch_no',
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
      fillFields: [
        { recordName: 'branch_no', stateName: 'from_branch_no' },
        { recordName: 'branch_f_name', stateName: 'from_branch_no_f_name' },
        { recordName: 'branch_d_name', stateName: 'from_branch_no_d_name' },
      ],
    },
    to_branch_no: {
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
      fillFields: [
        { recordName: 'branch_no', stateName: 'to_branch_no' },
        { recordName: 'branch_f_name', stateName: 'to_branch_no_f_name' },
        { recordName: 'branch_d_name', stateName: 'to_branch_no_d_name' },
      ],
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
      fillFields: [
        { recordName: 'user_id', stateName: 'from_user_id' },
        { recordName: 'user_f_name', stateName: 'from_user_id_f_name' },
        { recordName: 'user_d_name', stateName: 'from_user_id_d_name' },
      ],
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
      fillFields: [
        { recordName: 'user_id', stateName: 'to_user_id' },
        { recordName: 'user_f_name', stateName: 'to_user_id_f_name' },
        { recordName: 'user_d_name', stateName: 'to_user_id_d_name' },
      ],
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
      fillFields: [
        { recordName: 'group_no', stateName: 'group_no' },
        { recordName: 'group_f_name', stateName: 'group_no_f_name' },
        { recordName: 'group_d_name', stateName: 'group_no_d_name' },
      ],
    },
  },
  fks: [
    'from_branch_no',
    'to_branch_no',
    'from_user_id',
    'to_user_id',
    'group_no',
  ],
  fkList: {
    from_branch_no: {
      mainFields: [
        'branch_no',
        'branch_d_name',
        {
          propName: { d: 'shortcut_d', f: 'shortcut_f' },
          label: 'shortcut',
        },
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
    },
    to_branch_no: {
      mainFields: [
        'branch_no',
        'branch_d_name',
        {
          propName: { d: 'shortcut_d', f: 'shortcut_f' },
          label: 'shortcut',
        },
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
      'branch_no',
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
      'branch_no',
      { d: 'branch_d_name', f: 'branch_f_name' },
      'user_id',
      { d: 'user_d_name', f: 'user_f_name' },
      'add_priv',
      'view_priv',
    ],
  },
  // to indicate the url of the screen
  url: 'branches',
  // to indicate the props names
  propsNames: ['user_id', 'branch_no', 'add_priv', 'view_priv'],
  // pks
  identifiers: ['user_id', 'branch_no'],
}