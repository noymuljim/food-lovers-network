import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Card from '../components/card/Card';

const MyFavs = () => {
      const { user } = useContext(AuthContext);
    
      const [reviews, setReviews] = useState([]);
      const [loading, setLoading] = useState(true);
    


      // fetch my reviews
        useEffect(() => {
          if (!user?.email) return;
      
          fetch(`http://localhost:4000/myFavs?email=${user.email}`, {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
          })
            .then(res => res.json())
            .then(data => {
              setReviews(data);
              setLoading(false);
            });
        }, [user]);

        if(loading){
            return <div>Loading...</div>
        }

 <h1>My Favs</h1>

    return (

        <div className='grid grid-cols-3 max-w-7xl mx-auto'>  
           {
            reviews.map(review=><Card key={review._id} review={review}></Card>)
           }
        </div>
    );
};

export default MyFavs;