import React from "react";
import style from "./InputFile.module.scss";

const InputFile = React.forwardRef((props, ref) => {
  const {id, onChange, selectedFileName} = props;
  let labelContent = "Choose an Excel file ...";
  if(selectedFileName) {
    labelContent = selectedFileName
  }
  return (
    <div>
      <input
        type="file"
        name="file"
        id={id}
        onChange={onChange}
        ref={ref}
        className={style.inputFile}
      />
      <label htmlFor={props.id}>{labelContent}</label>
    </div>
  );
});

export default InputFile;
