import React from "react";
import style from "./Filter.module.scss"
import {faSearch} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@material-ui/core";
import { Component } from "react";
import { t } from "../../../utilities/lang";
import { connect } from "react-redux";
import { trigerEnterButton } from "../../../utilities/tap/utilities";

class Filter extends Component {
    componentDidMount () {
        this.props.fields.map((f,i) => {
            const id = `${f}${i}100`
            trigerEnterButton(id, this.props.searchClick)
            return null
        })
    }
    render() {
        const colSpan = 12 / this.props.fields.length
        const searchFields = this.props.fields.map((f, i) => {
            const id = `${f}${i}100`
            let type = "text"
            if(f === "lang_no"){type = "number"}
            return (
                <div key={i} className={`col-sm-${colSpan}`}>
                    <TextField 
                    type={type}
                    id={id}
                    onBlur={(e) => this.props.inputValueChangeHandler(e, f)}
                    autoComplete="off"
                    variant="standard" fullWidth 
                    label={t(f, this.props.lanTable, this.props.lanState)} />
                </div>
            )
        })
        
        return(
            <div className={style.Filter}>
                    <div className="row">
                        {searchFields}
                    </div>
                <span>
                    <FontAwesomeIcon icon={faSearch} onClick={this.props.searchClick} />
                </span>
            </div>
        )
    }
} 


const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables
    }
}


export default connect(mapStateToProps, null)(Filter);