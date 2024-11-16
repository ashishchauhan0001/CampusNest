import reviewData from "../models/review.model.js";

const addReview = async (req, res) => {
  try {
    const { propertyId } = req.body;
    const { userId, comments, rating } = req.body;

    if (!propertyId || !userId || !comments || !rating) {
      return res
        .status(400)
        .json({ message: "All fields are required: propertyId, userId, comments, rating." });
    }

    const newReview = {
      userId,
      comments,
      rating,
      date: new Date(),
    };

    let reviewDoc = await reviewData.findOne({ propertyId });

    if (!reviewDoc) {

      reviewDoc = new reviewData({
        propertyId,
        review: [newReview],
      });
    } else {

      reviewDoc.review.push(newReview);
    }

    await reviewDoc.save();

    res.status(201).json({ message: "Review added successfully.", reviewData: reviewDoc });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "An error occurred while adding the review." });
  }
};


const getReviews = async (req, res) => {
  try {
    const propertyId = req.params.id;

    if (!propertyId) {
      return res.status(400).json({ message: "Property ID is required." });
    }

    const reviewDoc = await reviewData.findOne({ propertyId });

    if (!reviewDoc) {
      return res.status(404).json({ message: "No reviews found for this property." });
    }

    res.status(200).json({
      message: "Reviews fetched successfully.",
      reviews: reviewDoc.review,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "An error occurred while fetching reviews." });
  }
};


export { addReview, getReviews };
