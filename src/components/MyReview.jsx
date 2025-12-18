import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';

const MyReview = () => {
  const { user } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);

  const modalRef = useRef(null);




  // fetch my reviews
  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:4000/my-reviews?email=${user.email}`, {
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





  //modal + set selected review
  const handleEdit = (review) => {
    setSelectedReview(review);
    modalRef.current.showModal();
  };



  
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updatedReview = {
      food_name: e.target.foodName.value,
      restaurant_name: e.target.restaurantName.value,
      restaurant_location: e.target.restaurantLocation.value,
      description: e.target.description.value,
      photo: e.target.photoURL.value,
      rating: e.target.rating.value,
    };

    fetch(`http://localhost:4000/reviews/${selectedReview._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', 
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(updatedReview),
    })
      .then(res => res.json())
      .then(() => {
        
        setReviews(prev =>
          prev.map(review =>
            review._id === selectedReview._id ? { ...review, ...updatedReview } : review
          )
        );

        modalRef.current.close();
        setSelectedReview(null);
      });
  };






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



      fetch(`http://localhost:4000/reviews/${id}`, {
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
            text: "Your review has been deleted.",
            icon: "success",
          });
        });
    }
  });
};


  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>



      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="hidden md:table-header-group">
            <tr>
              <th>No</th>
              <th>Info</th>
              <th>Date</th>
              <th>Update</th>
              <th>Delete</th>
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
                  {new Date(review.created_at).toLocaleDateString()}
                </td>

                <td className="block md:table-cell">
                  <button
                    onClick={() => handleEdit(review)}
                    className="btn btn-sm w-full md:w-auto"
                  >
                    Update
                  </button>
                </td>

                <td className="block md:table-cell">
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-sm btn-error w-full md:w-auto"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      {/* MODAL */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Update Your Review</h3>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              name="foodName"
              defaultValue={selectedReview?.food_name}
              required
              className="input w-full"
              placeholder="Food name"
            />

            <input
              name="restaurantName"
              defaultValue={selectedReview?.restaurant_name}
              required
              className="input w-full"
              placeholder="Restaurant name"
            />

            <input
              name="restaurantLocation"
              defaultValue={selectedReview?.restaurant_location}
              required
              className="input w-full"
              placeholder="Location"
            />

            <textarea
              name="description"
              defaultValue={selectedReview?.description}
              required
              className="textarea w-full h-32"
            />

            <input
              name="photoURL"
              defaultValue={selectedReview?.photo}
              required
              className="input w-full"
              placeholder="Photo URL"
            />

            <input
              name="rating"
              defaultValue={selectedReview?.rating}
              required
              type="number"
              step="0.1"
              className="input w-full"
              placeholder="Rating"
            />

            <button type="submit" className="btn w-full bg-green-500 text-white">
              Update Review
            </button>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyReview;
