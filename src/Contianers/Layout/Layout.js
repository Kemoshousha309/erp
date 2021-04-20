import React, { Component } from "react";
import Navigation from "../../Components/Navigation/Navigation";
import SideTree from "../../Components/SideTree/SideTree";
import Aux from "../../hoc/Aux";
import MainScreen from "../MainScreen/MainScreen"
import Modal from "../../Components/UI/Modal/Modal";
import MobileNav from "../../Components/Navigation/MobileNav/MobileNav";
import {connect} from "react-redux"
import Spinner from "../../Components/UI/Spinner/Spinner";
import style from './Layout.module.scss';
import SideTreeMobView from "../../Components/SideTree/SideTreeMobView/SideTreeMobView";
import { checkAuthLocalStorage } from "../../store";

class Layout extends Component {
    state={
        sideNavActivity: false,
        moblieNav: false,
        SideTreeMobView: false
    }
    componentDidUpdate(){
        // console.log("Layout Update")
    }
    sideNavHandler = () => {
        const current = this.state.sideNavActivity;
        this.setState({sideNavActivity: !current})
    }

    mobileNavHandler = () =>{
        const current = this.state.moblieNav;
        this.setState({moblieNav: !current});
    }
    SideTreeMobViewHandler = () =>{
        const current = this.state.SideTreeMobView;
        this.setState({SideTreeMobView: !current});
    }
    componentDidMount () {
        this.props.checkAuth()
    }

    render(){
        let layout;
        if(this.props.langLoading && this.props.languages){    
            if(this.props.langTable){
                layout = (
                    <Aux>
                        {
                            this.state.moblieNav ? 
                            <Modal show={this.state.moblieNav} clicked={this.mobileNavHandler} >
                            <   MobileNav show={this.state.moblieNav} />
                            </Modal> : null
                        }
                        <div className={style.contianer} >
                        {
                            this.state.SideTreeMobView ? 
                            <SideTreeMobView 
                            SideTreeMobView={this.state.SideTreeMobView} 
                            clicked={this.SideTreeMobViewHandler}
                            />: null
                        }
                        {
                            !this.state.SideTreeMobView ? 
                            <SideTree 
                            {...this.props}
                            sideNavActivity={this.state.sideNavActivity}
                            sideNavClick={this.sideNavHandler}
                            SideTreeMobViewHandler ={this.SideTreeMobViewHandler}
                            />: null
                        }
                            <div className={style.right}>
                                <div className={style.navContianer}>
                                    <Navigation 
                                    sideNavClick={this.sideNavHandler}
                                    listIconClicked={this.mobileNavHandler} 
                                    SideTreeMobViewHandler={this.SideTreeMobViewHandler}
                                        />
                                </div>
                                <div className={style.screenContainer}>
                                    <MainScreen {...this.props} />
                                </div>
                            </div>
                            
                        </div>
                    
                    </Aux>
                )
            }else{
                layout = <h1>Something went wrong, please check out you network connection and try agian . . .</h1>
            }
        }else{
            layout = <div className={style.center}><Spinner color=" #222831" /></div>;
        }
        if(!this.props.isAuthed){
            layout = (
                <Aux>
                    <h1 className="m-5">You are not logged in, please login to continue</h1>
                    <button
                     onClick={()=> this.props.history.push("/login")} 
                     style={{fontSize: "2rem"}}
                     className="btn btn-outline-primary m-5" >Login</button>
                </Aux>
            )
        }
        
        return layout;
    }
}

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        langTable: state.lang.langTables,
        langLoading: state.lang.langLoading,
        isAuthed: !(state.auth.authData == null),
        languages: state.lang.langInfo
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
       checkAuth: () => dispatch(checkAuthLocalStorage())
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(Layout);