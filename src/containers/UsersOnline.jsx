import { useContext, useEffect, useState } from "react";
import "../styles/UsersOnline.scss";
import { UserContext } from "../context/useProvider";
import validateUrl from "./../hooks/config";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";

export default function UsersOnline({
  setConversation,
  conversation,
  setCurrentChat,
  currentId,
  setNumOnlineFriends,
}) {
  const [onlineFriends, setonlineFriends] = useState([]);

  const { onlineUsers } = useContext(UserContext);
  const { myfriends } = useContext(UserContext);

  useEffect(() => {
    const friendIds = onlineUsers.map((user) => user.userId);

    const onlineFriends = myfriends.filter((f) => friendIds.includes(f.id));

    setonlineFriends(onlineFriends);

    if (onlineFriends.length > 0) {
      setNumOnlineFriends(onlineFriends.length);
    } else {
      setNumOnlineFriends(0);
    }
  }, [myfriends, onlineUsers, setNumOnlineFriends]);

  const handleClikc = async (user) => {
    const baseUrl = validateUrl();

    try {
      const res = await axios.get(
        `${baseUrl}/conversations/find/${currentId}/${user.id}`
      );

      const isEmpty = res.data.length === 0;

      const newConversation = {
        id: uuidv4(),
        senderId: currentId,
        receiverId: user.id,
        userId: currentId,
      };

      if (isEmpty) {
        const res = await axios.post(
          `${baseUrl}/conversations`,
          newConversation
        );
        setCurrentChat(res.data);
        setConversation([...conversation, res.data]);
      } else {
        setCurrentChat(res.data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="users__online">
        {onlineFriends?.map((o) => (
          <div
            key={o?.userName}
            className="online__friend"
            onClick={() => handleClikc(o)}
          >
            <div className="online__friend__imgContainer">
              <img className="online__friend__img" src={o?.avatar} alt="" />
              <div className="online__friend__badge"></div>
            </div>
            <span className="user__online__userName">{o?.userName}</span>
          </div>
        ))}
      </div>
    </>
  );
}
