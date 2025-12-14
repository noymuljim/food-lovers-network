import React from 'react';
import Card from '../components/card/Card';
import { useLoaderData } from 'react-router';
const AllReviews = () => {
    const data=useLoaderData()
//console.log(data)   
    return (
        <div className='max-w-7xl mx-auto '>
            <h1 className='flex justify-center py-10 item-center text-2xl font-bold'>All Reviews</h1>
           <div className=' grid grid-cols-1 md:grid-cols-3 gap-2.5'>
             {
                data.map((review)=> <Card key={review._id} review={review}></Card>)
            }
           </div>
        </div>
    );
};

export default AllReviews;