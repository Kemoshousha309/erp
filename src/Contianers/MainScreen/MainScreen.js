import React, { PureComponent, Suspense } from "react";
import { connect } from "react-redux";
import style from "./MainScreen.module.scss";
import { Route, Switch } from "react-router";
import Aux from "../../hoc/wrap";
import SkeletonLoader from "../../Components/UI/SkeletonLoader/SkeletonLoader";

const Users = React.lazy(() => import("../Screens/Users/Users"))
const UsersGroups = React.lazy(() => import("../Screens/UsersGroups/UsersGroups"))
const InternalCoding = React.lazy(() => import( "../Screens/InternalCoding/InternalCoding"))
const FinancialCoding = React.lazy(() => import( "../Screens/FinancialCoding/FinancialCoding"))
const GeographicalData = React.lazy(() => import( "../Screens/GeographicalData/GeographicalData"))
const Companies_Branches = React.lazy(() => import( "../Screens/Companies_Branches/Companies_Branches"))
const ScreenPrivs = React.lazy(() => import( "../Screens/ScreenPrivs/ScreenPrivs"))
const InputPrivs = React.lazy(() => import( "../Screens/InputPrivs/InputPrivs"))
const SystemCommands = React.lazy(() => import( "../Screens/SystemCommands/SystemCommands.js"))
const Currency = React.lazy(() => import( "../Screens/Currency/Currency"))
const ChartsOfAccounts = React.lazy(() => import( "../Screens/ChartsOfAccounts/ChartsOfAccounts"))
const EmployeeInformations = React.lazy(() => import( "../Screens/EmployeeInformations/EmployeeInformations"))
const CostCenter = React.lazy(() => import( "../Screens/CostCenter/CostCenter"))



class MainScreen extends PureComponent  {
    render(){

        let lanState;
        if(parseInt(this.props.lanState) === 2){
            lanState = style.arState;
        } else if(parseInt(this.props.lanState) === 1) {
            lanState = style.enState;
        }
        const classes = [style.MainScreen,
            lanState
        ].join(" ");

        const rootPath = this.props.match.path;
        
        return(
            <Aux>
                <div className={classes} >
                    <Suspense fallback={<SkeletonLoader type="Bp"/>}>
                        <Switch>
                            <Route path={rootPath +"/internal-coding"} exact component={InternalCoding} />
                            <Route path={rootPath +"/geographical-data"} exact component={GeographicalData} />
                            <Route path={rootPath +"/companies-barnches"} exact component={Companies_Branches} />
                            <Route path={rootPath +"/users-groups"} exact component={UsersGroups} />
                            <Route path={rootPath +"/users-data"} exact component={Users} />
                            <Route path={rootPath +"/screen-previlleges"} exact component={ScreenPrivs} />
                            <Route path={rootPath +"/input-previlleges"} exact component={InputPrivs} />
                            <Route path={rootPath +"/system-commands"} exact component={SystemCommands} />
                            <Route path={rootPath +"/currency"} exact component={Currency} />
                            <Route path={rootPath +"/financial-coding"} exact component={FinancialCoding} />
                            <Route path={rootPath +"/accounts-charts"} exact component={ChartsOfAccounts} />
                            <Route path={rootPath +"/empolyee-info"} exact component={EmployeeInformations} />
                            <Route path={rootPath +"/cost-center"} exact component={CostCenter} />
                        </Switch>
                    </Suspense>
                </div>
            </Aux>
        )   
    }
}

const mapStateToProps = state => {
    return {
        lanState: state.lang.lan,
        lanTable: state.lang.langTables
    }
}



export default connect(mapStateToProps, null)(MainScreen);