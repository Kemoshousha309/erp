/**
 * @module displayPatterns
 */

import InputFields from "./InputFields";

 
 const formatItems = (array, format) => {
   const finalArr = [];
   for (let i = 0; i < array.length; i += format) {
     const triArr = [];
     for (let n = 0; n < format; n++) {
       const item = array[i + n];
       if (item) {
         triArr.push(item);
       }
     }
     finalArr.push(triArr);
   }
   return finalArr;
 };
 
 /**
  * build the structured arr with suitable grid to display
  * @param {Object} fields the fields object that is in the screen state
  * @param {number} grid describe the grid shape of the inputs
  * @returns {Array} array of structured fields based on the fields
  */
 const gridContent = (fields, grid) => {
   // console.log("[gridContent func] render")
   const fieldsArr = [];
   for (const key in fields) {
     let fieldObj;
     if (!fields[key].hide) {
       if (fields[key].id) {
         fieldObj = {
           ...fields[key],
         };
         fieldsArr.push(fieldObj);
       } else {
         fieldObj = {
           id: key,
           ...fields[key],
         };
         fieldsArr.push(fieldObj);
       }
     }
   }
   const Arr = formatItems(fieldsArr, grid);
   return Arr;
 };
 
 /**
  * build the inputs jsx based on the grid type and fields
  * @param {Object} screen screen
  * @returns jsx a content of inputs based on the grid type
  */
 export const DisplayFieldsGrid = ({ screen }) => {
   const {
     state: { fields, gridType },
   } = screen;
   const grid = gridType ? gridType : 2;
 
   let colSpan;
   switch (grid) {
     case 2:
       colSpan = 6;
       break;
     case 3:
       colSpan = 4;
       break;
     default:
       break;
   }
 
   const gridArr = gridContent(fields, grid);
   const content = gridArr.map((row, i) => {
     let rowStyle = { paddingTop: "1rem" };
 
     const rowContent = row.map((col, index) => {
       if (["holder", "line"].includes(col.fieldType)) {
         rowStyle.paddingTop = "0";
       }
       if (col.rowStyle) {
         rowStyle = {
           ...rowStyle,
           ...col.rowStyle,
         };
       }
       return (
         <div
           style={col.columnStyle}
           key={index}
           className={`col-md-${colSpan}`}
         >
           <InputFields field={col} screen={screen} />
         </div>
       );
     });
 
     return (
       <div key={i} style={rowStyle} className="row">
         {rowContent}
       </div>
     );
   });
 
   return content;
 };
 