import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/Conversation.scss";
import validateUrl from "./../hooks/config";

export default function Conversation({ conversation, currentUser, setChats }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const baseUrl = validateUrl();

    const friendId = conversation.members.find((m) => m !== currentUser);

    const getUser = async () => {
      try {
        const res = await axios.get(`${baseUrl}/users/${friendId}`);
        setUser(res.data);
        setChats((prevChats) => [...prevChats, res.data]);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [currentUser, conversation, setChats]);

  return (
    <>
      <div className="conversation">
        <img className="conversation__img" src={user?.avatar} alt="" />
        <p className="conversation__userName">{user?.userName}</p>
      </div>
    </>
  );
}
