import { makeAutoObservable } from "mobx";
import { User } from "../types/userType";
import { auth } from "../firebase";
import { getDatabase, onValue, ref } from "firebase/database";

class UserStore {
  email: string = "";
  number: string = "";
  name: string = "";
  uid: string = "";
  isLoadigUser = false;

  constructor() {
    makeAutoObservable(this);

    this.setIsLoading(true);

    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await this.fetchUserData(user.uid);
      } else {
        this.removeUser();
      }

      this.setIsLoading(false);
    });
  }
  setIsLoading = (value: boolean) => {
    this.isLoadigUser = value;
  };
  setUser = (user: User) => {
    this.email = user.email;
    this.number = user.number;
    this.name = user.name;
    this.uid = user.uid;
  };

  removeUser = () => {
    this.email = "";
    this.number = "";
    this.name = "";
    this.uid = "";
  };

  async fetchUserData(uid: string) {
    return new Promise<void>((resolve, reject) => {
      const db = getDatabase();
      onValue(
        ref(db, "/users/" + uid),
        (snapshot) => {
          const data = snapshot.val();
          const { email, name, number, uid } = data;
          this.setUser({ email, name, number, uid });
          resolve();
        },
        {
          onlyOnce: true,
        }
      );
    });
  }
}

const userStore = new UserStore();
export default userStore;
