import React, { ChangeEvent, useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import imagePlaceholder from "../../../assets/image-placeholder.png";
import "./feedbackPopup.scss";
import { getDatabase, ref, update } from "firebase/database";
import notify from "../../../utils/notify";
import { getStorage, ref as storageReff, uploadBytes, getDownloadURL } from "firebase/storage";
import { Feedback } from "../../../types/orderType";

const FeedbackPopup = ({
  orderNumber,
  uid,
  handlePopup,
  date,
  name,
}: {
  orderNumber: number;
  uid: string;
  handlePopup: () => void;
  date: string;
  name: string;
}) => {
  const [comment, setComment] = useState<string>("");
  const [isPositive, setIsPositive] = useState<boolean>(true);
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setImage(file || null);
  };

  const handleFeedbackTypeChange = (type: "positive" | "negative") => {
    setIsPositive(type === "positive");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const database = getDatabase();
    const storage = getStorage();

    if (image) {
      const storageRef = storageReff(storage, `images/${uid}_${orderNumber}`);
      await uploadBytes(storageRef, image);
    }

    let imageUrl = null;
    if (image) {
      const storageRef = storageReff(storage, `images/${uid}_${orderNumber}`);
      imageUrl = await getDownloadURL(storageRef);
    }

    const feedback: Feedback = { comment, isPositive, imageUrl, name, date, orderNumber };
    const userFeedbackRef = ref(database, `users/${uid}/orders/${orderNumber}/feedback/`);
    const feedbackRef = ref(database, `feedbacks/${orderNumber}`);

    try {
      await update(userFeedbackRef, { ...feedback });
      await update(feedbackRef, { ...feedback });
      notify("Отзыв успешно загружен", "success");
    } catch (error) {
      notify("Ошибка загрузки отзыва", "error");
    }
    setIsSubmitting(false);
    handlePopup();
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
          onChange={(e) => (comment.length <= 600 ? setComment(e.target.value) : {})}
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
        {isSubmitting ? <CircularProgress size={20} /> : "Отправить отзыв"}
      </Button>
    </div>
  );
};

export default FeedbackPopup;
