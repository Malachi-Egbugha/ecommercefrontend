import React, {useState, useEffect} from "react";
import Layout from "../component/Layout";
import Card from "../component/Card";
import {getCategories, getFilteredProducts} from "./apiCore";
import Checkbox from "../component/Checkbox";
import RadioBox from "../component/RadioBox";
import {prices} from "../component/fixedPrices";



const Shop = () =>{
    const [myFilters, setMyFilters] = useState({
        filters:{category:[], price:[]}
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);


     //load categories and set form data
     const init = () =>{
        getCategories().then(data =>{
            
            if(data.error){
                setError(data.error)
            }else{
              setCategories(data)
            }
        });
        
    }

    const loadFilteredResults = (newFilters)=>{
        //console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data =>{
            if(data.error){
                setError(data.error);
            }
            else{
                setFilteredResults(data.data);

            }
        });

    };
    useEffect(()=>{
        init();
        loadFilteredResults(skip, limit, myFilters.filters);

    },[]);
    const handleFilters = (filters, filterBy) =>{
        //console.log("SHOP",filters, filterBy);
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;
        if(filterBy == "price"){
            let priceValues =handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;

        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };
    const handlePrice = value => {
        const data = prices
        let array= []
        for (let key in data){
            if(data[key]._id === parseInt(value))
            {
                array = data[key].array;
            }

        }
        return array;
    };
   
     
    return(
        <Layout title="Shop Page" description="Search and Find Books of your Choice" className="container-fluid">
       <div className="row">
           <div className="col-4">
           <h4>Filter by Category</h4>
               <ul>
               <Checkbox handleFilters={filters => handleFilters(filters, 'category')} categories={categories}/>
               </ul>
               <h4>Filter by Price Range</h4>
               <div>
               <RadioBox handleFilters={filters => handleFilters(filters, 'price')} prices={prices}/>
               </div>
           </div>
           <div className="col-8">
               <h2 className="mb-4">Products</h2>
               <div className="row">
                   {filteredResults.map((product, i)=>(
                      
                           <Card key={i} product={product}/>

                      
                   ))}

               </div>

           </div>

       </div>
      

    </Layout>
    )
    }
    export default Shop;