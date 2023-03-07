import { faArrowLeftLong, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "../styles/ChatHeader.scss";
import validateUrl from "./../hooks/config";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ChatHeader({
  setCurrentChat,
  currentChat,
  currentUser,
  messages,
  setMessages,
}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const baseUrl = validateUrl();

    const friendId = currentChat.members.find((m) => m !== currentUser);

    const getUser = async () => {
      try {
        const res = await axios.get(`${baseUrl}/users/${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [currentUser, currentChat]);

  const deleteConversation = async (e) => {
    const baseUrl = validateUrl();

    if (messages.length > 0) {
      try {
        await axios.delete(
          `${baseUrl}/messages/delete-messages/${currentChat?.id}`
        );
        setMessages([]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="header__chat__nav">
      <div className="header__chat__nav__picture">
        <span onClick={() => setCurrentChat(null)}>
          <FontAwesomeIcon className="close__chat" icon={faArrowLeftLong} />
        </span>
        <img
          alt={user?.avatar}
          className="header__chat__avatar"
          src={user?.avatar}
        />
        <Link className="link" to={`/user/${user?.userName}`}>
          {user?.userName}
        </Link>
      </div>

      <FontAwesomeIcon
        onClick={deleteConversation}
        className="icon__delete__chat"
        icon={faTrash}
      />
    </div>
  );
}
