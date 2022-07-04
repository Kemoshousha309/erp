import { Button, LinearProgress } from "@mui/material";
import { selectMessage } from "../../utilities/lang";
import style from "./ExcelPage.module.scss";
import DisplayExcelSheet from "../../Components/DisplayExcelSheet/DisplayExcelSheet.component";
import SendIcon from '@mui/icons-material/Send';
import RuleIcon from '@mui/icons-material/Rule';

// RENDER COMPONENTS
export function RenderErrorMessage({ errMessages }) {
  // errMessages can be arr or matrix
  if (errMessages) {
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
                          ..............There is more Errors in this columns
                          your sheet and try again
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
  }
  return null;
}

export function RenderErrorResponse({ responseData, langNo   }) {
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
              {selectMessage(err.mess, langNo)} in the primary key number{" "}
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
          {selectMessage(err.mess, langNo)} in the primary key number{" "}
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
}

export function RenderFileInputErrMess({ fileInputErrMes }) {
  if (fileInputErrMes.state) {
    return <p className={style.error}>{fileInputErrMes.content}</p>;
  }
  return null;
}

export function RenderExcelTable({ excelSheet }) {
  return (
    <div className={style.tableContainer}>
      {excelSheet ? <DisplayExcelSheet sheet={excelSheet} /> : null}
    </div>
  );
}

export function RenderLoading({ loading }) {
  if (loading) {
    return <LinearProgress />;
  }
  return null;
}

export function RenderButtons({show, add, validate, addDisable}) {
  if(!show) return null;
  return (
    <div className={style.buttonsContainer}>
      <Button onClick={validate} variant="contained" startIcon={<RuleIcon />}>
        Validate
      </Button>
      <Button disabled={!addDisable} onClick={add} variant="outlined" endIcon={<SendIcon />}>
        Add
      </Button>
    </div>
  );
}

export const RenderValidMess = ({show}) => {
  if(!show) return null;
  return (
    <p className={style.validMess}>
      The sheet is valid click Add button to save it.
    </p>
  )
}


export const RenderAddMess = ({mess}) => {
  if(!mess) return null;
  return (
    <p className={style.validMess}>
      {mess}
    </p>
  )
}
