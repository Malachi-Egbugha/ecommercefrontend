import React, {useState} from "react";
import Layout from "../../component/Layout";
import {isAuthenticated} from '../../auth';
import {Link} from 'react-router-dom';
import {createCategory} from './apiAdmin';

const AddCategory = () =>{
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // destructuring
    const {user, token} = isAuthenticated();
    const handleChange =(e) => {
        setError('');
        setName(e.target.value);
        setSuccess('');

    }
    const clickSubmit =(e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        //make request to api to create category
        createCategory(user._id, token, {name})
        .then(data => {
            if(data.error){
                setError(true)
            }else{
                setError('');
                setSuccess(true);
            }
        })
        
        
    }
    const newCategory = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control"
                 onChange={handleChange} value={name} autoFocus required/>
               
            </div>
            <button className="btn btn-outline-primary">
                    Create Category
                </button>
        </form>
    );
    const showSuccess = () =>{
        if(success)
        {
        return <h3 className="text-success">{name} is created</h3>
        }
    }

    const showError = () =>{
        if(error)
        {
        return <h3 className="text-danger">{name} is should be unique</h3>
        }
    };
    const goback = () =>(
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashbord
            </Link>

        </div>
    )

    return (
   
        <Layout title="Add a new category"
         description={`Good day ${user.name}, ready to add a new category`} 
         >
            <div className="row">
               
                <div className="col-md-8 offset-md-2">
                   
                    {showSuccess()}
                    {showError()}
                    {newCategory()}
                    {goback()}
                   
    
                </div>
    
    
            </div>
           
            
        </Layout>
    );
};
export default AddCategory;