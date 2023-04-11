import React, { useRef } from "react";

import "../styles/DrapAndDrops.scss";

import uploadImg from "../assets/cloud-upload-regular-240.png";

const DropFileInput = ({ setAvatarSelect, setFile }) => {
  const wrapperRef = useRef(null);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    setFile(e.target.files[0]);

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imageDataUrl = reader.result;
      setAvatarSelect(imageDataUrl);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <img src={uploadImg} alt="" />
          <p>Arrastra tus archivos aqui...</p>
        </div>
        <input type="file" value="" onChange={onFileDrop} />
      </div>
    </>
  );
};

export default DropFileInput;
