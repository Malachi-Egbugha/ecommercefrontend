import React, {useState} from "react";
import Layout from "../component/Layout";
import {Redirect} from 'react-router-dom';
import {signin, authenticate, isAuthenticated} from '../auth';


const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });
    const {email, password,error,loading, redirectToReferrer} = values;
    const {user} = isAuthenticated();
    const handleChange = name => event =>{
        setValues({...values, error: false, [name]: event.target.value});

    };
    
    const clickSubmit = (event) =>{
        event.preventDefault();
        setValues({...values, error: false, loading: true});
        signin({email,password})
        .then(data => {
            if(data.error){
                setValues({...values, error:data.error,loading: false});
            }else{
                authenticate(data, () => {
                    setValues({...values,redirectToReferrer: true});
                });
            }
        });
        
    };
    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-mute">Email</label>
                <input onChange={handleChange('email')} value={email}  type="email" className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-mute">Password</label>
                <input onChange={handleChange('password')} value={password}  type="password" className="form-control"/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
            </form>
    );
    const showError = () => (
    <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
         {error}
      
    </div>
    );
    const showLoading = () => (
       loading && (
       <div className="alert alert-info">
           <h2>Loading...</h2>

       </div>)
    );
    const redirectUser = () =>{
        if(redirectToReferrer){
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard"/>

            }
            else{
                return <Redirect to="/user/dashboard"/>
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/"/>

        }
    };
return(
    <Layout title="Signin" description="Sign in Node React E-commerce App" className="container col-md-8 offset-md-2">
        {showError()}
        {showLoading()}
        {redirectUser()}
        {signUpForm()}
        
       
    </Layout>
);
}

export default Signin

 