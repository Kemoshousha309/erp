import React from "react";
import style from "./SelectDrop.module.scss";
import {makeStyles } from "@mui/styles";
import { Select, FormControl } from '@mui/material';

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
    const classes = useStyles();
    return(
        <FormControl variant="filled" className={classes.formControl}>
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