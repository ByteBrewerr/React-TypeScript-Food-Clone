import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Feedback } from "../../types/orderType";
import SingleFeedback from "../../components/profile/FeedbackHistory/SingleFeedback/SingleFeedback";
import Masonry from "@mui/lab/Masonry";
import "./feedbackPage.scss";

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  useEffect(() => {
    const fetchAllFeedbacks = async () => {
      const db = getDatabase();
      const allFbRef = ref(db, "/feedbacks");
      onValue(
        allFbRef,
        (snapshot) => {
          const data = snapshot.val();
          const arrayData = Object.values(data) as Feedback[];
          setFeedbacks(arrayData);
        },
        {
          onlyOnce: true,
        }
      );
    };
    fetchAllFeedbacks();
  }, []);

  return (
    <div className="container feedbackPage">
      <Masonry columns={2} spacing={2}>
        {feedbacks.map((feedback) => {
          return (
            <SingleFeedback
              key={feedback.orderNumber}
              date={feedback.date}
              name={feedback.name}
              isPositive={feedback.isPositive}
              img={feedback.imageUrl}
              comment={feedback.comment}
            />
          );
        })}
      </Masonry>
    </div>
  );
};

export default FeedbackPage;
