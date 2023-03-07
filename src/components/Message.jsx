import "../styles/Message.scss";

import TimeAgo from "javascript-time-ago";
import es from "javascript-time-ago/locale/es";

TimeAgo.addDefaultLocale(es);

export default function Message({
  own,
  message,
  senderUser,
  receviedUser,
  deleting,
  idDeleting,
}) {
  const timeAgo = new TimeAgo("es-MX");

  return (
    <>
      <div className={own ? "message own" : "message"}>
        <div className="message__top">
          <img
            className="message__img"
            src={own ? senderUser.avatar : receviedUser.avatar}
            alt=""
          />

          <div className="message__text">
            {message?.img ? (
              <img
                alt={message?.img}
                className="show__img"
                src={message?.img}
              />
            ) : (
              ""
            )}
            <p>{message?.text}</p>
          </div>
        </div>
        <div className="message__bottom">
          {deleting && idDeleting === message.id ? (
            <span style={{ color: "red" }}>Eliminando</span>
          ) : (
            timeAgo.format(new Date(message?.createdAt))
          )}
        </div>
      </div>
    </>
  );
}
