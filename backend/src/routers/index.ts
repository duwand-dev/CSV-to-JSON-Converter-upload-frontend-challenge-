import { Hono } from "hono"

import UploadApi from "./api/upload.api.js"
import MrfApi from "./api/mrf.api.js"

const useRouter = (app: Hono) => {
  app.route("/upload", UploadApi);
  app.route("/mrf-files", MrfApi);
}

export default useRouter