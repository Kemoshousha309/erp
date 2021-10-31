import TabPanel from "../../../../Components/UI/TabPanel/TabPanel";
import { tabTable } from "./tabTable";
import axios from "../../../../axios"


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
  const {details: {tabs}, details} = this.state
  const detailsPagesURLs = Object.keys(tabs).map(key => {
    tabs[key].pageURL.id = key
    return tabs[key].pageURL
  });
  detailsPagesURLs.forEach(pageURL => {
    const {master, temp, id} = pageURL
    const url = `${temp}/${record[master]}`
    console.log(url)
    this.setState({details: {...details, loading: true}})
    axios.get(url)
    .then((res) => {
      record[tabs[id].recordDetailPropName] = res.data[tabs[id].recordDetailPropName];
      this.setState({record: record, details: {...details, loading: false}})
    })
    .catch(err => console.log(err))
  })
}


