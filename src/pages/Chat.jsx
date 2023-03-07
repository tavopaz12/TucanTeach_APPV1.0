import Message from "../components/Message";
import Conversation from "../containers/Conversation";
import Header from "../containers/Header";
import UsersOnline from "../containers/UsersOnline";
import axios from "axios";
import { io } from "socket.io-client";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./../context/useProvider";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import "../styles/Chat.scss";
import validateUrl from "./../hooks/config";
import { useGetUser } from "./../hooks/useGetUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faImage } from "@fortawesome/free-regular-svg-icons";
import ChatHeader from "../components/ChatHeader";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function Chat() {
  const baseUrl = validateUrl();
  const { userId } = useContext(UserContext);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [conversationsCopy, setConversationsCopy] = useState([]);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [idRecevied, setidRecevied] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [idDeleting, setIdDeleting] = useState(null);

  const [newMessages, setNewMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [numOnlineFriends, setNumOnlineFriends] = useState(0);

  const [valueImage, setValueImage] = useState("");
  const [file, setFile] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const senderUser = useGetUser(userId);
  const reciviedUser = useGetUser(idRecevied);

  const scrollRef = useRef();
  const inputRef = useRef(null);
  const socket = useRef();

  //OBETENER MENSAJES DE SOCKET
  useEffect(() => {
    socket.current = io("ws://149.28.215.217:8900");

    socket.current.on("getMessage", (data) => {
      const incomingMessage = {
        sender: data.senderId,
        text: data.text,
        img: data.img,
        createdAt: Date.now(),
      };
      setArrivalMessage(incomingMessage);
      setNewMessages(newMessages.push(incomingMessage));
    });
  }, [newMessages]);

  // VERIFICAR SI HAY MENSAJES NUEVO E INSERTALOS
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage?.sender) &&
      setMessages((prev) =>
        Array.isArray(prev) ? [...prev, arrivalMessage] : [arrivalMessage]
      );
  }, [arrivalMessage, currentChat]);

  // OBTENER USUARIOS ACTIVOS
  useEffect(() => {
    socket.current.emit("addUser", userId);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [userId]);

  // INSERTAR EL ID DEL USUARIO QUE RECIBE EL MENSAJE
  useEffect(() => {
    if (currentChat) {
      const getReciviedUser = currentChat?.members.find((m) => m !== userId);
      setidRecevied(getReciviedUser);
    }
  }, [currentChat, userId]);

  // OBTENER CONVERSACIONES Y ORDENARLAS
  useEffect(() => {
    const baseUrl = validateUrl();

    const getConversations = async () => {
      const res = await axios.get(`${baseUrl}/conversations/${userId}`);

      //ORDENAR LAS CONVERSACIONES POR EL MENSAJE MAS RECIENTE
      const sortedConversations = res.data.sort((a, b) => {
        if (a.messages.length === 0 && b.messages.length === 0) {
          return 0;
        }
        if (a.messages.length === 0) {
          return 1;
        }
        if (b.messages.length === 0) {
          return -1;
        }
        const lastMessageA = a.messages[a.messages.length - 1];
        const lastMessageB = b.messages[b.messages.length - 1];
        return (
          new Date(lastMessageB.createdAt) - new Date(lastMessageA.createdAt)
        );
      });

      setConversation(sortedConversations);
    };

    getConversations();
  }, [userId]);

  // OBTENER MENSAJES EN RELACION A DOS USUARIOS
  useEffect(() => {
    const baseUrl = validateUrl();

    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/conversations/find/${currentChat?.members[0]}/${currentChat?.members[1]}`
        );
        setMessages(res.data[0]?.messages);
      } catch (err) {
        console.log(err);
      }
    };

    getMessages();
  }, [currentChat]);

  // VALIDAR QUE EL CAMPO NO ESTE VACIO
  const enterSendMessage = (evt) => {
    if (file && evt.key === "Enter") {
      sendMessage(evt);
      return;
    }
    if (evt.key === "Enter" && newMessage.trim() === "") {
      evt.preventDefault();
      return;
    }
    if (evt.key === "Enter") {
      sendMessage(evt);
      return;
    }
  };

  // ENVIAR MENSAJE POR MEDIO DE LA API
  const sendMessage = async (evt) => {
    evt.preventDefault();

    setShowEmojiPicker(false);
    setValueImage("");

    const formData = new FormData();
    formData.append("img", file);
    formData.append("sender", userId);
    formData.append("text", newMessage);
    formData.append("conversationId", currentChat.id);

    const receiverId = currentChat.members.find((member) => member !== userId);

    try {
      const res = await axios.post(`${baseUrl}/messages`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      socket.current.emit("sendMessage", {
        senderId: userId,
        receiverId,
        text: newMessage,
        img: res.data.img,
      });

      setMessages([...messages, res.data]);

      setNewMessage("");
      setFile(null); // resetear el archivo seleccionado después de enviar
    } catch (err) {
      console.log(err);
    }
  };

  //BAJAR EL SCROLL AUTOMATICAMENTE
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  // ELIMINAR MENSAJES
  const deleteMessage = async (message) => {
    setDeleting(true);
    setIdDeleting(message.id);

    if (message.sender === userId) {
      try {
        await axios.delete(`${baseUrl}/messages/${message.id}`);
        setMessages(messages.filter((msg) => msg.id !== message.id));
        setDeleting(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setDeleting(false);
    }
  };

  // MOSTRAR Y OCULTAR EMOJIS
  const handleEmojiSelect = (evt) => {
    if (showEmojiPicker) {
      setShowEmojiPicker(false);
    } else {
      setShowEmojiPicker(true);
    }
  };

  // SELECCIONAR IMAGENES Y GUARDAR LA IMAGEN SELECCIONADA
  const handleImageSelect = (e) => {
    console.log(e);
    setFile(e.target.files[0]);

    inputRef.current.focus();
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imageDataUrl = reader.result;
      setValueImage(imageDataUrl);
    };

    reader.readAsDataURL(file);
  };

  // INSERTAR TEXTO + EMOJIS
  const setEmoji = (evt) => {
    setNewMessage(newMessage + evt.native);
  };

  useEffect(() => {
    const filteredConversations = chats.filter((c) => {
      const userName = c.userName.toLowerCase().includes(searchQuery);
      return userName;
    });

    if (searchQuery === "") {
      setConversationsCopy([]);
    } else {
      setConversationsCopy(filteredConversations);
    }
  }, [searchQuery, chats]);

  const handleClikc = async (user) => {
    const baseUrl = validateUrl();
    setSearchQuery("");

    try {
      const res = await axios.get(
        `${baseUrl}/conversations/find/${userId}/${user.id}`
      );

      setCurrentChat(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const closePreviewImg = () => {
    setValueImage("");
    setFile(null);
  };

  return (
    <>
      <div className="header__chat">
        <Header />
      </div>
      <div className="messenger">
        <div className="chat__menu">
          <form className="form__search__friend">
            <input
              value={searchQuery}
              onChange={(evt) => setSearchQuery(evt.target.value)}
              type="text"
              placeholder="Buscar un chat"
              className="search__friend"
            />
          </form>

          <div className="chat__menu__wraper">
            <div className="results">
              {conversationsCopy?.map((o) => (
                <div
                  className="conversation"
                  key={o?.id}
                  onClick={() => handleClikc(o)}
                >
                  <img className="conversation__img" src={o?.avatar} alt="" />
                  <p className="conversation__userName">{o?.userName}</p>
                </div>
              ))}
            </div>

            <p className="chats__recientes">CHATS RECIENTES</p>

            {conversation.map((c) => (
              <div key={c.id} onClick={() => setCurrentChat(c)}>
                <Conversation
                  setChats={setChats}
                  arrivalMessage={arrivalMessage}
                  currentChat={currentChat}
                  messages={messages}
                  conversation={c}
                  currentUser={userId}
                />
              </div>
            ))}
          </div>
        </div>

        {currentChat ? (
          <>
            <div className="chat__box">
              <div className="chat__box__wraper" ref={scrollRef}>
                <ChatHeader
                  setMessages={setMessages}
                  messages={messages}
                  setCurrentChat={setCurrentChat}
                  currentChat={currentChat}
                  currentUser={userId}
                />
                <div className="chat__box__top">
                  {messages?.length === 0 ? (
                    <div className="not__messages">
                      <p>Sin Mensajes </p>
                      <p>Di hola</p>
                    </div>
                  ) : (
                    ""
                  )}
                  {messages?.map((m) => (
                    <div
                      onDoubleClick={() => deleteMessage(m)}
                      key={m.id}
                      ref={scrollRef}
                    >
                      <Message
                        idDeleting={idDeleting}
                        deleting={deleting}
                        senderUser={senderUser}
                        receviedUser={reciviedUser}
                        message={m}
                        own={m.sender === userId}
                      />
                    </div>
                  ))}
                </div>
                <div className="chat__box__bottom">
                  {valueImage ? (
                    <div className="preview__img">
                      <FontAwesomeIcon
                        onClick={closePreviewImg}
                        className="close__preview__img"
                        icon={faCircleXmark}
                      />
                      <img alt={valueImage} src={valueImage} />
                    </div>
                  ) : (
                    ""
                  )}
                  <div
                    className="show__emojis"
                    onClick={() => inputRef.current.focus()}
                  >
                    {showEmojiPicker ? (
                      <Picker
                        searchPosition={"none"}
                        dynamicWidth
                        autoFocus
                        locale={"es"}
                        previewPosition={"none"}
                        emojiSize={22}
                        data={data}
                        onEmojiSelect={setEmoji}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="input__box">
                    <textarea
                      className="message__input"
                      placeholder="Escrie algo..."
                      onChange={(evt) => setNewMessage(evt.target.value)}
                      value={newMessage}
                      onKeyDown={enterSendMessage}
                      onChangeCapture={() => setShowEmojiPicker(false)}
                      onClick={() => setShowEmojiPicker(false)}
                      autoFocus
                      ref={inputRef}
                    ></textarea>
                    <div className="emoji__input">
                      <div className="custom-file-upload">
                        <input
                          type="file"
                          accept="image/*"
                          capture="user"
                          className="open__file"
                          onChange={handleImageSelect}
                        />
                        <FontAwesomeIcon
                          className="emoji__input__image"
                          icon={faImage}
                        ></FontAwesomeIcon>
                      </div>

                      <FontAwesomeIcon
                        onClick={handleEmojiSelect}
                        className="emoji__input__btn"
                        icon={faFaceSmile}
                      ></FontAwesomeIcon>
                    </div>
                  </div>

                  <button
                    disabled={
                      valueImage
                        ? false
                        : newMessage.trim() === ""
                        ? true
                        : newMessage === ""
                        ? true
                        : false
                    }
                    className="message__send__btn"
                    onClick={sendMessage}
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="chat__no__conversation">
            <span className="no__conversation__text">
              Abre una conversacion para empezar un nuevo chat
            </span>
          </div>
        )}

        <div
          className={
            numOnlineFriends > 0 ? "chat__online" : "chat__online__none"
          }
        >
          <div className="chat__online__wraper">
            <UsersOnline
              setNumOnlineFriends={setNumOnlineFriends}
              conversation={conversation}
              setConversation={setConversation}
              setCurrentChat={setCurrentChat}
              users={onlineUsers}
              currentId={userId}
            />
          </div>
        </div>
      </div>
    </>
  );
}
