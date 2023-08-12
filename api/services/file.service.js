import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { app } from "../../config/firebase.config";
import * as FileSystem from "expo-file-system";

const db = getFirestore(app);

export const getManualPDF = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const storage = getStorage();
      const starsRef = ref(storage, "files/manual.pdf");

      const uri = await getDownloadURL(starsRef);

      const fileInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + "manual.pdf");
      if (!fileInfo.exists) {
        const downloadedUri = await FileSystem.downloadAsync(
          uri,
          FileSystem.documentDirectory + "manual.pdf"
        );
        if (downloadedUri.uri) {
          resolve(downloadedUri.uri);
        }
      } else {
        resolve(fileInfo.uri);
      }
    } catch (error) {
      reject(error);
    }
  });
};
