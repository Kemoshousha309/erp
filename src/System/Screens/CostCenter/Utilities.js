import _ from 'lodash';
import axios from '../../../axios';
import { parallel } from '../../model/screen/handlers/async';

// TREE
export function getCCTreestructure(accounts) {
  const rootParents = accounts.filter(({ parent_cc }) => parent_cc === 0);
  const tree = rootParents.map((parent) => getChildren(parent, accounts));
  return tree;
}

function getChildren(node, accounts) {
  node.children = [];
  accounts.forEach((cc) => {
    if (cc.parent_cc === node.cc_no) {
      node.children.push(cc);
    }
  });
  node.children.forEach((cc) => {
    if (!cc.sub) {
      getChildren(cc, accounts);
    }
  });
  return node;
}

// INPUT HANDLING
// check if the record is present
const getUsedRecord = (fields, parentccValue) => new Promise((resolve, reject) => {
  const interval = setInterval(() => {
    if (
      typeof fields.parent_cc.usedRecord === 'object'
        && fields.parent_cc.usedRecord
    ) {
      resolve(fields.parent_cc.usedRecord);
      clearInterval(interval);
    } else if (!fields.parent_cc.usedRecord) {
      reject(['NO_ACCOUNT', parentccValue]);
      clearInterval(interval);
    }
  }, 100);
});

// send the requests in queue to make sure the right order of values
const requestsList = [];
function request(task1, task2, index) {
  return () => {
    parallel(task1, task2)
      .then(([usedRecord, nextPkRes]) => {
        requestsList[index].status = 'FULFILLED';
        this.setState((state, props) => {
          const newState = _.cloneDeep(state);
          newState.fields.parent_cc.writability = true;
          newState.fields.cc_no.value = nextPkRes.data.next_PK
            ? nextPkRes.data.next_PK
            : '';
          newState.fields = updateOnParentcc.call(
            this,
            newState.fields,
            usedRecord,
            'PRESENT',
          );
          return newState;
        });
      })
      .catch(([mess, parentAccValue]) => {
        requestsList[index].status = 'FULFILLED';
        this.setState((state, props) => {
          let { fields } = state;
          fields.parent_cc.writability = true;
          fields.cc_no.value = '';
          if (parseInt(parentAccValue) === 0) {
            fields = updateOnParentcc.call(this, fields, null, 'ZERO');
          } else {
            fields = updateOnParentcc.call(this, fields);
          }
          return {
            fields,
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
    const interval = setInterval(() => {
      if (requestsList[counter - 1].status === 'FULFILLED') {
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
export function parentccHandler(e, inputFiled) {
  const parentccValue = e.target.value;
  const { fields } = this.state;
  const promise = {
    req: request.call(
      this,
      getUsedRecord(fields, parentccValue),
      axios.get(`costcenters/nextPK/${parentccValue}`),
      requestsList.length,
    ),
    status: 'PENDING',
  };
  requestsList.push(promise);
  excuteRequests();
}

// update other fields based on the parent account
export function updateOnParentcc(fields, usedRecord, parentAcc) {
  const fieldsUpdate = _.cloneDeep(fields);
  switch (parentAcc) {
    case 'PRESENT':
      // account_no
      fieldsUpdate.cc_no.writability = true;

      break;
    case 'ZERO':
      // account_no
      fieldsUpdate.cc_no.writability = true;

      // sub
      fieldsUpdate.sub.value = false;

      break;

    default:
      // account_no
      fieldsUpdate.cc_no.writability = false;

      break;
  }

  return fieldsUpdate;
}
