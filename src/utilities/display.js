import Input from "../Components/Input/input";
import React from "react";
import Aux from "../hoc/Aux";

const doubleItems = (array) =>{
    let finalArr = [];
    for(let i = 0; i < array.length; i=i+2){
        if(array.length % 2 === 0){
            const doubleArr = [array[i] , array[i+1]];
            finalArr.push(doubleArr)
        }else{
            const doubleArr = [array[i] , array[i+1]];
            finalArr.push(doubleArr)
            const lastItem = finalArr[finalArr.length-1]
            lastItem.pop()
        }
    }
    return finalArr;
}

const gridContent = (fields) => {
    // console.log("[gridContent func] render")
    const fieldsArr = [];
    for(let key in fields){
        const fieldobj = {
            id: key,
            ...fields[key]
        }
        fieldsArr.push(fieldobj);
    }
    const doubleArr = doubleItems(fieldsArr);
    return doubleArr
}



const inputField = (field, changeHandler) => {
    // console.log("[input func] render")
    return (
        <Input 
            field={field}
            changeHandler={changeHandler} />
    )
}



export const displayPattren = (fields, changeHandler) => {
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
                        {inputField(item1, changeHandler)}
                    </div>
                    <div className="col-md-6  px-0">
                        {inputField(item2, changeHandler)}
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
                            {inputField(item1, changeHandler)}
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
