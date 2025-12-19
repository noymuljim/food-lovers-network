import React, { useState } from 'react';
import Card from '../components/card/Card';
import { useLoaderData } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';
const AllReviews = () => {
    const data = useLoaderData()
    //console.log(data)   
  const [reviews, setReviews] = useState(data)

     const[loading,setLoading]=useState(false)

    const handleSeach = (e) => {
        e.preventDefault()
        const search_text = e.target.search.value;
        // console.log(search_text)
         setLoading(true)
        fetch(`http://localhost:4000/search?search=${search_text}`)
            .then(req => req.json())
            .then(data => {
                console.log(data)
                setReviews(data)
                setLoading(false)
            })

    }
    if(loading){
        return <div>loading...</div>
    }


    return (
        <div className='max-w-7xl mx-auto px-5'>
            <div className='flex flex-col md:flex-row justify-between py-10 '>
                <h1 className=' pb-5 text-2xl font-bold'>All Reviews</h1>


                {/* search */}
                <form onSubmit={handleSeach}
                    className='flex'>
                    <label className="input rounded-full ">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input name='search' type="search" required placeholder="Search here..." />
                    </label>
                    <button className='btn rounded-full bg-purple-600'><FaArrowRight />
                    </button>

                </form>
            </div>

            <div className=' grid grid-cols-1 md:grid-cols-3 gap-2.5'>
                {
                 reviews.map((review) => <Card key={review._id} review={review}></Card>)
                }
            </div>
        </div>
    );
};

export default AllReviews;