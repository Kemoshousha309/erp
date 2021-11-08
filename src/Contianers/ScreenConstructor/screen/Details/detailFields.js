import { Checkbox, TextField } from "@material-ui/core";


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
