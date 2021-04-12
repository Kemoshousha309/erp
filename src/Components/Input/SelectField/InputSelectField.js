import React from "react"
import { connect } from "react-redux"
import { t } from "../../../utilities/lang"
import style from "./InputSelectField.module.scss"
import { TextField } from "@material-ui/core";
import { Component } from "react";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../../UI/Spinner/Spinner";
import { langNameChangeHandler } from "../../../utilities/processes";



class InputSelectField extends Component {
    state = {
        value: "", 
        lastPropValue: null,
        listShow: false,
    }
    static getDerivedStateFromProps(props, state){
        if(state.lastPropValue !== props.field.value){
            return{
                value: props.field.value,
                lastPropValue: props.field.value
            }
        }
        if(props.field.writability){
            return{
                listShow: false
            }
        }
        return null
    }
    optionClickHandler = (e) =>{
        const value = e.target.id
        this.props.changeHandler(value, this.props.field.id)
        this.setState({value: value, listShow: false})
    }

    dropListHandle = (e) => {
        const currentMode = this.state.listShow;
        if(!this.props.field.writability){
            this.setState({listShow: !currentMode})
        }
    }
    changeHandler = (e) => {
        langNameChangeHandler(this.props.field.id, e, this.props.languages)
        this.setState({value: e.target.value})
    } 
    componentDidUpdate () {
        langNameChangeHandler(this.props.field.id, this.state.value, this.props.languages)
    }
  render() {
        // console.log(`[InputSelectField] render`, this.state)
        const field = this.props.field
        const [iconDisable, dir, listShow, dropIcon] = decideClasses(this)
        let options = null
        if(field.options){
            options = field.options.map(op => {
                return (
                    <li key={op} onClick={this.optionClickHandler} id={op} >{op}</li>
                )
            })
        }
        return (
            <div className={style.container}>
                {field.validation.requiered ? <div className={style.required}></div> : null}
                <TextField 
                type={field.type ? field.type : "text"}
                error={!field.readOnly ? !field.valid : false}
                autoComplete="off"
                required={field.validation.requiered ? true : false}
                disabled={field.writability}
                value={this.state.value}
                variant="outlined" fullWidth 
                onChange = {this.changeHandler}
                onBlur ={(e) => this.props.changeHandler(this.state.value, field.id)} 
                id={field.id}  
                className={style.input}
                label={t(field.label, this.props.lanTable, this.props.lanState)} />
                <span  className={[style.icon, iconDisable, dir].join(' ')} onClick={() => this.dropListHandle()}>
                     <FontAwesomeIcon icon={dropIcon} />
                      </span>
                <ul className={[style.dropList, listShow].join(" ")}>
                    {options ? options : <Spinner color="#3F51B5" small />}
                </ul>
            </div>
        )
    }
}

const decideClasses = (thisK) =>{
    let iconDisable = null
    if(thisK.props.field.writability){iconDisable = style.disabledIcon}
    let dir = style.ltr
    if(parseInt(thisK.props.lanState) === 1){dir = style.rtl}
    let show = null;
    let icon = null
    if(thisK.state.listShow){
        show = style.show
        icon = faAngleUp
    }else{
        show = style.hidden
        icon = faAngleDown
    } 
    
    return [iconDisable, dir, show, icon]
}

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables,
        languages: state.lang.langInfo
    }
}


export default connect(mapStateToProps, null)(InputSelectField);

