import { Checkbox, TextField } from "@mui/material";


export const Field = (
  valid,
  message,
  type,
  disabled,
  propName,
  value,
  inputChangeHandler,
  index,
  page,
  validationRules
) => {
  switch (type) {
    case "checkbox":
      return (
        <Checkbox
        color="primary"
          type={type}
          disabled={disabled}
          id={propName}
          checked={Boolean(value)}
          onChange={(event) =>
            inputChangeHandler(event, index, page[propName], validationRules)
          }
        />
      );
    default:
      return (
        <TextField
          variant="standard"
          error={!valid}
          helperText={message}
          type={type}
          autoComplete="off"
          disabled={disabled}
          id={propName}
          value={value}
          onChange={(event) =>
            inputChangeHandler(event, index, page[propName], validationRules)
          }
        />
      );
  }
};
