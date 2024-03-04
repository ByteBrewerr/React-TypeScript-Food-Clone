import React, { ChangeEvent, FC, useState } from "react";
import { TextField, Button } from "@mui/material";
import imagePlaceholder from "../../../assets/image-placeholder.png";
import "./feedbackPopup.scss";
import { getDatabase, ref, update } from "firebase/database";

const FeedbackPopup = ({ orderNumber, uid }: { orderNumber: number; uid: string }) => {
  const [comment, setComment] = useState<string>("");
  console.log(orderNumber, uid);
  const [isPositive, setIsPositive] = useState<boolean>(true);
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setImage(file || null);
  };

  const handleFeedbackTypeChange = (type: "positive" | "negative") => {
    setIsPositive(type === "positive");
  };

  const handleSubmit = async () => {
    const feedback = { comment, isPositive, image };
    const database = getDatabase();
    const userFeedbackRef = ref(database, `users/${uid}/orders/${orderNumber}/feedback/`);
    const feedbackRef = ref(database, `feedbacks/${orderNumber}`);

    await update(userFeedbackRef, { ...feedback });
    await update(feedbackRef, { ...feedback });

    console.log("Отправка отзыва:", { comment, isPositive, image });
  };

  return (
    <div className="feedbackPopup">
      <div className="imageUploader">
        {image ? (
          <>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <img src={URL.createObjectURL(image)} alt="Загруженная картинка" />
          </>
        ) : (
          <>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <img src={imagePlaceholder} alt="placeholder" />
          </>
        )}
      </div>

      <div className="commentSection">
        <TextField
          multiline
          rows={4}
          placeholder="Оставьте ваш комментарий..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
        />
      </div>

      <div className="feedbackButtons">
        <Button
          variant={isPositive ? "contained" : "outlined"}
          color="success"
          onClick={() => handleFeedbackTypeChange("positive")}
        >
          Положительный отзыв
        </Button>
        <Button
          variant={!isPositive ? "contained" : "outlined"}
          color="error"
          onClick={() => handleFeedbackTypeChange("negative")}
        >
          Отрицательный отзыв
        </Button>
      </div>

      <Button variant="contained" color={"primary"} onClick={handleSubmit} fullWidth>
        Отправить отзыв
      </Button>
    </div>
  );
};

export default FeedbackPopup;
