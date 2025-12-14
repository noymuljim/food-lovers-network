import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';

const MyReview = () => {
  const { user } = use(AuthContext)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:4000/my-reviews?email=${user.email}`,{
            headers:{
                authorization: `Bearer ${user.accessToken}`
            }
        })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setReviews(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <h1>loading...</h1>
  }
  return (
    <div>
      <h2>my review</h2>

      {/* { _id, photo, food_name, restaurant_name, restaurant_location, reviewer_name, rating } */}

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="hidden md:table-header-group">
            <tr>
              <th>No.</th>
              <th>Info</th>
              <th>Date</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review, index) => (
              <tr
                key={review._id}
                className="block md:table-row border md:border-none mb-4 md:mb-0 rounded md:rounded-none"
              >
                <td className="block md:table-cell font-semibold">
                  <span className="md:hidden">No: </span>
                  {index + 1}
                </td>

                <td className="block md:table-cell">
                  <span className="md:hidden font-semibold">Info:</span>
                  <div className="flex gap-3 mt-1 md:mt-0">
                    <img
                      src={review.photo}
                      alt=""
                      className="h-12 w-12 rounded"
                    />
                    <div>
                      <div className="font-bold">{review.food_name}</div>
                      <div className="text-sm opacity-70">
                        {review.restaurant_name}
                      </div>
                      <div className="text-sm">
                        {review.restaurant_location}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="block md:table-cell">
                  <span className="md:hidden font-semibold">Date: </span>
                  {review.created_at}
                </td>

                <td className="block md:table-cell">
                  <button className="btn btn-sm w-full md:w-auto">
                    Update
                  </button>
                </td>

                <td className="block md:table-cell">
                  <button className="btn btn-sm btn-error w-full md:w-auto">
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

export default MyReview;