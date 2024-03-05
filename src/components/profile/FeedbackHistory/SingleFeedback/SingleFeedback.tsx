import React, { FC } from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import "./singleFeedback.scss";

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
          <span>
            {date
              .split(",")
              .shift()
              ?.split("")
              .map((char) => {
                if (char == ":") return "/";
                return char;
              })}
          </span>
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
