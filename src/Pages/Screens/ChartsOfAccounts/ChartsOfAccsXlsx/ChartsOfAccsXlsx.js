// EXCEL SHEET

// charts of acc validator, preparer extend from general validator, preparer for xlsx

import _ from 'lodash';
import { XlsxValidator } from '../../../ScreenConstructor/screen/functions/excelSheet/XlsxValidator';
import { XlsxPreparer } from '../../../ScreenConstructor/screen/functions/excelSheet/XlsxPreparer';
import { t } from '../../../../Languages/languages';

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

export class ChartsOfAcctsXlsxValidator extends XlsxValidator {
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

export class ChartsOfAcctsXlsxPreparer extends XlsxPreparer {
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
function ChartsExcelInstructions() {
  return (
    <div>
      <h3>{t('instruction_before_load_excel')}</h3>
      <ul>
        <li>
          <span>
            {t('file_order')}
            {' '}
            :
          </span>
          <br />
          {t('acc_no')}
          {' '}
          (
          {t('number')}
          )
          -
          {t('currency')}
          {' '}
          (
          {t('text')}
          {' '}
          {t('with')}
          {' '}
          ,
          {t('delimiter')}
          )
          -
          {t('name')}
          {' '}
          (
          {t('text')}
          ) -
          {t('foreign_name')}
          {' '}
          (
          {t('text')}
          ) -
          {t('parent_acc')}
          {' '}
          (
          {t('number')}
          ) -
          {t('acc_level')}
          {' '}
          (
          {t('number')}
          ) -
          {t('type')}
          {' '}
          (
          {t('boolean')}
          ) -
          {t('report_type')}
          {' '}
          (
          {t('boolean')}
          ) -
          {t('group')}
          {' '}
          (
          {t('number')}
          ) -
          {t('acc_nature')}
          {' '}
          (
          {t('boolean')}
          ) -
          {t('acc_type')}
          {' '}
          (
          {t('number')}
          ) -
          {t('acc_dtl')}
          {' '}
          (
          {t('number')}
          )-
          {t('cash_flow_type')}
          {' '}
          (
          {t('number')}
          ) -
          {t('cc_post')}
          {' '}
          (
          {t('number')}
          ) -
          {t('inactive')}
          {' '}
          (
          {t('boolean')}
          ) -
          {t('inactive_reason')}
          {' '}
          (
          {t('text')}
          )
        </li>
        <li>{t('read_excel_from_second_line')}</li>
        <li>{t('file_extention_xlsx')}</li>
        <li>{t('read_from_first_sheet')}</li>
      </ul>
    </div>
  );
}


export default ChartsExcelInstructions;
