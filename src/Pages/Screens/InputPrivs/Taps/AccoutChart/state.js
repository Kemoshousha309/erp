import { chipsRecordClickHandler } from "../../../../ScreenConstructor/screen/handlers";

export function accChartPrivInitSate() {
  return {
    fields: {
      from_account_no: {
        fieldType: 'input',
        type: 'number',
        label: 'from_account_no',
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
        fillFields: [
          { recordName: 'acc_no', stateName: 'from_account_no' },
          { recordName: 'acc_f_name', stateName: 'from_account_no_f_name' },
          { recordName: 'acc_d_name', stateName: 'from_account_no_d_name' },
        ],
      },
      to_account_no: {
        fieldType: 'input',
        type: 'number',
        label: 'to',
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
        fillFields: [
          { recordName: 'acc_no', stateName: 'to_account_no' },
          { recordName: 'acc_f_name', stateName: 'to_account_no_f_name' },
          { recordName: 'acc_d_name', stateName: 'to_account_no_d_name' },
        ],
      },
      from_user_id: {
        fieldType: 'input',
        type: 'number',
        label: 'from_user_id',
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
        fillFields: [
          { recordName: 'group_no', stateName: 'group_no' },
          { recordName: 'group_f_name', stateName: 'group_no_f_name' },
          { recordName: 'group_d_name', stateName: 'group_no_d_name' },
        ],
      },
      from_group_no: {
        fieldType: 'input',
        type: 'number',
        label: 'from_group_no',
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
        fillFields: [
          { recordName: 'group_no', stateName: 'from_group_no' },
          { recordName: 'group_f_name', stateName: 'from_group_no_f_name' },
          { recordName: 'group_d_name', stateName: 'from_group_no_d_name' },
        ],
      },
      to_group_no: {
        fieldType: 'input',
        type: 'number',
        label: 'to',
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
        fillFields: [
          { recordName: 'group_no', stateName: 'to_group_no' },
          { recordName: 'group_f_name', stateName: 'to_group_no_f_name' },
          { recordName: 'group_d_name', stateName: 'to_group_no_d_name' },
        ],
      },
      currency_list: {
        fieldType: 'chips',
        type: 'text',
        label: 'currency_list',
        validation: {
          required: false,
        },
        validity: {
          valid: true,
          touched: false,
          message: null,
        },
        writability: true,
        value: [],
        controlField: true,
        addHandler: this.chipsAddHandler.bind(this, 'currency_list'),
        recordClickHandler: (record) => chipsRecordClickHandler.call(this, record, 'currency_code'),
        removeHandler: this.chipsRemoveHandler.bind(this, 'currency_list'),
      },
    },
    chipsListShow: null,
    chipsList: {
      currency_list: {
        mainFields: [
          'currency_code',
          { label: 'name', propName: 'currency_d_name' },
          { label: 'ex_rate', propName: 'exchange_rate' },
        ],
        urls: {
          add: 'currency',
          modify: 'currency',
          search: 'currency',
          pages: 'currency/pages',
          page: 'currency/page',
          lastPage: 'currency/lastPage',
          filter: 'currency/filteredPages',
          pageNo: 'currency/pageNo',
          delete: 'currency',
          preAdd: 'currency/preAdd',
          preModify: 'currency/preModify',
        },
      },
    },
    fks: [
      'from_account_no',
      'to_account_no',
      'from_group_no',
      'to_group_no',
      'from_user_id',
      'to_user_id',
      'group_no',
    ],
    fkList: {
      from_account_no: {
        mainFields: [
          'parent_acc',
          'acc_no',
          { label: 'name', propName: 'acc_d_name' },
        ],
        urls: {
          add: 'chartofaccounts',
          modify: 'chartofaccounts',
          search: 'chartofaccounts',
          pages: 'chartofaccounts/pages',
          page: 'chartofaccounts/page',
          lastPage: 'chartofaccounts/lastPage',
          filter: 'chartofaccounts/filteredPages',
          pageNo: 'chartofaccounts/pageNo',
          delete: 'chartofaccounts',
        },
      },
      to_account_no: {
        mainFields: [
          'parent_acc',
          'acc_no',
          { label: 'name', propName: 'acc_d_name' },
        ],
        urls: {
          add: 'chartofaccounts',
          modify: 'chartofaccounts',
          search: 'chartofaccounts',
          pages: 'chartofaccounts/pages',
          page: 'chartofaccounts/page',
          lastPage: 'chartofaccounts/lastPage',
          filter: 'chartofaccounts/filteredPages',
          pageNo: 'chartofaccounts/pageNo',
          delete: 'chartofaccounts',
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
      from_group_no: {
        mainFields: ['group_no', { label: 'name', propName: 'group_d_name' }],
        urls: {
          pages: 'accountsgroup/pages',
          page: 'accountsgroup/page',
          lastPage: 'accountsgroup/lastPage',
          filter: 'accountsgroup/filteredPages',
          pageNo: 'accountsgroup/pageNo',
        },
      },
      to_group_no: {
        mainFields: ['group_no', { label: 'name', propName: 'group_d_name' }],
        urls: {
          pages: 'accountsgroup/pages',
          page: 'accountsgroup/page',
          lastPage: 'accountsgroup/lastPage',
          filter: 'accountsgroup/filteredPages',
          pageNo: 'accountsgroup/pageNo',
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
    // the content identify the header labels and propNames in the input priv record
    content: {
      header: [
        'acc_no',
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
        'acc_no',
        { d: 'acc_d_name', f: 'acc_f_name' },
        'user_id',
        { d: 'user_d_name', f: 'user_f_name' },
        'add_priv',
        'view_priv',
      ],
    },
    // to indicate the url of the screen
    url: 'accounts',
    // to indicate the props of input priv record and used to get the body to be sent in save
    propsNames: ['user_id', 'acc_no', 'acc_cur', 'add_priv', 'view_priv'],
    // identifiers used to determine the specific input priv to be handled on change
    identifiers: ['user_id', 'acc_no'],
  }
}