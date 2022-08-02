import axios from '../../../../../axios';

export class ExcelServerSender {
  constructor(screen, sheet) {
    this.screen = screen;
    this.sheet = sheet;
    const {
      state: {
        urls: { checkExcel, addExcel },
      },
    } = screen;
    this.checkExcelUrl = checkExcel;
    this.addExcelUrl = addExcel;
  }

  validate() {
    const { excelPage } = this.screen.state;

    this.screen.setState({
      excelPage: {
        ...excelPage,
        excelLoading: true,
      },
    });

    axios({
      method: 'POST',
      url: this.checkExcelUrl,
      data: this.sheet,
    })
      .then((res) => {
        this.screen.setState({
          excelPage: {
            excelLoading: false,
            serverValidate: {
              validated: true,
              addAvailability: true,
              validateRes: null,
            },
          },
        });
      })
      .catch((err) => {
        this.screen.setState({
          excelPage: {
            excelLoading: false,
            serverValidate: {
              validated: true,
              addAvailability: false,
              validateRes: err.response.data,
            },
          },
        });
      });
  }

  add() {
    const { excelPage } = this.screen.state;

    excelPage.excelLoading = true;
    this.screen.setState({ excelPage });

    axios({
      method: 'POST',
      url: this.addExcelUrl,
      data: this.sheet,
    })
      .then((res) => {
        excelPage.excelLoading = false;
        excelPage.serverValidate = {
          validated: false,
          addAvailability: false,
          validateRes: null,
        };
        excelPage.addMess = 'The Excel Sheet is added';
        this.screen.setState({ excelPage });
      })
      .catch((err) => {
        excelPage.excelLoading = false;
        excelPage.addMess = 'The Excel Sheet is not added, there is an error. review and try again';
        this.screen.setState({ excelPage });
      });
  }
}
