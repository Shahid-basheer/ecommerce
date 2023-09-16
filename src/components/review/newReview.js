import { useAuthStateValue } from "@/context/authContext";
import { useProductStateValue } from "@/context/productContext";
import { getUserReview } from "@/helpers/helpers";
import React, { useContext, useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";

const NewReview = ({ product ,setIsReviewed}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { user } = useAuthStateValue();
  const { error, clearErrors, postReview } = useProductStateValue();

  useEffect(() => {
    const userReview = getUserReview(product?.reviews, user?._id);

    if (userReview) {
      setRating(userReview?.rating);
      setComment(userReview?.comment);
    }

    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, user]);

  const submitHandler = () => {
    const reviewData = { rating, comment, productId: product?._id ,userId:user?._id};
    postReview(reviewData);
    setIsReviewed(false)
  };

  return (
    <div>
      <hr className="my-4" />
      <h1 className="text-gray-500 review-title my-5 text-2xl">Your Review</h1>

      <h3>Rating</h3>
      <div className="mb-4 mt-3">
        <div className="ratings">
          <StarRatings
            rating={rating}
            starRatedColor="#ffb829"
            numberOfStars={5}
            name="rating"
            changeRating={(e) => setRating(e)}
          />
        </div>
      </div>
      <div className="mb-4 mt-5">
        <label className="block mb-1"> Comments </label>
        <textarea
          rows="4"
          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-1/3"
          placeholder="Your review"
          name="description"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
      </div>

      <button
        className="mt-3 mb-5 px-4 py-2 text-center inline-block text-white bg-yellow-500 border border-transparent rounded-md hover:bg-yellow-600 w-1/3"
        onClick={() => submitHandler()}
      >
        Post Review
      </button>
    </div>
  );
};

export default NewReview;