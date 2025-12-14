import React, { use, useEffect, useState } from 'react';
import { Link, useLoaderData, useParams } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';

const Details = () => {
   // const data = useLoaderData()
    //console.log(data)
    const {id}=useParams()
    const{user}=use(AuthContext)
    const[data,setData]=useState({})
    
    

  useEffect(()=>{
    fetch(`http://localhost:4000/reviews/${id}`,{
          headers:{
              authorization: `Bearer ${user.accessToken}`
          }
        }).then(res=>res.json())
        .then(data=>{
            setData(data)
          
          console.log(data)
        })
  },[])
  

    return (
        <div>
            <h2>details page</h2>

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <img
                        src={data.photo}
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                    <div>
                        <h1 className="text-5xl font-bold">{data.food_name}</h1>
                        <p className="">
                           {data.description}
                        </p>
                        <p className="">
                           {data.rating}
                        </p>
                        <p className="">
                           {data.restaurant_namen}
                        </p>
                        <p className="">
                           {data.restaurant_location}
                        </p>
                        <p className="">
                           {data.reviewer_name}
                        </p>
                       
                    </div>
                    
                </div>
                
            </div>
            <div className='flex justify-center'>
                <Link to={'/allReviews'}
                className="btn btn-primary">Explore More Reviews</Link>
            </div>

        </div>
    );
};

export default Details;