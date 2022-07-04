import _ from "lodash";
import axios from "../../../axios";
import { parallel } from "../../ScreenConstructor/screen/async";

// TREE
export function getAccTreestructure(accounts) {
  const rootParents = accounts.filter(({ parent_acc }) => parent_acc === 0);
  const tree = rootParents.map((parent) => getChildren(parent, accounts));
  return tree;
}

function getChildren(node, accounts) {
  node.children = [];
  accounts.forEach((acc) => {
    if (acc.parent_acc === node.acc_no) {
      node.children.push(acc);
    }
  });
  node.children.forEach((acc) => {
    if (!acc.sub) {
      getChildren(acc, accounts);
    }
  });
  return node;
}

// INPUT HANDLING

// check if the record is present
const getUsedRecord = (fields, parentAccValue) => {
  return new Promise((resolve, reject) => {
    let interval = setInterval(() => {
      if (
        typeof fields.parent_acc.usedRecord === "object" &&
        fields.parent_acc.usedRecord
      ) {
        resolve(fields.parent_acc.usedRecord);
        clearInterval(interval);
      } else if (!fields.parent_acc.usedRecord) {
        reject(["NO_ACCOUNT", parentAccValue]);
        clearInterval(interval);
      }
    }, 100);
  });
};

// send the requests in queue to make sure the right order of values
const requestsList = [];
function request(task1, task2, index) {
  return () => {
    parallel(task1, task2)
      .then(([usedRecord, nextPkRes]) => {
        requestsList[index].status = "FULFILLED";
        this.setState((state, props) => {
          let newState = _.cloneDeep(state);
          newState.fields.parent_acc.writability = true;
          newState.fields.acc_no.value = nextPkRes.data.next_PK
            ? nextPkRes.data.next_PK
            : "";
          newState.fields = updateOnParentAcc.call(
            this,
            newState.fields,
            usedRecord,
            "PRESENT"
          );
          newState = subUpdate(newState);
          return newState;
        });
      })
      .catch(([mess, parentAccValue]) => {
        requestsList[index].status = "FULFILLED";
        this.setState((state, props) => {
          let { fields } = state;
          fields.parent_acc.writability = true;
          fields.acc_no.value = "";
          if (parseInt(parentAccValue) === 0) {
            fields = updateOnParentAcc.call(this, fields, null, "ZERO");
          } else {
            fields = updateOnParentAcc.call(this, fields);
          }
          return {
            fields: fields,
          };
        });
      })
      .catch((err) => false);
  };
}

let counter = 0;
const excuteRequests = () => {
  if (counter === 0) {
    requestsList[counter].req();
    counter++;
  } else {
    let interval = setInterval(() => {
      if (requestsList[counter - 1].status === "FULFILLED") {
        requestsList[counter].req();
        if (counter !== requestsList.length - 1) {
          counter++;
        } else {
          clearInterval(interval);
        }
      }
    }, 100);
  }
};

// the second handle of parent account
export function parentAccHandler(e, inputFiled) {
  const parentAccValue = e.target.value;
  const { fields } = this.state;
  const promise = {
    req: request.call(
      this,
      getUsedRecord(fields, parentAccValue),
      axios.get(`chartofaccounts/nextPK/${parentAccValue}`),
      requestsList.length
    ),
    status: "PENDING",
  };
  requestsList.push(promise);
  excuteRequests();
}

// update other fields based on the parent account
export function updateOnParentAcc(fields, usedRecord, parentAcc) {
  const fieldsUpdate = _.cloneDeep(fields);
  switch (parentAcc) {
    case "PRESENT":
      // account_no
      fieldsUpdate.acc_no.writability = true;

      // level
      fieldsUpdate.level.value = usedRecord.level + 1;

      // sub
      fieldsUpdate.sub.value = decideAccSub.call(
        this,
        fieldsUpdate.level.value
      );

      // bs - Report type
      fieldsUpdate.bs.writability = false;
      fieldsUpdate.bs.value = usedRecord.bs;

      // cc_post
      fieldsUpdate.cc_post = update_ccPost_field.call(
        this,
        fieldsUpdate.cc_post,
        fieldsUpdate.bs.value
      );
      break;
    case "ZERO":
      // account_no
      fieldsUpdate.acc_no.writability = true;

      //level
      fieldsUpdate.level.value = 1;

      // sub
      fieldsUpdate.sub.value = false;

      // bs - Report type
      fieldsUpdate.bs.writability = true;

      // cc_post
      fieldsUpdate.cc_post = update_ccPost_field.call(
        this,
        fieldsUpdate.cc_post,
        fieldsUpdate.bs.value
      );
      break;

    default:
      // account_no
      fieldsUpdate.acc_no.writability = false;

      // level
      fieldsUpdate.level.value = "";

      // sub
      fieldsUpdate.sub.value = "";

      // bs - Report type
      fieldsUpdate.bs.writability = false;
      fieldsUpdate.bs.value = "";

      // cc_post
      fieldsUpdate.cc_post.value = "";
      break;
  }

  return fieldsUpdate;
}

export function subUpdate(state) {
  const stateUpdate = _.cloneDeep(state);
  const subFields = ["acc_type", "cash_flow_type", "acc_dtl"];
  if (stateUpdate.fields.sub.value) {
    subFields.forEach((i) => {
      stateUpdate.fields[i].hide = false;
    });
    stateUpdate.details.show = true;
  } else {
    subFields.forEach((i) => {
      stateUpdate.fields[i].hide = true;
      stateUpdate.details.show = false;
    });
  }
  return stateUpdate;
}

// utility function to decide the sub
function decideAccSub(level) {
  let output;
  const { mode } = this.state;
  const pre = mode === "add" || mode === "copy" ? "preAdd" : "preModify";
  const subLevel = this.state[pre].content.info.sub_level;
  if (parseInt(level) === parseInt(subLevel)) {
    output = true;
  } else {
    output = false;
  }
  return output;
}

// utility function to decide the cc_post field
function update_ccPost_field(ccPost_field, report_type) {
  const field = _.cloneDeep(ccPost_field);
  const { mode } = this.state;
  const pre = mode === "add" || mode === "copy" ? "preAdd" : "preModify";
  const pre_ccPost_value = this.state[pre].content.info.cc_post;
  switch (parseInt(pre_ccPost_value)) {
    case 1:
      field.value = 1;
      field.writability = false;
      return field;
    case 2:
      field.value = 2;
      field.writability = true;
      return field;
    case 3:
      field.value = 3;
      field.writability = true;
      return field;
    case 4:
      if (report_type) {
        field.value = 3;
        field.writability = true;
      } else {
        field.value = 1;
        field.writability = false;
      }
      return field;
    default:
      break;
  }
}

