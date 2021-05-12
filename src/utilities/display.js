import Input from "../Components/Input/input";
import React from "react";
import Aux from "../hoc/wrap";
import Treeview from "../Components/Treeview/Treeview";

const doubleItems = (array) =>{
    let finalArr = [];
    for(let i = 0; i < array.length; i=i+2){
        if(array.length % 2 === 0){
            const doubleArr = [array[i] , array[i+1]];
            finalArr.push(doubleArr)
        }else{
            const doubleArr = [array[i] , array[i+1]];
            finalArr.push(doubleArr)

        }
    }
    return finalArr;
}

const gridContent = (fields) => {
    // console.log("[gridContent func] render")
    const fieldsArr = [];
    for(let key in fields){
        let fieldobj;
        if(fields[key].id){
            console.log(fields[key].id)
            fieldobj = {
                ...fields[key]
            }
            fieldsArr.push(fieldobj);
        }else{
            fieldobj = {
                id: key,
                ...fields[key]
            }
            fieldsArr.push(fieldobj);
        }
    }
    const doubleArr = doubleItems(fieldsArr);
    return doubleArr
}



const inputField = (field, changeHandler, thisK) => {
    // console.log("[input func] render")
    return (
        <Input 
            field={field}
            changeHandler={changeHandler} 
            thisK={thisK} />
    )
}



export const displayPattren = (fields, changeHandler, thisK) => {
    // console.log("[displayPattren func] render")
    const doubleArr = gridContent(fields)
        const tapContent = doubleArr.map(ele => {
            const item1 =ele[0];
            const item2 = ele[1];
            let content = null;
            if(item2){
                content = (
                    <Aux>
                    <div className="col-md-6  px-0">
                        {inputField(item1, changeHandler, thisK)}
                    </div>
                    <div className="col-md-6  px-0">
                        {inputField(item2, changeHandler, thisK)}
                    </div>
                     {// consider three column layout
                     /* <div className="col-md-4 px-0">
                        {inputField(item1, changeHandler)}
                    </div>
                    <div className="col-md-4 px-0">
                        {inputField(item2, changeHandler)}
                    </div>
                    <div className="col-md-4 px-0">
                        {inputField(item2, changeHandler)}
                    </div> */}
                </Aux>
                )
            }else{
                content = (
                    <Aux>
                        <div className="col-md-6 px-0">
                            {inputField(item1, changeHandler, thisK)}
                        </div>
                        <div className="col-md-6 px-0"></div>
                    </Aux>
                )
            }
            return (
                <div key={item1.id}  className="row px-3">
                    { content}
                </div>
            )
        })
        
        return tapContent;
}

export const displayPattrenTree = (fields, changeHandler, thisK, tree) => {
    const fieldsArr = [];
    for(let key in fields){
        let fieldobj;
        if(fields[key].id){
            console.log(fields[key].id)
            fieldobj = {
                ...fields[key]
            }
            fieldsArr.push(fieldobj);
        }else{
            fieldobj = {
                id: key,
                ...fields[key]
            }
            fieldsArr.push(fieldobj);
        }
    }
    const content = fieldsArr.map(f => {
        return (
            <div key={f.id} >
                {inputField(f, changeHandler, thisK)}
            </div>
        )
    })
    return (
        <div   className="row px-3">
            <div className="col-sm-8 px-0" >{content}</div>
            <div className="col-sm-4 px-0" ><Treeview thisK={thisK} tree={tree} /></div>
        </div>
    )    
}   