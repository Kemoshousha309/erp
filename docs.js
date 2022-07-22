const details = {
  current_tab: "bnk_dtl_list",
  loading: false,
  type: "FOREIGN",
  // To define the type of details
  // PRIMARY => primary from the same screen when Add: add an empty row to the detials
  // FOREIGN => from foreign screen when Add: open a modal from another screen
  show: true,
  tabs: {
    bnk_dtl_list: {
      // mandatory
      fk: "acc_no", // required for foreign type
      // should be added to the Foreign details to define key prop name of the foreign tabel
      // used in add to prevent add duplicated rows
      label: "bnk_dtl_list",
      headers: [
        // to define the headers and fields of the details
        {
          propName: "acc_no", // used as id
          label: "acc_no",
          disabled: false,
          type: "number",
          validationRules: {
            requiered: true,
          },
          foriegnPropName: "acc_no", // required in add type dtl foriegn list
          // to define the property name in the foreign record used in filling the details
          // fields on pop up record click
          fk: true, // requierd for foriegn type
          // to tell that this field if the primary key of the foreign screen
          fillFields: ["acc_no"],
          // the detials fields that should be filled when details record clicked
        },
        {
          propName: "acc_curr",
          label: "acc_curr",
          disabled: false,
          type: "text",
          validationRules: {
            requiered: true,
          },
          // foriegnPropName: "currency_list",
        },
        {
          propName: "inactive",
          label: "inactive",
          disabled: false,
          type: "checkbox",
          validationRules: {
            requiered: true,
          },
        },
      ],
      viewOnly: false, // mandatory
      // some details just for only display purpuses
      recordDetailPropName: "bnk_dtl_list", // mandatory
      // the name of the details property in the record in the state used every where
      activeForeignList: null,
      detailsRowIndex: null, // define which row to update in the record in fk list click
      foreignKeys: ["acc_no"],
      foreignURLs: {
        // required in foriegn type
        pages: "chartofaccounts/pages",
        page: "chartofaccounts/page",
        lastPage: "chartofaccounts/lastPage",
        filter: "chartofaccounts/filteredPages",
        pageNo: "chartofaccounts/pageNo",
      },
      foreignMainFields: [
        // required in foriegn type
        "acc_no",
        { label: "name", propName: "acc_d_name" },
        // { label: "ex_rate", propName: "exchange_rate" },
      ],
      pageURL: {
        // required in foriegn type
        // pageURL contain information used in getDetials in add mode
        // add mode => when save a detials in a add mode we should display the the added (saved)
        // record and we need to recive the details from the server after save add
        // =>> to form a url to get the record details we need to know the following
        master: "acc_no",
        // knowing the name of the primary key of the master enable us to access its value form the
        // record (we should know the value to send the request and recive the details of that record)
        temp: "chartofaccounts",
        // the is the url of getting record (note: record contain the details that we want)
      },
      // needed in limit record nums
      addState: true, // optional
      // to define the add state enabled or disabled
      recordsNum: 3, // optional
      // to define the max number of records allowed to be added used in limitAddHanders
    },
  },
};

// properties
//   [
//     {
//         "recordDetailPropName": "bnk_dtl_list",
//         "headers": {
//             "acc_no": {
//                 "propName": "acc_no",
//                 "label": "acc_no",
//                 "disabled": false,
//                 "type": "number",
//                 "validationRules": {
//                     "requiered": true
//                 },
//                 "foriegnPropName": "acc_no",
//                 "fk": true,
//                 "fillFields": [
//                     "acc_no"
//                 ],
//                 "foreignURLs": {
//                     "pages": "chartofaccounts/pages",
//                     "page": "chartofaccounts/page",
//                     "lastPage": "chartofaccounts/lastPage",
//                     "filter": "chartofaccounts/filteredPages",
//                     "pageNo": "chartofaccounts/pageNo"
//                 },
//                 "foreignMainFields": [
//                     "acc_no",
//                     {
//                         "label": "name",
//                         "propName": "acc_d_name"
//                     }
//                 ],
//                 "filterBody": {
//                     "acc_no": null,
//                     "acc_d_name": null,
//                     "acc_f_name": null,
//                     "sub": true,
//                     "parent_acc": null,
//                     "bs": null
//                 }
//             },
//             "acc_curr": {
//                 "propName": "acc_curr",
//                 "label": "acc_curr",
//                 "disabled": false,
//                 "type": "text",
//                 "validationRules": {
//                     "requiered": true
//                 }
//             },
//             "inactive": {
//                 "propName": "inactive",
//                 "label": "inactive",
//                 "disabled": false,
//                 "type": "checkbox",
//                 "validationRules": {
//                     "requiered": true
//                 }
//             }
//         }
//     }
// ]