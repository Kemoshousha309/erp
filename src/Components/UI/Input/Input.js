import React from "react";
import style from "./Input.module.scss";
import { connect } from "react-redux";
import { t } from "../../../utilities";
import TextField from "@material-ui/core/TextField"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSyncAlt,
  faClipboard

} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@material-ui/core/Tooltip";
import Spinner from "../Spinner/Spinner";





const Input = props => {
    let classes;
    switch((props.inputType.trim())) {
        case "input":
           classes=[style.input]
          break;
        case "checkbox":
           classes=[style.checkbox]
          break;
        case "radio":
            classes=[style.radio]
          break;
        case "textarea":
            classes=[style.textarea, "form-control"]
          break;
        case "select":
           classes=[style.select]
          break;
        case "empty":
            classes = [style.empty]
    }
    let error = false;
      if(!props.validitiy &&  props.touched){
        error= true
      } 
    classes = classes.join(' ');
    
    let button = null
    let icon =  null;
    let title = null
    if(props.button){
      switch (props.button) {
        case "async":
          icon = faSyncAlt
          title = t("refresh", props.lanTable, props.lanState)
          break;
        case "display":
          icon = faClipboard;
          title = t("list", props.lanTable, props.lanState)
          break;
        default:
          break;
      }
      button = (
        <Tooltip title={title} arrow placement="top" enterDelay={800} >
            <button  
              className={style.iconButton} 
              onClick={props.iconClick}>
                  <FontAwesomeIcon icon={icon} />
            </button>
        </Tooltip>
      )
    }
    if(props.button === "loading"){
      button = <Spinner color="#30475e" small />
    }


    let GrStyle = null;
    if(props.GrStyle){
        GrStyle = props.GrStyle;
    }
    let inStyle = null;
    if(props.inStyle){
        inStyle = props.inStyle;
    }

    let dir = "ltr";
    if(parseInt(props.lanState) === 1){
      dir = "rtl"
    }
    const theme = createMuiTheme({
      direction: dir,
      typography: {
        fontSize:  28,
      },
    });
 
    let inputElement;
    if(props.inputType){
        switch((props.inputType.trim())) {
            case "input":
                inputElement = (
                  <ThemeProvider theme={theme}>
                    <div style={GrStyle}className={[style.inputGroup, "form-group "].join(' ')}>
                            <TextField 
                            error={error}  
                            variant="outlined" 
                            style={inStyle} 
                            disabled={props.readOnly} 
                            onChange={props.changed} 
                            className={classes} 
                            label={t(props.label, props.lanTable, props.lanState)} 
                            {...props.config} 
                            value={props.value} />
                           {button}
                    </div>
                    </ThemeProvider>
                )
              break;
            case "checkbox":
                inputElement = (
                    <div style={GrStyle} style={{justifyContent: "start"}} className={[style.inputGroup, "form-group"].join(' ')}>
                        <label htmlFor={props.config.id} className={style.label}>{t(props.label, props.lanTable, props.lanState)} :</label>
                        <input style={inStyle} disabled={props.config.readOnly} type="checkbox"   onChange={props.changed} 
                        className={classes} 
                        placeholder={t(props.placeholder, props.lanTable, props.lanState)} {...props.config} 
                        value={props.value}
                        />
                    </div>
                )
              break;
            case "radio":
                inputElement = (
                    <div style={GrStyle} className={[style.inputGroup, "form-group"].join(' ')}>
                        <label htmlFor={props.config.id} className={style.label}>{t(props.label, props.lanTable, props.lanState)} :</label>
                        <input style={inStyle} disabled={props.config.readOnly} type="radio" onChange={props.changed} 
                        className={classes} 
                        placeholder={t(props.placeholder, props.lanTable, props.lanState)} {...props.config} 
                        value={props.value}
                        />
                    </div>
                )
              break;
            case "textarea":
                inputElement = (
                    <div style={GrStyle} className={[style.inputGroup, "form-group"].join(' ')}>
                        <label htmlFor={props.config.id} className={style.label}>{t(props.label, props.lanTable, props.lanState)} :</label>
                        <textarea style={inStyle} disabled={props.config.readOnly} onChange={props.changed} className={classes} 
                        {...props.config}
                        value={props.value}
                        ></textarea>
                    </div>
                )
              break;
            case "select":
                inputElement = (
                    <div style={GrStyle} style={{justifyContent: "start"}} className={[style.inputGroup, "form-group"].join(' ')}>
                        <label htmlFor={props.config.id} className={style.label}>{t(props.label, props.lanTable, props.lanState)} :</label>
                        <select style={inStyle} disabled={props.config.readOnly} onChange={props.changed} className={classes}
                        value={props.value}
                        >
                            {props.options.map(option => <option key={option}>{option}</option>)}
                        </select>
                    </div>
                )
              break;
            case "empty":
                inputElement = (
                    <div className={classes}></div>
                )
              break;
            default:
                inputElement = (
                    <div className={classes}></div>
                );
              break;
                    
        }
    
    }
    
    return inputElement ? inputElement: <div className={style.empty}></div>;
}

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Input);