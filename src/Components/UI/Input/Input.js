import React from "react";
import style from "./Input.module.scss";
import { connect } from "react-redux";
import { t } from "../../../utilities";

const Input = props => {
    let classes;
    switch((props.inputType.trim())) {
        case "input":
           classes=[style.input,"form-control"]
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
    if(!props.validitiy &&  props.touched){
        classes.push(style.inValid)
    } 
    classes = classes.join(' ');
    
    let GrStyle = null;
    if(props.GrStyle){
        GrStyle = props.GrStyle;
    }
    let inStyle = null;
    if(props.inStyle){
        inStyle = props.inStyle;
    }

    let inputElement;
    if(props.inputType){
        switch((props.inputType.trim())) {
            case "input":
                inputElement = (
                    <div style={GrStyle} className={[style.inputGroup, "form-group "].join(' ')}>
                        <label htmlFor={props.config.id} className={style.label}>{t(props.label, props.lanTable, props.lanState)} :</label>
                        <input style={inStyle} disabled={props.disability} onChange={props.changed} className={classes} 
                        placeholder={t(props.placeholder, props.lanTable, props.lanState)} {...props.config} 
                        value={props.value} 
                        />
                    </div>
                )
              break;
            case "checkbox":
                inputElement = (
                    <div style={GrStyle} style={{justifyContent: "start"}} className={[style.inputGroup, "form-group"].join(' ')}>
                        <label htmlFor={props.config.id} className={style.label}>{t(props.label, props.lanTable, props.lanState)} :</label>
                        <input style={inStyle} disabled={props.disability} type="checkbox"   onChange={props.changed} 
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
                        <input style={inStyle} disabled={props.disability} type="radio" onChange={props.changed} 
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
                        <textarea style={inStyle} disabled={props.disability} onChange={props.changed} className={classes} 
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
                        <select style={inStyle} disabled={props.disability} onChange={props.changed} className={classes}
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