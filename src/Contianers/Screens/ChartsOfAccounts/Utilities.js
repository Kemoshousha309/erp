import axios from "../../../axios";

export function getAccTree(url) {
  axios
    .get(url)
    .then((res) => {
      const accounts = res.data;
      const tree = getAccTreestructure(accounts);
      this.setState({ tree: tree });
    })
    .catch((err) => console.log(err));
}

function getAccTreestructure(accounts) {
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

const getUsedRecord = (fields) => {
  return new Promise((resolve, reject) => {
    if (fields.parent_acc.usedRecord === "LOADING") {
      let interval = setInterval(() => {
        if (
          typeof fields.parent_acc.usedRecord === "object" &&
          fields.parent_acc.usedRecord
        ) {
          resolve(fields.parent_acc.usedRecord);
          clearInterval(interval);
        } else if (!fields.parent_acc.usedRecord) {
          reject("NO_ACCOUNT");
          clearInterval(interval);
        }
      }, 100);
    } else if (typeof fields.parent_acc.usedRecord === "object") {
      resolve(fields.parent_acc.usedRecord);
    } else {
      reject("EMPTY_FIELD");
    }
  });
};

export function parentAccHandler(e, inputFiled) {
  const parentAccValue = e.target.value;
  const { fields } = this.state;
  getUsedRecord(fields)
    .then((res) => {
      this.setState({
        fields: updateOnParentAcc.call(this, fields, "PRESENT"),
      });
    })
    .catch((err) => {
      // No parent account or Zero
      if (parseInt(parentAccValue) === 0) {
        updateOnParentAcc.call(this, fields, "ZERO");
      } else {
        updateOnParentAcc.call(this, fields);
      }
      this.setState({ fields: fields });
    });
}

function updateOnParentAcc(fields, parentAcc) {
  switch (parentAcc) {
    case "PRESENT":
      // account_no
      fields.acc_no.writability = true;

      // level
      fields.level.value = fields.parent_acc.usedRecord.level + 1;

      // acc Type
      fields.acc_type.value = decideAccType.call(this, fields.level.value);

      // bs - Report type
      fields.bs.writability = false;
      fields.bs.value = fields.parent_acc.usedRecord.bs;
      break;
    case "ZERO":
      // account_no
      fields.acc_no.writability = true;

      //level
      fields.level.value = 1;

      // acc Type
      fields.acc_type.value = false

      // bs - Report type
      fields.bs.writability = true;
      break;

    default:
      // account_no
      fields.acc_no.writability = false;

      // level
      fields.level.value = "";

      // acc Type
      fields.acc_type.value = ""

      // bs - Report type
      fields.bs.writability = false;
      fields.bs.value = "";
      break;
  }

  return fields;
}

function decideAccType(level) {
  let output;
  const { mode } = this.state;
  const pre = mode === "add" ? "preAdd" : "preModify";
  const subLevel = this.state[pre].content.info.sub_level;
  if (parseInt(level) === parseInt(subLevel)) {
    output = true;
  } else {
    output = false;
  }
  console.log("type: ", output);
  return output;
}
