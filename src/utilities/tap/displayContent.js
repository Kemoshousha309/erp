import React from "react"
import AlertDialog from "../../Components/AlertDialog/AlertDialog"
import Boilerplate from "../../Components/Boilerplate/Boilerplate"
import RecordDisplay from "../../Components/RecordDisplay/RecordDisplay"
import ShortCutsList from "../../Components/ShortCutsList/ShortCutsList"
import { displayPattren, displayPattrenTree } from "./../display"
import { t } from "../lang"


export const displayContent = (thisK) => {
    let content = null
    if(thisK.state.tree === null || thisK.state.tree){
        content = displayPattrenTree(thisK.state.fields, thisK.inputChange, thisK, thisK.state.tree)
    }else {
        content = displayPattren(thisK.state.fields, thisK.inputChange, thisK)
    }
    return  (
        <div id="tap">
            {thisK.state.listShow ?
            <RecordDisplay 
                urls={thisK.state.urls}
                modalClose={thisK.closeList} 
                recordClick={thisK.recordClick} 
                pks={thisK.state.pks}
                mainFields={thisK.state.mainFields} /> : null}
                {fkList(thisK)}
            <Boilerplate
            dropDown={thisK.props.dropDown}
            toolsClicked={thisK.toolsClickedHandler}
            tools={thisK.state.tools}
            loading={thisK.state.loading}
            message={thisK.state.message}>
                {content}
            </Boilerplate>
            <AlertDialog open={thisK.state.deleteConfirm} handleClose={thisK.deleteConfirmation} >
                {t("delete_confirm", thisK.props.lanTable, thisK.props.lanState)}
            </AlertDialog>
            {thisK.state.ShortCutsList ? <ShortCutsList close={thisK.ShortCutsListCloseHandler} /> : null}
        </div>
    )
}


const fkList = (thisK) => {
    let fk = null
    if(thisK.state.fkListShow){
        fk = thisK.state.fkListShow
    }
    return (
        thisK.state.fkListShow ?
            <RecordDisplay 
            urls={thisK.state.fkList[fk].urls}
            modalClose={thisK.closeFkList}  
            recordClick={thisK.recordFkClick} 
            fk
            mainFields={thisK.state.fkList[fk].mainFields} /> : null
    )
}