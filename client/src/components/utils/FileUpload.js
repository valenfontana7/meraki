import React, { useState, useEffect } from "react";
import fUp from "./FileUpload.module.css";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
function FileUpload(props) {
  const [Image, setImage] = useState({
    path: "",
  });
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    setImage({ path: null });
  }, []);

  const onDrop = (files) => {
    setLoading(true);
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    axios
      .post("/product/upload", formData, config)
      .then((response) => {
        if (response.data.success === true) {
          setImage({ path: response.data.fileName });
          props.refreshFunction(response.data.fileName);
          setLoading(false);
        } else {
          console.log(response);
          alert("Failed to save the image in server");
        }
      });
  };

  return (
    <div className={fUp.component}>
      <div className={fUp.fullarea}>
        <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <PlusOutlined
                style={{
                  width: "150px",
                  height: "150px",
                  color: "grey",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "26px",
                }}
              />
            </div>
          )}
        </Dropzone>
        {!Image.path ? (
          <span></span>
        ) : (
          <div>
            <p className={fUp.image}>{Image.path}</p>
            <div className={` ${fUp.message}`}>Imagen subida con éxito!</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
