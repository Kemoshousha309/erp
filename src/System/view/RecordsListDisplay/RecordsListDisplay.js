import React, { PureComponent } from "react";
import Filter from "./Filter/Filter";
import Page from "./Page/Page";
import style from "./RecordsListDisplay.module.scss";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import axios from "../../../axios";
import { Button, Pagination } from "@mui/material";
import Modal from "../../../Components/UI/Modal/Modal";
import { store } from "../../../index";
import { logout } from "../../../Context";
import { t } from "../../../Languages/languages";
import { getPkUrl } from "../../model/screen/handlers/fields";


class RecordsListDisplay extends PureComponent {
  state = {
    firstTime: true,
    pages: null,
    page_no: 1,
    mode: "d", // mode d for display without filter , f for filtered
    loading: false,
    firstLoad: true,
    show: true,
    networkError: false,
  };
  // IN SERVER
  // page refers to on record
  // pages refers to a set of records
  // IN CLIENT
  // page means the page of list of records
  static getDerivedStateFromProps(props, state) {
    // attach the main fields defined in the parent screen to local state
    if (state.firstTime) {
      const fields = {};
      props.mainFields.forEach((f) => {
        if (typeof f === "object") {
          fields[f.propName] = "";
        } else {
          fields[f] = "";
        }
      });
      return {
        values: { ...fields },
        firstTime: false,
      };
    }
    return null;
  }
  inputValueChangeHandler = (e, i) => {
    // update the value of filters on blur
    const valuesClone = this.state.values;
    valuesClone[i] = e.target.value;
    this.setState({ values: valuesClone });
  };
  searchClickHandler = () => {
    // click on the search icon at the filter
    this.filteredPagesRequest(1);
  };

  filteredPagesRequest = (page_no) => {
    const {
      props: { filterBody, urls },
      state: { values },
    } = this;
    const url = `${urls.filter}/${page_no}`;
    this.setState({ loading: true });
    let modeUpdate = "f";
    if (isEmpty(values)) {
      modeUpdate = "d";
    }
    let data = values
    if (filterBody) {
      data = applyFilterBody(filterBody, values)
    }
    axios({
      method: "post",
      url: url,
      data: data,
    })
      .then((res) => {
        this.setState({
          pages: res.data,
          page_no: page_no,
          mode: modeUpdate,
          loading: false,
        });
      })
      .catch((err) => console.log(err.response));
  };

  pagesRequest = (page_no) => {
    // request the  pages with in general
    const url = `${this.props.urls.pages}/${page_no}`;
    this.setState({ loading: true });
    axios
      .get(url)
      .then((res) => {
        this.setState({ pages: res.data, page_no: page_no, loading: false });
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          // update the previlleges
          if (err.response.status === 401) {
            store.dispatch(logout());
          }
        } else {
          this.setState({ networkError: true });
        }
      });
  };
  paginationHandler = (page_no) => {
    if (this.state.mode === "d") {
      document.getElementById("pageContainer").scrollTo({
        top: 0,
        behavior: "smooth",
      });
      this.pagesRequest(page_no);
    } else if (this.state.mode === "f") {
      this.filteredPagesRequest(page_no);
    }
  };
  recordClick = (e, i) => {
    const {
      state: { pages },
      props: { recordClick, pks, urls, fk },
    } = this;
    const targetRecord = pages.pages[i];
    if (fk) {
      // call the recordClick which attached to the fkRecordClick on the main screen
      recordClick(targetRecord, null);
    } else {
      // get the page_no (index) of the record form the database  to use it to now the current
      // index of the displayed record to make use of it in the next, prev, first and last functions
      let index = null;
      this.setState({ loading: true });
      const urlPk = getPkUrl(pks, targetRecord);
      const url = `${urls.pageNo}${urlPk}`;
      axios
        .get(url)
        .then((res) => {
          index = res.data.page_no;
          this.setState({ loading: false });
          recordClick(targetRecord, index);
        })
        .catch((err) => console.log(err));
    }
  };
  componentDidMount() {
    if (this.props.filterBody) {
      // this means that there is some filtration should be applied
      this.filteredPagesRequest(1);
    } else {
      this.pagesRequest(1);
    }
  }
  render() {
    const {
      state: { pages, loading, page_no, networkError },
      props: { mainFields, modalClose },
      searchClickHandler,
      inputValueChangeHandler,
      recordClick,
      paginationHandler,
    } = this;

    let content = null;
    if (pages) {
      content = (
        <div id="R_D">
          <Filter
            fields={mainFields}
            searchClick={searchClickHandler}
            inputValueChangeHandler={inputValueChangeHandler}
          />
          <Page
            fields={mainFields}
            recordClick={recordClick}
            page={pages.pages}
          />
          <div className={style.loadingArea}>
            {loading ? <Spinner color="#3F51B5" small /> : null}
          </div>
          <div className={style.pagContainer}>
            <Pagination
              onChange={(e, v) => paginationHandler(v)}
              count={pages.pages_count}
              page={page_no}
              color="primary"
            />
          </div>
          <div className={style.closeContainer}>
            <Button onClick={modalClose} color="secondary">
              {t("close")}
            </Button>
          </div>
        </div>
      );
    } else {
      content = <Spinner color="#3F51B5" />;
    }

    let returned = (
      <Modal show clicked={modalClose}>
        {" "}
        {content}
      </Modal>
    );
    if (networkError) {
      returned = null;
    }

    return returned;
  }
}


const isEmpty = (obj) => {
  let empty = true;
  for (const k in obj) {
    empty = obj[k] === "" && empty;
  }
  return empty;
};

export default RecordsListDisplay;


function applyFilterBody(filterBody, values) {
  // should return obj with values 
  Object.keys(values).forEach(key => {
    filterBody[key] = values[key];
  })
  return filterBody;
}