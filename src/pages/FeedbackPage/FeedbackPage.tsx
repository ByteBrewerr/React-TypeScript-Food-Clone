import React, { useEffect } from "react";
import SingleFeedback from "../../components/profile/FeedbackHistory/SingleFeedback/SingleFeedback";
import Masonry from "@mui/lab/Masonry";
import { useInView } from "react-intersection-observer";
import { getFeedbacks } from "../../services/feedbacksService";
import { useInfiniteQuery } from "@tanstack/react-query";
import "./feedbackPage.scss";

const FeedbackPage = () => {
  const { data, status, fetchNextPage } = useInfiniteQuery({
    queryKey: ["feedbacks"],
    queryFn: getFeedbacks,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, data]);

  if (status == "pending") {
    return <div className="container">...Loading</div>;
  }

  return (
    <div className="container feedbackPage">
      {data?.pages.map((page) => (
        <Masonry columns={2} spacing={2} key={page.currentPage}>
          {page.data.map((item) => (
            <SingleFeedback
              key={item.orderNumber}
              orderNumber={item.orderNumber}
              date={item.date}
              name={item.name}
              isPositive={item.isPositive}
              img={item.imageUrl}
              comment={item.comment}
            />
          ))}
        </Masonry>
      ))}
      <div ref={ref}></div>
    </div>
  );
};

export default FeedbackPage;
