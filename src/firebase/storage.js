import { storage } from "./config";
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

export const setStorage = async ({ folder, creationTime, file }) => {
  const snapshot = await uploadBytes(
    ref(storage, `${folder}/${creationTime}.jpg`),
    file
  );
  const url = await getDownloadURL(snapshot.ref);
  return url;
};
