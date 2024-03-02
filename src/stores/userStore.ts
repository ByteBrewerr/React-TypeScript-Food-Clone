import { makeAutoObservable, runInAction } from "mobx";
import { User } from "../types/userType";
import { auth } from "../firebase";
import { getDatabase, onValue, ref, update } from "firebase/database";
import notify from "../utils/notify";

class UserStore {
  email: string = "";
  number: string = "";
  name: string = "";
  uid: string = "";
  isLoadingUser = false;

  constructor() {
    makeAutoObservable(this);

    this.setIsLoading(true);

    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await this.fetchUserData(user.uid);
        localStorage.setItem("uid", user.uid);
      } else {
        this.removeUser();
        localStorage.removeItem("uid");
      }
      this.setIsLoading(false);
    });
  }

  public get isAuth(): boolean {
    return !!this.email;
  }

  setIsLoading = (value: boolean) => {
    this.isLoadingUser = value;
  };

  setUser = (user: User) => {
    this.email = user.email;
    this.number = user.number;
    this.name = user.name;
    this.uid = user.uid;
  };

  updateNumber = async (number: string) => {
    const db = getDatabase();
    const dbRef = ref(db, "/users/" + this.uid);

    const newData = {
      number,
    };
    try {
      await update(dbRef, newData);
      runInAction(() => {
        this.number = number;
      });
      notify("Номер обновлен", "success");
    } catch (error) {
      notify("Ошибка при обновлении номера", "error");
    }
  };
  updateName = async (name: string) => {
    const db = getDatabase();
    const dbRef = ref(db, "/users/" + this.uid);

    const newData = {
      name,
    };
    try {
      await update(dbRef, newData);
      runInAction(() => {
        this.name = name;
      });
      notify("Имя обновлено", "success");
    } catch (error) {
      notify("Ошибка при обновлении Имени", "error");
    }
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
