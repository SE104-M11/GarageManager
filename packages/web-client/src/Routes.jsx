import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './Components/Layout';
import HomePage from './Containers/HomePage';
import { ImportAccessary, WageList, AccessaryList } from './Containers/AccessaryPage';
import { LogIn, SignUp, ForgotPassword, ChangePassword } from './Containers/LogIn';
import { CarList, CarReception, Bill } from './Containers/CarManagement';
import { RepairForm, RepairPage } from './Containers/RepairManagement';
import { SaleReportPage, SaleReportForm } from './Containers/SaleReportPage';
import { InventoryReport, InventoryReportForm } from './Containers/InventoryPage';
import SettingPage from './Containers/SettingPage';

function Routes() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/sales-report-page" component={SaleReportPage} />
          <Route path="/sales-report-form" component={SaleReportForm} />
          <Route path="/car-list" component={CarList} />
          <Route path="/car-reception" component={CarReception} />
          <Route path="/repair-form" component={RepairForm} />
          <Route path="/repair-page" component={RepairPage} />
          <Route path="/bill" component={Bill} />
          <Route path="/log-in" component={LogIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/change-password" component={ChangePassword} />
          <Route path="/inventory-report-page" component={InventoryReport} />
          <Route path="/inventory-report-form" component={InventoryReportForm} />
          <Route path="/setting" component={SettingPage} />
          <Route path="/import-accessary" component={ImportAccessary} />
          <Route path="/list-accessary" component={AccessaryList} />
          <Route path="/wage-list" component={WageList} />
          <Route path="/validate-account/:id" component={LogIn} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default Routes;
