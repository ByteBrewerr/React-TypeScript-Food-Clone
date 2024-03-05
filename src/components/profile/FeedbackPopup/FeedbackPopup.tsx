import React, { ChangeEvent, FC, useState } from "react";
import { TextField, Button } from "@mui/material";
import imagePlaceholder from "../../../assets/image-placeholder.png";
import "./feedbackPopup.scss";
import { getDatabase, ref, update } from "firebase/database";
import notify from "../../../utils/notify";
import { getStorage, ref as storageReff, uploadBytes, getDownloadURL } from "firebase/storage";

const FeedbackPopup = ({ orderNumber, uid }: { orderNumber: number; uid: string }) => {
  const [comment, setComment] = useState<string>("");
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
    const database = getDatabase();
    const storage = getStorage();

    // Step 1: Upload the image to Firebase Storage
    if (image) {
      const storageRef = storageReff(storage, `images/${uid}_${orderNumber}`);
      await uploadBytes(storageRef, image);
    }

    // Step 2: Get the download URL of the uploaded image
    let imageUrl = null;
    if (image) {
      const storageRef = storageReff(storage, `images/${uid}_${orderNumber}`);
      imageUrl = await getDownloadURL(storageRef);
    }

    // Step 3: Save the feedback data to the Realtime Database
    console.log(imageUrl);
    const feedback = { comment, isPositive, imageUrl }; // Use the image URL instead of the image file
    const userFeedbackRef = ref(database, `users/${uid}/orders/${orderNumber}/feedback/`);
    const feedbackRef = ref(database, `feedbacks/${orderNumber}`);

    try {
      await update(userFeedbackRef, { ...feedback });
      await update(feedbackRef, { ...feedback });
      notify("Отзыв успешно загружен", "success");
    } catch (error) {
      notify("Ошибка загрузки отзыва", "error");
    }
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
