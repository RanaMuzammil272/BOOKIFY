import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import "./MessageForm.css";

function MessageForm() {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } = useContext(AppContext);
  const messageEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;
    return month + "/" + day + "/" + year;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, getFormattedDate());
    setMessage("");
  }

  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const todayDate = getFormattedDate();

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    setMessages(roomMessages);
  });

  return (
    <div className="message-form-container">
      <div className="messages-output">
        {user && !privateMemberMsg?._id && (
          <div className="room-info">You are in the {currentRoom} room</div>
        )}

        {user && privateMemberMsg?._id && (
          <div className="conversation-info">
            Your conversation with {privateMemberMsg.name}
          </div>
        )}

        {!user && <div className="alert">Please login</div>}

        {user &&
          messages.map(({ _id: date, messagesByDate }, idx) => (
            <div key={idx}>
              <p className="date-separator">{date}</p>
              {messagesByDate?.map(({ content, time, from: sender }, msgIdx) => (
                <div
                  className={
                    sender?.email === user?.email
                      ? "message-container justify-end"
                      : "message-container justify-start"
                  }
                  key={msgIdx}
                >
                  <div
                    className={
                      sender?.email === user?.email
                        ? "message bg-green-400 text-white"
                        : "message bg-gradient-to-r from-blue-gray-300 to-gray-300 text-gray-800"
                    }
                  >
                    <div className="message-header">
                      <p className="sender-name">
                        {sender._id === user?._id ? "You" : sender.name}
                      </p>
                    </div>
                    <p className="message-content">{content}</p>
                    <p className="message-time">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}

        <div ref={messageEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="message-input-container">
        <input
          type="text"
          placeholder="Your message"
          disabled={!user}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-input"
        />
        <button
          type="submit"
          className={`send-button ${!user && "disabled"}`}
          disabled={!user}
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
}

export default MessageForm;
