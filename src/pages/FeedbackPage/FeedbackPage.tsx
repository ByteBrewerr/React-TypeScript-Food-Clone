import React, { useLayoutEffect } from "react";
import SingleFeedback from "../../components/profile/FeedbackHistory/SingleFeedback/SingleFeedback";
import Masonry from "@mui/lab/Masonry";
import { useInView } from "react-intersection-observer";
import { getFeedbacks } from "../../services/feedbacksService";
import { useInfiniteQuery } from "@tanstack/react-query";
import "./feedbackPage.scss";

const FeedbackPage = () => {
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["feedbacks"],
    queryFn: getFeedbacks,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  const { ref, inView } = useInView();

  useLayoutEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div className="container feedbackPage">
      <Masonry columns={2} spacing={2}>
        <>
          {data?.pages.map((page) => (
            <React.Fragment key={page.currentPage}>
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
            </React.Fragment>
          ))}
        </>
      </Masonry>
      <div ref={ref}></div>
    </div>
  );
};

export default FeedbackPage;
