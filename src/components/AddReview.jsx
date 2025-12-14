import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import img1 from '../assets/brg.png';
import img2 from '../assets/piz.png';
import { toast } from 'react-toastify';

//  const { photo, food_name, restaurant_name, restaurant_location, reviewer_name, rating } = review

const AddReview = () => {
    const { user } = useContext(AuthContext);
   

    const handleSubmit = (e) => {
        e.preventDefault()


        const formData = {

            photo: e.target.photoURL.value,
            food_name: e.target.foodName.value,
            restaurant_name: e.target.restaurantName.value,
            restaurant_location: e.target.restaurantLocation.value,
            description: e.target.description.value,
            reviewer_name: e.target.reviewer.value,
            rating: e.target.rating.value,
            created_by: user?.email,
            created_at: new Date(),
            user_img: user?.photoURL

        }
        fetch('http://localhost:4000/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Added your review')
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })


    }

    return (
        <div className="min-h-screen flex justify-center px-4 py-6">
            <div className="w-full max-w-6xl">


                <div className="flex justify-center py-6">
                    <div className="text-center">
                        <h1 className="font-extrabold text-2xl">Add a review</h1>
                        <p>Your review can guide someone to their next favorite meal — write it!</p>
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">


                    <div className="hidden md:flex col-span-1 justify-center">
                        <img className="animate-pulse w-[300px]" src={img2} alt="" />
                    </div>


                    <form onSubmit={handleSubmit}
                        className="col-span-1 md:col-span-2 space-y-4">
                        <div>
                            <label className="label font-medium">Your name</label>
                            <input
                                type="text"
                                name="reviewer"
                                required
                                defaultValue={user?.displayName}
                                className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                            />
                        </div>
                        <div>
                            <label className="label font-medium">Food item name</label>
                            <input
                                type="text"
                                name="foodName"
                                required
                                placeholder='item'
                                className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                            />
                        </div>
                        <div>
                            <label className="label font-medium">Restaurant name</label>
                            <input
                                type="text"
                                name="restaurantName"
                                required
                                placeholder='Restaurant'
                                className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                            />
                        </div>
                        <div>
                            <label className="label font-medium">Restaurant location</label>
                            <input
                                type="text"
                                name="restaurantLocation"
                                required
                                placeholder='Location'
                                className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                            />
                        </div>

                        <div>
                            <label className="label font-medium">Description</label>
                            <textarea
                                name="description"
                                required
                                rows="3"
                                className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
                                placeholder="Tell us details..."
                            ></textarea>
                        </div>

                        <div>
                            <label className="label font-medium">Food Photo URL</label>
                            <input
                                type="url"
                                name="photoURL"
                                required
                                className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                                placeholder="Paste here"
                            />
                        </div>
                        <div>
                            <label className="label font-medium">Rating</label>
                            <input
                                type="number"
                                name="rating"
                                required
                                className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                                placeholder="4.5"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn w-full text-white mt-6 rounded-full bg-green-500 hover:bg-green-600"
                        >
                            Add Review
                        </button>
                    </form>


                    <div className="hidden md:flex col-span-1 justify-center">
                        <img className="animate-pulse w-[300px]" src={img1} alt="" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddReview;
