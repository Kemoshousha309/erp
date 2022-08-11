import React, { PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import style from './MainScreen.module.scss';
import SkeletonLoader from '../../Components/UI/SkeletonLoader/SkeletonLoader';

const Users = React.lazy(() => import('../../System/Screens/Users/Users'));
const UsersGroups = React.lazy(() => import('../../System/Screens/UsersGroups/UsersGroups'));
const InternalCoding = React.lazy(() => import('../../System/Screens/InternalCoding/InternalCoding'));
const FinancialCoding = React.lazy(() => import('../../System/Screens/FinancialCoding/FinancialCoding'));
const GeographicalData = React.lazy(() => import('../../System/Screens/GeographicalData/GeographicalData'));
const Companies_Branches = React.lazy(() => import('../../System/Screens/Companies_Branches/Companies_Branches'));
const ScreenPrivs = React.lazy(() => import('../../System/Screens/ScreenPrivs/ScreenPrivs'));
const InputPrivs = React.lazy(() => import('../../System/Screens/InputPrivs/InputPrivs'));
const SystemCommands = React.lazy(() => import('../../System/Screens/SystemCommands/SystemCommands'));
const Currency = React.lazy(() => import('../../System/Screens/Currency/Currency'));
const ChartsOfAccounts = React.lazy(() => import('../../System/Screens/ChartsOfAccounts/ChartsOfAccounts'));
const EmployeeInformation = React.lazy(() => import('../../System/Screens/EmployeeInformation/EmployeeInformation'));
const CostCenter = React.lazy(() => import('../../System/Screens/CostCenter/CostCenter'));
const Banks = React.lazy(() => import('../../System/Screens/Banks/Banks'));
const Cash = React.lazy(() => import('../../System/Screens/Cash/Cash'));


/**
 * A component responsible for rendering the matched screen with url
 */
class MainScreen extends PureComponent {
  /**
   * - decide the style state ar | en
   * - link to the matched rout (component)
   * @returns a route to the the matched screen
   */
  componentDidMount() {
    console.log("mainscreen mount")
  }
  render() {
    console.log("MainScreen render ")
    let lanState;
    if (parseInt(this.props.lanState) === 2) {
      lanState = style.arState;
    } else if (parseInt(this.props.lanState) === 1) {
      lanState = style.enState;
    }
    const classes = [style.MainScreen,
      lanState,
    ].join(' ');

    const rootPath = this.props.match.path;

    return (
      <div className={classes}>
        <Suspense fallback={<SkeletonLoader type="Bp" />}>
          <Switch>
            <Route path={`${rootPath}/internal-coding`} exact component={InternalCoding} />
            <Route path={`${rootPath}/geographical-data`} exact component={GeographicalData} />
            <Route path={`${rootPath}/companies-barnches`} exact component={Companies_Branches} />
            <Route path={`${rootPath}/users-groups`} exact component={UsersGroups} />
            <Route path={`${rootPath}/users-data`} exact component={Users} />
            <Route path={`${rootPath}/screen-previlleges`} exact component={ScreenPrivs} />
            <Route path={`${rootPath}/input-previlleges`} exact component={InputPrivs} />
            <Route path={`${rootPath}/system-commands`} exact component={SystemCommands} />
            <Route path={`${rootPath}/currency`} exact component={Currency} />
            <Route path={`${rootPath}/financial-coding`} exact component={FinancialCoding} />
            <Route path={`${rootPath}/accounts-charts`} exact component={ChartsOfAccounts} />
            <Route path={`${rootPath}/employee-info`} exact component={EmployeeInformation} />
            <Route path={`${rootPath}/cost-center`} exact component={CostCenter} />
            <Route path={`${rootPath}/Banks`} exact component={Banks} />
            <Route path={`${rootPath}/cash`} exact component={Cash} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ 
  lanState: state.lang.lan,
  lanTable: state.lang.langTables,
});

export default connect(mapStateToProps, null)(MainScreen);
