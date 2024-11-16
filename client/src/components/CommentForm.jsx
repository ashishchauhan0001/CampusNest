import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const CommentForm = ({ propertyID, onCommentAdded }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const userDetails = useSelector((state) => state.user.currentUser);
  const id = userDetails._id;
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    if (rating < 1 || rating > 5) {
      setError("Rating must be between 1 and 5.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`http://localhost:3000/api/review/addreview`, {
        "propertyId":propertyID,
        "userId":id,
        "comments":comment,
        "rating":rating,
      });

      setSuccess("Comment and rating added successfully!");
      setComment("");
      setRating(1);
      onCommentAdded(response.data.comments); // Update parent component
    } catch (err) {
      setError("Failed to add comment and rating. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 my-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add a Comment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
            rows="4"
            placeholder="Write your comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Rating (1 to 5):</label>
          <select
            className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-red-600 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}

        <button
          type="submit"
          className={`w-full py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Comment"}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
