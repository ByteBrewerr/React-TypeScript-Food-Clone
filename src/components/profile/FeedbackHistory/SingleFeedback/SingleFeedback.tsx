import React, { FC } from "react";
import "./singleFeedback.scss";
import { BsCalendar2Date } from "react-icons/bs";
import { AiFillLike, AiFillDislike } from "react-icons/ai";

type SingleFeedbackProps = {
  date: string;
  name: string;
  comment: string;
  isPositive: boolean;
  img: string | null;
};

const SingleFeedback: FC<SingleFeedbackProps> = ({ date, name, comment, isPositive, img }) => {
  return (
    <div className="singleFeedback">
      <div className="singleFeedbackInfo">
        <div>
          <BsCalendar2Date size={20} />
          <span>{date.split(",").shift()}</span>
        </div>
        <div>
          {isPositive ? <AiFillLike size={20} color={"green"} /> : <AiFillDislike size={20} color={"red"} />}
          <span>{name}</span>
        </div>
      </div>
      <div className="singleFeedbackComment">
        {img && <img src={img} />}
        <span>{comment}</span>
      </div>
    </div>
  );
};

export default SingleFeedback;
