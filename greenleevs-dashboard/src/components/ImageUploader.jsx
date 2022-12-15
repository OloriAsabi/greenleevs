import React, { useEffect, useState } from "react";
import UploadService from "../apis/file-upload.service";

export default function UploadImages () {

    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [previewImages, setPreviewImages] = useState([]);
    const [progressInfos, setProgressInfos] = useState([]);
    const [message, setMessage] = useState([]);
    const [imageInfos, setImageInfos] = useState([]);
 
    useEffect(() => {
        UploadService.getFiles().then((response) => {
            setImageInfos(response.data)
        });
    }, [])
    

 const selectFiles = (event) => {
    let images = [];

    for (let i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]));
    }

      setProgressInfos([])
      setMessage([])
      setSelectedFiles(event.target.files)
      setPreviewImages(images)
  }

 const upload = (idx, file) => {
    let _progressInfos = [...progressInfos];

    UploadService.upload(file, (event) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
      setProgressInfos(_progressInfos)
    })
      .then(() => {
        this.setState((prev) => {
          let nextMessage = [
            ...prev.message,
            "Uploaded the image successfully: " + file.name
          ];
          return {
            message: nextMessage
          };
        });

        return UploadService.getFiles();
      })
      .then((files) => {
        setImageInfos(files.data)
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;
        this.setState((prev) => {
          let nextMessage = [
            ...prev.message,
            "Could not upload the image: " + file.name
          ];
          return {
            progressInfos: _progressInfos,
            message: nextMessage
          };
        });
      });
  }

const uploadImages = () => {

    let _progressInfos = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      _progressInfos.push({ percentage: 0, fileName: selectedFiles[i].name });
    }

    setProgressInfos(_progressInfos)
    setMessage([])
    for (let i = 0; i < selectedFiles.length; i++) {
          upload(i, selectedFiles[i]);
        }
    }



    return (
      <div>
        <div className="row">
          <div className="col-8">
            <label className="btn btn-default p-0">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={selectFiles}
              />
            </label>
          </div>

          <div className="col-4">
            <button
              className="btn btn-success btn-sm"
              disabled={!selectedFiles}
              onClick={uploadImages}
            >
              Upload
            </button>
          </div>
        </div>

        {progressInfos &&
          progressInfos.map((progressInfo, index) => (
            <div className="mb-2" key={index}>
              <span>{progressInfo.fileName}</span>
              <div className="progress">
                <div
                  className="progress-bar progress-bar-info"
                  role="progressbar"
                  aria-valuenow={progressInfo.percentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: progressInfo.percentage + "%" }}
                >
                  {progressInfo.percentage}%
                </div>
              </div>
            </div>
          ))}

        {previewImages && (
          <div>
            {previewImages.map((img, i) => {
              return (
                <img className="preview" src={img} alt={"image-" + i} key={i} />
              );
            })}
          </div>
        )}

        {message.length > 0 && (
          <div className="alert alert-secondary mt-2" role="alert">
            <ul>
              {message.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          </div>
        )}

        <div className="card mt-3">
          <div className="card-header">List of Files</div>
          <ul className="list-group list-group-flush">
            {imageInfos &&
              imageInfos.map((img, index) => (
                <li className="list-group-item" key={index}>
                  <p>
                    <a href={img.url}>{img.name}</a>
                  </p>
                  <img src={img.url} alt={img.name} height="80px" />
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  
}
