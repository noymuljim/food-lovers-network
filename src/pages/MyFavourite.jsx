import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';

const MyFavourite = () => {

    const { user } = useContext(AuthContext);

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:4000/myFavourites?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setReviews(data);
                setLoading(false);
            });
    }, [user]);






const handleDelete = (id) => {


  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {



      fetch(`http://localhost:4000/myFavourites/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
        .then(res => res.json())
        .then(() => {
          setReviews(prev => prev.filter(review => review._id !== id));
          

          Swal.fire({
            title: "Deleted!",
            text: "Favourite removed successfully.",
            icon: "success",
          });
        });
    }
  });
};


    if (loading) return <h1>Loading...</h1>;





    return (
       <div>
            <h1 className='text-2xl font-semibold md:py-10 flex justify-center'>My Favourites</h1>

                <div className="overflow-x-auto max-w-7xl mx-auto">
                    <table className="table w-full ">
                        <thead className="hidden md:table-header-group">
                            <tr>
                                <th>No</th>
                                <th>Info</th>
                               
                            
                                <th>Remove</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reviews.map((review, index) => (
                                <tr key={review._id} className="block md:table-row border mb-4">
                                    <td className="block md:table-cell">{index + 1}</td>

                                    <td className="block md:table-cell">
                                        <div className="flex gap-3">
                                            <img src={review.photo} alt="food" className="h-12 w-12 rounded" />
                                            <div>
                                                <div className="font-bold">{review.food_name}</div>
                                                <div className="text-sm">{review.restaurant_name}</div>
                                                <div className="text-sm">{review.restaurant_location}</div>
                                            </div>
                                        </div>
                                    </td>

            

                                 

                                    <td className="block md:table-cell">
                                        <button
                                            onClick={() => handleDelete(review._id)}
                                            className="btn btn-sm bg-red-500 text-white rounded-4xl w-full md:w-auto"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            
           


        </div>

    );
};

export default MyFavourite;