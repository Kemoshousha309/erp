import { getSheet } from '../../../../ExcelPage/fileProcess';

export const excelPageCloseModal = () => {
  this.setState({
    excelSheetOpen: false,
    excelPage: {
      excelLoading: false,
      serverValidate: {
        validated: false,
        validatedResult: null,
        validateRes: null,
      },
    },
  });
};

export const resetExcelPageModal = () => {
  this.setState({
    excelPage: {
      excelLoading: false,
      serverValidate: {
        validated: false,
        validatedResult: null,
        validateRes: null,
      },
    },
  });
};

export const handleFileChange = (excelSheet) => {
  const {
    excelFileInput,
    props: { resetExcelPage },
  } = excelSheet;

  resetExcelPage();
  // call the file
  const result = getSheet(excelFileInput.current);
  result
    .then((res) => {
      excelSheet.setState({
        rawExcelSheet: res.data,
        sheetColumnsNum: res.sheetColumnsNum,
        selectedFile: res.selectedFile,
        renderButtons: true,
        errMessages: null,
        fileInputErrMes: {
          state: false,
          content: null,
        },
      });
    })
    .catch((err) => {
      // this means that there is err in the reading the file
      excelSheet.setState({
        rawExcelSheet: null,
        sheetColumnsNum: null,
        selectedFile: err.selectedFile,
        renderButtons: false,
        errMessages: null,
        fileInputErrMes: {
          state: true,
          content: 'This input is not valid',
        },
      });
    });
};

export const handleValidateExcelSheet = (excelSheet) => {
  const {
    props: {
      excelPagePreparer,
      excelPageValidator,
      recordPropNames,
      excelSheetServerSender,
    },
    state: { rawExcelSheet, sheetColumnsNum },
  } = excelSheet;

  // match
  const preparer = excelPagePreparer(recordPropNames, rawExcelSheet);
  preparer.prepareRawSheet();
  console.log(preparer);
  // validate the number
  const validator = excelPageValidator(sheetColumnsNum);
  validator.checkNumber();
  console.log(validator);

  if (validator.result.columnsNum.valid) {
    // handle types
    preparer.prepareTypedSheet();
    // validate
    validator.checkValidity(preparer.typedSheet);
  } else {
    excelSheet.setState({ errMessages: validator.result.columnsNum.errMessages });
    return;
  }

  if (validator.result.validity.valid) {
    // prepare the final preparation
    preparer.finalPrepare();
    // sever validate
    const sender = excelSheetServerSender(preparer.preparedSheet);
    excelSheet.setState({ sender });
    sender.validate();
    // update the server validate in the screen then refelct here in the UI
  } else {
    excelSheet.setState({ errMessages: validator.result.validity.errMessages });
  }
};
