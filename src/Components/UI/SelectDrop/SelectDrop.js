import React from "react";
import style from "./SelectDrop.module.scss";
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


const SelectDrop = props => {
  // console.log("SelectDrop render")
    const classes = useStyles();
    return(
        <FormControl className={classes.formControl}>
            <Select
            className={style.selectDrop}
            labelId="TabLabel"
            id="TabSelect"
            value={props.current}
            onChange={props.changed}
            >
              {props.children}
            </Select>
        </FormControl>
    )
}

export default SelectDrop;