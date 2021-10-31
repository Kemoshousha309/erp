import { fields } from "../fields"
import axois from "../../../../axios"

// copy handle ******************************
export const handleCopy = (thisK) => {
    fields(thisK.state.fields, "open", false)
    thisK.setState({mode: "copy"})

     // apply auto increment primary key 
     const pkPropName = thisK.state.pks[0];
     let fieldsClone = {...thisK.state.fields}
     if(thisK.state.fields[pkPropName].autoIncrement){
         axois.get(`${thisK.state.fields[pkPropName].autoIncrement}`)
         .then(res => {
             fieldsClone[pkPropName].value = res.data.next_PK
             thisK.setState({fields: fieldsClone})
         })
         .catch(err => console.log(err))
     }
     thisK.setState({mode: "add", fields: fieldsClone})
}
