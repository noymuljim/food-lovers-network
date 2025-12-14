import React from 'react';
import { FaPen, FaStar } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import { IoRestaurant } from 'react-icons/io5';
import { Link } from 'react-router';

const Card = ({ review }) => {
    const { _id, photo, food_name, restaurant_name, restaurant_location, reviewer_name, rating } = review




    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img className='mx-auto w-full h-[250px]'
                    src={photo}
                    alt="food-item" />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-2xl">
                    {food_name}
                    <div className="badge badge-secondary">
                        <FaStar />

                        {rating}</div>
                </h2>

                <h3 className='font-semibold  text-green-500 flex items-center gap-2'>
                    <span className='text-2xl'> <IoRestaurant /></span>
                    {restaurant_name}</h3>
                <p className='flex items-center gap-2 text-red-500'><HiLocationMarker />
                    <span className='text-gray-500 '> {restaurant_location}</span>
                </p>
                <p className='flex items-center gap-2'><FaPen />
                    Reviewer: {reviewer_name}</p>

                <Link to={`/revirw-Details/${_id}`} className="btn" >view details</Link>


            </div>
        </div>
    );
};

export default Card;