// EXCEL SHEET

// charts of acc validator, preparer extend from general validator, preparer for xlsx

import _ from 'lodash';
import { connect } from 'react-redux';
import { XlsxValidator } from '../../../ScreenConstructor/screen/functions/excelSheet/XlsxValidator';
import { XlsxPreparer } from '../../../ScreenConstructor/screen/functions/excelSheet/XlsxPreparer';
import { t } from '../../../../Helpers/lang';

// this columns info is unique for each screen contain xlsx
const columnsInfo = [
  { name: 'acc_no', mandatory: true, type: 'number' },
  { name: 'account_currency_list', mandatory: true, type: 'string' },
  { name: 'acc_d_name', mandatory: true, type: 'string' },
  { name: 'acc_f_name', mandatory: false, type: 'string' },
  { name: 'parent_acc', mandatory: true, type: 'number' },
  { name: 'level', mandatory: true, type: 'number' },
  { name: 'sub', mandatory: true, type: 'boolean' },
  { name: 'bs', mandatory: true, type: 'boolean' },
  { name: 'acc_group', mandatory: false, type: 'number' },
  { name: 'dr', mandatory: true, type: 'boolean' },
  { name: 'acc_type', mandatory: true, type: 'number' },
  { name: 'acc_dtl', mandatory: true, type: 'number' },
  { name: 'cash_flow_type', mandatory: false, type: 'number' },
  { name: 'cc_post', mandatory: false, type: 'number' },
  { name: 'inactive', mandatory: true, type: 'boolean' },
  { name: 'inactive_reason', mandatory: false, type: 'string' },
];

export class ChartsOfAccsXlsxValidator extends XlsxValidator {
  constructor(sheetColumnsNum) {
    super(sheetColumnsNum);
    this.columns = columnsInfo;
  }

  validate() {
    const { result } = this;
    this.checkNumber();
    if (result.columnsNum.valid) {
      this.checkValidity();
    }
    console.log(this.result);
  }
}

export class ChartsOfAccsXlsxPreparer extends XlsxPreparer {
  constructor(recordPropNames, data) {
    super(recordPropNames, data);
    this.columns = columnsInfo;
  }

  finalPrepare() {
    const preparedSheet = this.handleCurrencyList();
    this.preparedSheet = preparedSheet;
    return this.preparedSheet;
  }

  handleCurrencyList() {
    const prepared = _.cloneDeep(this.typedSheet);
    prepared.forEach((row) => {
      // handle currency list
      const currencies = row.account_currency_list.split(',');
      const account_currency_list = currencies.map((currency) => ({
        action: 'add',
        cur_code: currency,
        used: false,
      }));
      row.account_currency_list = account_currency_list;
    });
    return prepared;
  }
}

// instructions
function ChartsExcelInstructions({ lanTable, lanState }) {
  return (
    <div>
      <h3>{t('instruction_before_load_excel', lanTable, lanState)}</h3>
      <ul>
        <li>
          <span>
            {t('file_order', lanTable, lanState)}
            {' '}
            :
          </span>
          <br />
          {t('acc_no', lanTable, lanState)}
          {' '}
          (
          {t('number', lanTable, lanState)}
          )
          -
          {t('currency', lanTable, lanState)}
          {' '}
          (
          {t('text', lanTable, lanState)}
          {' '}
          {t('with', lanTable, lanState)}
          {' '}
          ,
          {t('dilimter', lanTable, lanState)}
          )
          -
          {t('name', lanTable, lanState)}
          {' '}
          (
          {t('text', lanTable, lanState)}
          ) -
          {t('foreign_name', lanTable, lanState)}
          {' '}
          (
          {t('text', lanTable, lanState)}
          ) -
          {t('parent_acc', lanTable, lanState)}
          {' '}
          (
          {t('number', lanTable, lanState)}
          ) -
          {t('acc_level', lanTable, lanState)}
          {' '}
          (
          {t('number', lanTable, lanState)}
          ) -
          {t('type', lanTable, lanState)}
          {' '}
          (
          {t('boolean', lanTable, lanState)}
          ) -
          {t('report_type', lanTable, lanState)}
          {' '}
          (
          {t('boolean', lanTable, lanState)}
          ) -
          {t('group', lanTable, lanState)}
          {' '}
          (
          {t('number', lanTable, lanState)}
          ) -
          {t('acc_nature', lanTable, lanState)}
          {' '}
          (
          {t('boolean', lanTable, lanState)}
          ) -
          {t('acc_type', lanTable, lanState)}
          {' '}
          (
          {t('number', lanTable, lanState)}
          ) -
          {t('acc_dtl', lanTable, lanState)}
          {' '}
          (
          {t('number', lanTable, lanState)}
          )-
          {t('cash_flow_type', lanTable, lanState)}
          {' '}
          (
          {t('number', lanTable, lanState)}
          ) -
          {t('cc_post', lanTable, lanState)}
          {' '}
          (
          {t('number', lanTable, lanState)}
          ) -
          {t('inactive', lanTable, lanState)}
          {' '}
          (
          {t('boolean', lanTable, lanState)}
          ) -
          {t('inactive_reason', lanTable, lanState)}
          {' '}
          (
          {t('text', lanTable, lanState)}
          )
        </li>
        <li>{t('read_excel_from_second_line', lanTable, lanState)}</li>
        <li>{t('file_extention_xlsx', lanTable, lanState)}</li>
        <li>{t('read_from_first_sheet', lanTable, lanState)}</li>
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  lanState: state.lang.lan,
  lanTable: state.lang.langTables,
});

export default connect(mapStateToProps, null)(ChartsExcelInstructions);
