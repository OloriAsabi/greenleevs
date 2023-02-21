import http from "./http-common";


const token =  localStorage.getItem("token");

class FileUploadService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("files", file);

    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization" :  `Bearer ${token}`
      },
      onUploadProgress
    });
  }

  getFiles() {
    return http.get("/files");
  }
}

 export default new FileUploadService();