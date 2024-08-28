import path from "path";
import crypto from "crypto";
import multer from "multer";

const tempFolder = path.resolve(__dirname, "..", "..", "temp");

export default {
  tempFolder,
  uploadsFolder: path.resolve(tempFolder, "upload"),

  storage: multer.diskStorage({
    destination: tempFolder,
    filename(_, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
};
