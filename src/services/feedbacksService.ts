import { getDatabase, ref, onValue } from "firebase/database";
import { Feedback } from "../types/orderType";
import sleep from "../utils/sleep";

const LIMIT = 6;
export function getFeedbacks({
  pageParam,
}: {
  pageParam: number;
}): Promise<{ data: Feedback[]; currentPage: number; nextPage: number | null }> {
  return new Promise((resolve) => {
    const db = getDatabase();
    const feedbacksRef = ref(db, "/feedbacks");

    onValue(
      feedbacksRef,
      async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          await sleep(500);
          const arrayData = Object.values(data) as Feedback[];
          resolve({
            data: arrayData.slice(pageParam, pageParam + LIMIT),
            currentPage: pageParam,
            nextPage: pageParam + LIMIT < arrayData.length ? pageParam + LIMIT : null,
          });
        }
      },
      {
        onlyOnce: true,
      }
    );
  });
}
