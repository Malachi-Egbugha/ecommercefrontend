import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import Home from './Pages/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './Pages/UserDashboard';
import AdminDashboard from './Pages/AdminDashboard';
import AdminRoute from './auth/AdminRoute';
import AddCategory from './Pages/admin/AddCategory';
import AddProduct from './Pages/admin/Addproduct';

const Routes = () =>{
    return(<BrowserRouter>
  
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/signin" exact component={Signin}/>
            <Route path="/signup" exact component={Signup}/>
            <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
            <AdminRoute path="/create/category" exact component={AddCategory}/>
            <AdminRoute path="/create/product" exact component={AddProduct}/>
        </Switch>
    </BrowserRouter>);
};
export default Routes;