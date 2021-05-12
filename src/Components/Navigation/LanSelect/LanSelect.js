import React from "react";
import style from "./LanSelect.module.scss"
import {connect} from "react-redux"
import { changeLnaguage } from "../../../store";
import { t } from "../../../utilities/lang";
import Aux from "../../../hoc/wrap";

const LanSelect = props => {
    // console.log("LanSelect render")
    let optionOrder = null;
    let value = null
    if(parseInt(props.lanState) === 1){
        value = t("lang",props.langTable, 1)
        optionOrder = (
            <Aux>
                <option value={1}>{t("lang",props.langTable, 1)}</option>
                <option value={2}>{t("lang",props.langTable, 2)}</option>
            </Aux>
        )
    }else if(parseInt(props.lanState) === 2){
        value = t("lang",props.langTable, 2)
        optionOrder = (
            <Aux>
                <option value={2}>{t("lang",props.langTable, 2)}</option>
                <option value={1}>{t("lang",props.langTable, 1)}</option>
            </Aux>
        )
    }
    return(
        <select disabled={!props.langChangeActive} className={[style.LanSelect, ].join(" ")} style={props.style} value={value} onChange={(event) => props.onLanguageChange(event.target.value)} >
            {optionOrder}
        </select>
    )
}

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        langTable: state.lang.langTables,
        langChangeActive: state.lang.langChangeActive
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLanguageChange: (langValue) => dispatch(changeLnaguage(langValue))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(LanSelect);
