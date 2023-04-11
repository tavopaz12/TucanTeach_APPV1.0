import React, { useEffect, useState } from "react";

import DropFileInput from "../components/DrapAndDrop";
import axios from "axios";
import validateUrl from "./../hooks/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import "../styles/ModalChangeImage.scss";
import ToastAlert from "../containers/ToastAlert";

export default function ModalChangeImage({
  avatar,
  setShowModal,
  user,
  setNewAvatar,
}) {
  const [avatars, setAvatars] = useState([]);

  const [avatarSelect, setAvatarSelect] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const baseUrl = validateUrl();

    const getAvatars = async () => {
      try {
        const res = await axios.get(`${baseUrl}/upload/avatars`);
        setAvatars(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAvatars();
  }, []);

  const viewUrl = (e) => {
    setAvatarSelect(e.target.src);
  };

  const updateAvatar = async (evt) => {
    const baseUrl = validateUrl();
    evt.preventDefault();

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      if (file) {
        const res = await axios.patch(`${baseUrl}/users/${user.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setStatus(res.status);
        setLoading(true);
        setNewAvatar(res.data.avatar);
      } else {
        const res = await axios.patch(`${baseUrl}/users/${user.id}`, {
          avatar: avatarSelect,
        });

        setStatus(res.status);
        setLoading(true);
        setNewAvatar(res.data.avatar);
      }
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setStatus(null);
      setLoading(false);
    }, 5000);
  };

  return (
    <div className="modal__change__image">
      {status === 200 && (
        <ToastAlert show success text="Foto de perfil actualizada 📸" />
      )}

      <div className="container">
        <FontAwesomeIcon
          className="btn__close"
          icon={faXmark}
          onClick={closeModal}
        />

        <div className="select__image">
          <h3>Seleccionar Imagen</h3>
          <div className="avatars__flex">
            {avatars?.map((avatar) => (
              <img
                onClick={viewUrl}
                key={avatar}
                src={`https://tavopaz12.ml/public/avatar/${avatar}`}
                alt=""
              />
            ))}
          </div>
        </div>
        <div className="upload__image">
          <div>
            <img
              className="preview__avatar"
              src={avatarSelect ? avatarSelect : avatar}
              alt=""
            />
            <div className="btn__groups">
              <button
                onClick={updateAvatar}
                className={`save ${
                  !avatarSelect || loading ? "disabled" : null
                }`}
              >
                Guardar
              </button>
              <button className="cancel" onClick={closeModal}>
                Cancelar
              </button>
            </div>
          </div>
          <DropFileInput setAvatarSelect={setAvatarSelect} setFile={setFile} />
        </div>
      </div>
    </div>
  );
}
