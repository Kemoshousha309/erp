import { Button, LinearProgress } from "@mui/material";
import style from "./ExcelPage.module.scss";
import SendIcon from "@mui/icons-material/Send";
import RuleIcon from "@mui/icons-material/Rule";
import { useContext } from "react";
import { ExeclPageContext } from "./ExcelPage.component";
import { selectMessage } from "../../Languages/languages";

// RENDER COMPONENTS
export function ExcelPage({ children, ...restProps }) {
  const { props } = useContext(ExeclPageContext);
  const containerClassess = [style.container];
  if (parseInt(props.lanState) === 1) {
    containerClassess.push(style.rtl);
  } else {
    containerClassess.push(style.ltr);
  }

  return <div className={containerClassess.join(" ")}>{children}</div>;
}

ExcelPage.CloseBtn = function CloseBtn({ children, ...restProps }) {
  const { props } = useContext(ExeclPageContext);
  return (
    <div className={style.btnContainer}>
      <Button onClick={props.close} variant="outlined" color="error">
        {children}
      </Button>
    </div>
  );
};

ExcelPage.Header = function Header({ children, ...restProps }) {
  return <h1>{children}</h1>;
};

ExcelPage.Instructions = function Instructions({ children, ...restProps }) {
  return <div className={style.instructions}>{children}</div>;
};

ExcelPage.InputsContainer = function InputsContainer({
  children,
  ...resProps
}) {
  return <div className={style.inputsContainer}>{children}</div>;
};

ExcelPage.InputErrMess = function InputErrMess({ children, ...restProps }) {
  const {
    state: { fileInputErrMes },
  } = useContext(ExeclPageContext);
  if (!fileInputErrMes) return null;
  return <p className={style.error}>{fileInputErrMes.content}</p>;
};

ExcelPage.FunctionBtns = function FunctionBtns() {
  const excelPage = useContext(ExeclPageContext);
  const {
    state: { renderButtons },
    props: {
      excelPageInfo: { serverValidate },
    },
    addExcelSheet,
    validateExcelSheet,
  } = excelPage;
  if (!renderButtons) return null;
  return (
    <div className={style.buttonsContainer}>
      <Button
        onClick={validateExcelSheet}
        variant="contained"
        startIcon={<RuleIcon />}
      >
        Validate
      </Button>
      <Button
        disabled={!serverValidate.addAvialabilty}
        onClick={addExcelSheet}
        variant="outlined"
        endIcon={<SendIcon />}
      >
        Add
      </Button>
    </div>
  );
};

ExcelPage.Loading = function Loading() {
  const {
    props: {
      excelPageInfo: { excelLoading },
    },
  } = useContext(ExeclPageContext);
  if (!excelLoading) return null;
  return <LinearProgress />;
};

ExcelPage.ErrorMess = function ErrorMess() {
  const {
    state: { errMessages },
  } = useContext(ExeclPageContext);
  console.log(errMessages)
  if (!errMessages) return null;
  return (
    <div className={style.errMessContainer}>
      <p>Error</p>
      {errMessages.map((errMess, indx) => {
        if (typeof errMess === "object") {
          // this means it's an array
          return (
            <ol key={indx}>
              {errMess.slice(0, 5).map((errMessage, index) => {
                if (index === 4 && errMess.length > 4) {
                  return (
                    <div key={index}>
                      <li> {errMessage}</li>
                      <p>
                        {" "}
                        ..............There is more Errors in this columns your
                        sheet and try again
                      </p>
                    </div>
                  );
                }
                return <li> {errMessage}</li>;
              })}
            </ol>
          );
        }
        return <div key={indx}>- {errMess}</div>;
      })}
    </div>
  );
};

ExcelPage.ServerErr = function ServerErr() {
  const {
    props: {
      excelPageInfo: { serverValidate },
    },
  } = useContext(ExeclPageContext);
  const responseData = serverValidate.validateRes;
  if (!responseData) return null;
  let serverErr = false;
  const errMessages = [];
  if (responseData.status && responseData.error) {
    serverErr = true;
  } else {
    for (const pk in responseData) {
      const obj = {};
      obj.mess = responseData[pk].message;
      obj.location = pk;
      errMessages.push(obj);
    }
  }

  let content = null;
  if (serverErr) {
    content = (
      <p>
        {responseData.error} with status code {responseData.status}
      </p>
    );
  } else {
    content = errMessages.slice(0, 5).map((err, index) => {
      if (index === 4) {
        return (
          <div key={index}>
            <li>
              {" "}
              {selectMessage(err.mess)} in the primary key number{" "}
              {err.location}{" "}
            </li>
            <p>
              {" "}
              ..............There is more Errors Check your sheet and try again
            </p>
          </div>
        );
      }
      return (
        <li key={index}>
          {" "}
          {selectMessage(err.mess)} in the primary key number{" "}
          {err.location}
        </li>
      );
    });
  }
  return (
    <div className={style.errMessContainer}>
      <p>Error</p>
      <ol>{content}</ol>
    </div>
  );
};

ExcelPage.AddMess = function AddMess() {
  const {
    props: {excelPageInfo: { addMess }}
  } = useContext(ExeclPageContext);
  if (!addMess) return null;
  return <p className={style.validMess}>{addMess}</p>;
};

ExcelPage.ValidMess = function ValidMess() {
  const {props: {excelPageInfo: { serverValidate }}} = useContext(ExeclPageContext);
  if (!serverValidate.addAvialabilty) return null;
  return (
    <p className={style.validMess}>
      The sheet is valid click Add button to save it.
    </p>
  );
};
