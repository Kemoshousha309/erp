import React, { Component } from "react"
import Filter from "./Filter/Filter"
import Page from "./Page/Page"
import style from "./RecordDisplay.module.scss"
import { Pagination } from "@material-ui/lab"
import Spinner from "../UI/Spinner/Spinner"
import axios from "../../axios"
import { connect } from "react-redux"
import { Button } from "@material-ui/core"
import { extractRcordData, fillRecord, getPk } from "../../utilities/processes"
import { t } from "../../utilities/lang"


class RecordDisply extends Component {
    state = {
        firstTime: true,
        pages: null,
        page_no: 1,
        mode: "d",
        loading: false,
        firstLoad: true
    }
    static getDerivedStateFromProps(props, state){
        if(state.firstTime){
            const fields = {}
            props.mainFields.forEach(f => {
                fields[f] = ""
            })
            return {
                values: {...fields},
                firstTime: false
            }
        }
        return null
    }
    inputValueChangeHandler = (e, i) => {
        const valuesClone = this.state.values
        valuesClone[i] = e.target.value
        this.setState({values: valuesClone})
    }
    searchClickHandler = () => {
        this.filteredPagesRequest(1)
    }

    filteredPagesRequest = (page_no) => {
        const url = `/public/${this.props.tapRequest}/filteredPages/${page_no}` 
        this.setState({loading: true})
        let modeUpdate = "f"
        if(isEmpty(this.state.values)){
            modeUpdate = "d"
        }
        axios({
            method: 'post',
            url: url,
            headers:{Authorization: `Bearer ${this.props.token}`}, 
            data: this.state.values
            })
            .then(res => {
            this.setState({pages: res.data, page_no: page_no, mode: modeUpdate, loading: false})
            })
            .catch(err => console.log(err.data.message))
    }
    pagesRequest = (page_no) => {
        const url = `/public/${this.props.tapRequest}/pages/${page_no}` 
        this.setState({loading: true})
            axios.get(url)
            .then(res => {
                this.setState({pages: res.data, page_no: page_no, loading: false})
            })
            .catch(err => console.log(err))
    }
    paginationHandler = (page_no) => {
        if(this.state.mode === "d"){
            this.pagesRequest(page_no)
        }else if(this.state.mode === "f"){
            this.filteredPagesRequest(page_no)
        }
    }
    recordClick = (e, i) =>{
        const targetRecord = this.state.pages.pages[i]
        const recordData = extractRcordData(this.props.mainFields, targetRecord)
        let index = null
        this.setState({loading: true})
            const pk = getPk(this.props.TapFields)
            axios.get(`/public/${this.props.tapRequest}/pageNo/${recordData[pk]}/${recordData.lang_no}`)
            .then(res => {
                index = res.data.page_no
                this.setState({loading: false})
                this.props.recordClick(recordData, index, targetRecord)
            })
            .catch(err => console.log(err))
    }
    componentDidMount () {
        this.pagesRequest(1)
    }
    render() {
        let content = null
        if(this.state.pages){
            content = (
                <div id="R_D">
                    <Filter 
                    fields={this.props.mainFields} 
                    searchClick={this.searchClickHandler}
                    inputValueChangeHandler={this.inputValueChangeHandler} />
                    <Page  fields={this.props.mainFields} recordClick={this.recordClick} page={this.state.pages} />
                    <div className={style.loadingArea}>{this.state.loading ? <Spinner color="#3F51B5" small /> : null}</div>
                    <div className={style.pagContainer}>
                        <Pagination 
                        onChange={(e, v) => this.paginationHandler(v)}
                        count={this.state.pages.pages_count} 
                        page={this.state.page_no}  
                        color="primary" />
                    </div>
                    <div className={style.closeContainer}>
                        <Button onClick={this.props.modalClose} color="secondary">
                            {t("close", this.props.lanTable, this.props.lanState)}
                        </Button>
                    </div>
                </div>
            )
        }else{
            content = <Spinner color="#3F51B5" />
        }
        return  content
    }
}

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables,
        token: state.auth.authData.token
    }
}

const isEmpty = (obj) => {
    let empty = true
    for(const k in obj){
        empty = obj[k] === "" && empty
    }
    return empty
}


export default connect(mapStateToProps, null)(RecordDisply);