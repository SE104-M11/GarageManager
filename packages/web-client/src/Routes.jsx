import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './Containers/HomePage';
import CustomerPage from './Containers/CustomerPage';
//import AccessaryPage from './Containers/AccessaryPage';
import ImportAccessary from './Containers/AccessaryPage/ImportAccessary';
import ListAccessary from './Containers/AccessaryPage/ManagerList';
import ListWage from './Containers/Wage/ManagerList';


import Layout from './Components/Layout';

function Routes() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/customer" component={CustomerPage} />
          {/*<Route path="/accessary" component={AccessaryPage} />*/}
          <Route path="/import-accessary" component={ImportAccessary} />
          <Route path="/list-accessary" component={ListAccessary} />
          <Route path="/wage" component={ListWage} />

        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default Routes;
