import React, {useState, useEffect} from "react";
import Layout from "../component/Layout";
import Card from "../component/Card";
import {read} from "./apiCore";


const Product = (props) => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const loadSingleProduct = productId =>{
        read(productId ).then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setProduct(data);
            }
        })

    }
    useEffect(()=>{
        const productId = props.match.params.productId;
        loadSingleProduct(productId);

    }, [])
    return(
        <Layout title="Home Page" description="Node React E-commerce App" className="container-fluid">
       <h2 className="mb-4"> Single Product</h2>
       <div className="row">
           {JSON.stringify}

       </div>
      
       
    </Layout>
    )
}

export default Product;


