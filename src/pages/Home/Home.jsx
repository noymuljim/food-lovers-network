import React from 'react';
import Banner from './Banner';
import { Link, useLoaderData } from 'react-router';
import Card from '../../components/card/Card';

const Home = () => {
    const data = useLoaderData()

    return (
        <div>
            <Banner></Banner>
             <h1 className='flex justify-center py-10 item-center text-2xl font-bold'>Latest Reviews</h1>

            <div className='max-w-7xl mx-auto '>
                <div className=' grid grid-cols-1 md:grid-cols-3 gap-2.5'>
                    {
                        data.map((review) => <Card key={review._id} review={review}></Card>)
                    }
                </div>
            </div>
             <div className='flex justify-center'>
                <Link to={'/allReviews'}
                className="btn btn-primary">Explore More Reviews</Link>
            </div>
        </div>
    );
};

export default Home;