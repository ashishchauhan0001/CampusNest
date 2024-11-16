import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const CommentsSection = ({ propertyID }) => {
  const [comments, setComments] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch comments and ratings from the API
  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/review/getreview/${propertyID}`);
      const reviews = response.data.reviews.review;
      const commentsArray = reviews.map((item) => item.comments);
      const ratingsArray = reviews.map((item) => item.rating);
      setComments(commentsArray);
      setRatings(ratingsArray);
      setLoading(false);
    } catch (err) {
      setError("Failed to load comments. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (propertyID) fetchComments();
  }, [propertyID]);

  // Helper function to render stars
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <FaStar
          key={index}
          className={`${
            index < rating ? "text-yellow-500" : "text-gray-300"
          } text-lg`}
        />
      ));
  };

  // Loading and Error UI
  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="loader"></div>
        <span className="ml-2 text-gray-600">Loading comments...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 p-4 rounded-lg">
        <p className="text-red-700 font-bold text-xl text-center">No Comments Yet</p>
      </div>
    );
  }

  // Comments and Ratings UI
  return (
    <div className="bg-white shadow-md rounded-lg p-6 my-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        User Reviews
      </h2>
      {comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((comment, index) => (
            <li
              key={index}
              className="bg-gray-100 p-4 rounded-lg border-l-4 border-blue-500"
            >
              <div className="flex items-center mb-2">
                {renderStars(ratings[index])}
                <span className="ml-2 text-sm text-gray-600">
                  {ratings[index]} / 5
                </span>
              </div>
              <p className="text-gray-700">{comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-center">No comments yet.</p>
      )}
    </div>
  );
};

export default CommentsSection;
