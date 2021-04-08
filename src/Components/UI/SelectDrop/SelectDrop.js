import React from "react";
import style from "./SelectDrop.module.scss";
import Select from '@material-ui/core/Select';
import Aux from "../../../hoc/Aux";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
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
        <Aux>
                <FormControl className={classes.formControl}>
                    <InputLabel id="TabLabel">Tab</InputLabel>
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
        </Aux>
        // <select onChange={props.changed} value={props.current} className={style.selectDrop}>
        //    {props.children}
        // </select>
    )
}

export default SelectDrop;