import { isValid } from "../validation";


// HANDLERS
export function inputChangeHandler(event, index, serverValue, validationRules) {
  const {
    target: { value, id },
  } = event;
  const {
    details: { tabs, current_tab },
    record,
    mode,
  } = this.state;

  const row = record[tabs[current_tab].recordDetailPropName][index];
  const [valid, message] = isValid(value, validationRules, this);
  row[`${id}#validity`] = {
    valid: valid,
    message: message,
  };
  if (!row.serverValue && !row.frontRow) {
    row.serverValue = serverValue;
  }
  row[id] = value;
  if (mode === "modify" && !row.action) {
    row.action = "update";
  }
  this.setState({ record: record });
}

export function addHandler(e) {
  e.preventDefault();
  let {
    record,
    details: { current_tab, tabs },
  } = this.state;
  const row = {
    action: "add",
    frontRow: true,
  };
  tabs[current_tab].headers.forEach((i) => {
    let propName;
    typeof i === "object" ? (propName = i.propName) : (propName = i);
    row[propName] = "";
  });
  if (!record) {
    record = {};
    record[tabs[current_tab].recordDetailPropName] = [row];
  } else if (!record[tabs[current_tab].recordDetailPropName]) {
    record[tabs[current_tab].recordDetailPropName] = [row];
  } else {
    record[tabs[current_tab].recordDetailPropName].unshift(row);
  }
  document.getElementById("tableContainer").scrollTo({
    top: 0,
    behavior: "smooth",
  });
  this.setState({ record: record });
}

export function removeHandler(index, e) {
  e.preventDefault();
  const {
    record,
    details: { current_tab, tabs },
  } = this.state;
  const row = record[tabs[current_tab].recordDetailPropName][index];
  if (row.action) {
    row.prevAction = row.action;
  }
  row.action = "delete";
  this.setState({ record: record });
}

//  LEGACY PAGINATOR
// function paginator(theme) {
//   const { record, mode, fields } = this.state;
//   if (["d_record", "modify"].includes(mode)) {
//     const { current_tab, tabs } = this.state.details;
//     const { pageURL, recordDetailPropName } = tabs[current_tab];
//     const recordDetail = record[recordDetailPropName];
//     const master = fields[pageURL.master].value;
//     let page_no = 1;
//     let pages_count = 1;
//     if (recordDetail.pages) {
//       page_no = recordDetail.page_no;
//       pages_count = recordDetail.pages_count;
//     }
//     return (
//       <div className={style.pagContainer}>
//         <ThemeProvider theme={theme}>
//           <Pagination
//             onChange={(e, v) =>
//               pagHandler.call(this, e, v, current_tab, master)
//             }
//             count={pages_count}
//             page={page_no}
//             color="primary"
//           />
//         </ThemeProvider>
//       </div>
//     );
//   }
// }
// function pagHandler(event, value, tabId, master) {
//   const { details, record } = this.state;
//   const {
//     recordDetailPropName,
//     pageURL: { temp },
//   } = details.tabs[tabId];
//   const url = `${temp}/${master}/${value}`;
//   this.setState({ loading: true });
//   axios
//     .get(url)
//     .then((res) => {
//       record[recordDetailPropName] = res.data;
//       this.setState({ details: details, loading: false, record: record });
//     })
//     .catch((err) => console.log(err));
// }
