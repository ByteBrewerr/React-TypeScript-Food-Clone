import React, { useEffect, useState } from "react";
import { Feedback } from "../../types/orderType";
import SingleFeedback from "../../components/profile/FeedbackHistory/SingleFeedback/SingleFeedback";
import Masonry from "@mui/lab/Masonry";
import { getDatabase, onValue, ref } from "firebase/database";
import sleep from "../../utils/sleep";
import _debounce from "lodash/debounce";
import "./feedbackPage.scss";

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 12;

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const db = getDatabase();
      const feedbacksRef = ref(db, "/feedbacks");

      const startIndex = (currentPage - 1) * reviewsPerPage;
      const endIndex = startIndex + reviewsPerPage;

      onValue(
        feedbacksRef,
        async (snapshot) => {
          const data = snapshot.val();
          if (data) {
            await sleep(300);
            const arrayData = Object.values(data) as Feedback[];
            const paginatedData = arrayData.slice(startIndex, endIndex);
            setFeedbacks((prevFeedbacks) => [...prevFeedbacks, ...paginatedData]);
          }
        },
        {
          onlyOnce: true,
        }
      );
    };

    fetchFeedbacks();
  }, [currentPage]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const debouncedHandleScroll = _debounce(handleScroll, 200);

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);

  return (
    <div className="container feedbackPage">
      <Masonry columns={2} spacing={2}>
        {feedbacks.map((feedback) => {
          return (
            <SingleFeedback
              key={feedback.orderNumber}
              orderNumber={feedback.orderNumber}
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
