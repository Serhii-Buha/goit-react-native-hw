import { fireStore } from "./config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

export const registerUser = async ({ url, login, email, uid }) => {
  const db_obj = { login, email, url };
  try {
    const docRef = await setDoc(doc(fireStore, "users", uid), db_obj);
  } catch (error) {
    console.log("set firebase ", error.message);
  }
};

export const getUserData = async (id) => {
  try {
    const getFirestore = await getDoc(doc(fireStore, "users", id));
    if (getFirestore.exists()) {
      return getFirestore.data();
    }
  } catch (error) {
    console.log('get user data ', error.message)
  }
};

export const setPost = async (post) => {
  try {
    const docRef = await setDoc(
      doc(fireStore, "posts", `${post.creationTime}`),
      post
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllPostsFirestore = async () => {
  const data = [];
  const querySnapshot = await getDocs(collection(fireStore, "posts"));
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

export const deletePost = async (id) => {
  try {
    await deleteDoc(doc(fireStore, "posts", `${id}`));
  } catch (error) {
    console.log(error.message);
  }
};

export const setComment = async ({ id, ...comment }) => {
  try {
    const docRef = await updateDoc(doc(fireStore, "posts", `${id}`), {
      comments: arrayUnion(comment),
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const setLike = async ({ id, mail }) => {
  try {
    const docRef = await updateDoc(doc(fireStore, "posts", `${id}`), {
      likes: arrayUnion(mail),
    });
  } catch (error) {
    console.log(error.message);
  }
};
