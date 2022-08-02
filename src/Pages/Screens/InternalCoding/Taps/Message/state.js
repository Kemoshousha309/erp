export const messInitSate = {
  fields: {
    message_code: {
      fieldType: "input",
      type: "text",
      label: "message_code",
      validation: {
        required: true,
        length: 60,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: "",
    },
    message_desc: {
      fieldType: "input",
      type: "text",
      label: "message_desc",
      validation: {
        required: true,
        length: 200,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: "",
    },
    lang_no: {
      fieldType: "asyncSelect",
      type: "number",
      label: "lang_no",
      validation: {
        required: true,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      options: null,
      writability: false,
      value: "",
      fillFields: [
        { recordName: "lang_no", stateName: "lang_no" },
        { recordName: "lang_name", stateName: "lang_no_name" },
      ],
    },
    lang_no_name: {
      fieldType: "input",
      type: "text",
      label: "name",
      writability: false,
      readOnly: true,
      value: "",
    },
  },
  pks: ["message_code", "lang_no"],
  urls: {
    add: "public/messages",
    modify: "public/messages",
    search: "public/messages",
    pages: "public/messages/pages",
    page: "public/messages/page",
    lastPage: "public/messages/lastPage",
    filter: "public/messages/filteredPages",
    pageNo: "public/messages/pageNo",
    delete: "public/messages",
  },
  fks: ["lang_no"],
  fkListShow: null,
  fkList: {
    lang_no: {
      mainFields: ["lang_no", "lang_name", "lang_dir"],
      urls: {
        add: "public/language",
        modify: "public/language",
        search: "public/language",
        pages: "public/language/pages",
        page: "public/language/page",
        lastPage: "public/language/lastPage",
        filter: "public/language/filteredPages",
        pageNo: "public/language/pageNo",
        delete: "public/language",
      },
    },
  },
  tapTools: ["delete", "excel"], // to be deleted and view the others
  mainFields: ["message_code", "message_desc", "lang_no"],
  tapName: "messages",
  searchFields: ["message_code", "lang_no"],
}