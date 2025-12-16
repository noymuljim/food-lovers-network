import React, { use, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { FcLike } from 'react-icons/fc';
import { toast } from 'react-toastify';

const Details = () => {
    // const data = useLoaderData()
    //console.log(data)
    const { id } = useParams()
    const { user } = use(AuthContext)
    const [data, setData] = useState({})



    useEffect(() => {
        fetch(`http://localhost:4000/reviews/${id}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        }).then(res => res.json())
            .then(data => {
                setData(data)

     //           console.log(data)
            })
    }, [])





    const handleFavourite=()=>{



        fetch('http://localhost:4000/myFavs',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                authorization: `Bearer ${user.accessToken}`
            },
            body:JSON.stringify({...data, like_by:user.email})
        })
        .then(res=>res.json())
        .then(data=>{
           // console.log(data)
            setData(data)
            toast.success('Added to favourite successfully!')
        })
        .catch(err=>console.log(err))
        
    }
    



    return (
        <div>
            <h2 className='flex text-2xl justify-center items-center my-10'>Review Details</h2>

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row">

                    <div className="relative inline-block">
                        <img
                            src={data.photo}
                            className="max-w-sm rounded-lg shadow-2xl"
                            alt=""
                        />

                        <button onClick={handleFavourite}
                         className="absolute top-2 right-2 h-[50px] w-[50px] rounded-full
                     flex justify-center items-center
                     hover:bg-green-400 text-3xl">
                            <FcLike />
                        </button>
                    </div>

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