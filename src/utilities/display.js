import Input from "../Components/Input/input";
import Treeview from "../Components/Treeview/Treeview";

const formatItems = (array, format) => {
  let finalArr = [];
  for (let i = 0; i < array.length; i = i + format) {
    const tribleArr = [];
    for (let n = 0; n < format; n++) {
      const item = array[i + n];
      if (item) {
        tribleArr.push(item);
      }
    }
    finalArr.push(tribleArr);
  }
  return finalArr;
};

const gridContent = (fields, grid) => {
  // console.log("[gridContent func] render")
  const fieldsArr = [];
  for (let key in fields) {
    let fieldobj;
    if (!fields[key].hide) {
      if (fields[key].id) {
        fieldobj = {
          ...fields[key],
        };
        fieldsArr.push(fieldobj);
      } else {
        fieldobj = {
          id: key,
          ...fields[key],
        };
        fieldsArr.push(fieldobj);
      }
    }
  }
  const Arr = formatItems(fieldsArr, grid);
  return Arr;
};

const inputField = (field, changeHandler, thisK) => {
  // console.log("[input func] render")
  return <Input field={field} changeHandler={changeHandler} thisK={thisK} />;
};

const displayGrid = (fields, gridType, changeHandler, thisK) => {
  let colSpan;
  switch (gridType) {
    case 2:
      colSpan = 6;
      break;
    case 3:
      colSpan = 4;
      break;
    default:
      break;
  }

  const gridArr = gridContent(fields, gridType);
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
          {inputField(col, changeHandler, thisK)}
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

export const displayPattren = (fields, changeHandler, thisK, additional) => {
  // console.log("[displayPattren func] render")
  let tapContent = displayGrid(fields, 2, changeHandler, thisK);
  if (thisK.state.gridType) {
    tapContent = displayGrid(
      fields,
      thisK.state.gridType,
      changeHandler,
      thisK
    );
  }
  return (
    <form>
      {tapContent} {additional}
    </form>
  );
};


export const displayPattrenTree = (
  fields,
  changeHandler,
  thisK,
  tree,
  additional
) => {
  let tapContent = displayGrid(fields, 2, changeHandler, thisK);
  if (thisK.state.gridType) {
    tapContent = displayGrid(
      fields,
      thisK.state.gridType,
      changeHandler,
      thisK
    );
  }
  return (
    <div className="row px-3 mt-4">
      <div className="col-sm-8 px-0">
        <form>
          {tapContent}
          {additional}
        </form>
      </div>
      <div className="col-sm-4 px-0 ">
        <Treeview thisK={thisK} tree={tree} loading={thisK.state.treeLoading} />
      </div>
    </div>
  );
};
