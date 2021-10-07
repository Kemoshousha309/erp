import { Input } from "@material-ui/core";
import { t } from "../../lang";
import TabPanel from "../../../Components/UI/TabPanel/TabPanel";
import { hash } from "../../utilities";
import { tabTable } from "./tabTable";
import axios from "../../../axios"


export function TabsHandler() {
  const {
    state: {
      details: { tabs, current_tab },
    },
    props: { lanState, lanTable },
  } = this;


  return (
    <TabPanel
      lanState={lanState}
      lanTable={lanTable}
      tabs={tabs}
      current_tab={current_tab}
      changeHandler={(value) => changeHandler.call(this, value)}
    >
      {tabTable.call(this)}
    </TabPanel>
  );
}



function changeHandler(value) {
  const {
    state: { details },
  } = this;
  details.current_tab = value;
  this.setState({ details: details });
}


export function getDetails (record, i){
  const {details: {tabs}} = this.state
  const detailsPagesURLs = Object.keys(tabs).map(key => {
    tabs[key].pageURL.id = key
    return tabs[key].pageURL
  });
  detailsPagesURLs.forEach(pageURL => {
    const {master, temp, id} = pageURL;
    const url = `${temp}/${record[master]}/1`
    console.log(record)
    axios.get(url)
    .then((res) => {
      record[tabs[id].recordDetailPropName] = res.data;
      this.setState({record: record})
    })
    .catch(err => console.log(err))
  })
}