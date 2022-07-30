export const screenPrivInitState = {
  fields: {
    user_id: {
      fieldType: "input",
      type: "number",
      label: "user_no",
      validation: {
        requiered: false,
        length: 30,
      },
      validity: {
        valid: true,
        touched: false,
        message: null,
      },
      writability: false,
      value: "",
    },
  },
  pks: ["user_id"],
  tapTools: ["delete", "add", "copy", "excel"],
  mainFields: [
    { label: "user_no", propName: "user_id" },
    { propName: "direct_mang", label: "direct_manager" },
    "group_no",
    { label: "name", propName: "user_d_name" },
  ],
  tapName: "screenPriv",
  searchFields: ["user_id"],
  urls: {
    add: "users",
    modify: "users",
    search: "users",
    pages: "users/pages",
    page: "users/page",
    lastPage: "users/lastPage",
    filter: "users/filteredPages",
    pageNo: "users/pageNo",
    delete: "users",
  },
  record: null,
  treeLoading: "wait",
  user_formPrivs: null,
  currentForm: null,
  formPriv: null,

}