import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
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
    }

    function scrollToBottom() {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    const todayDate = getFormattedDate();

    socket.off("room-messages").on("room-messages", (roomMessages) => {
        setMessages(roomMessages);
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (!message) return;
        const today = new Date();
        const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        const time = today.getHours() + ":" + minutes;
        const roomId = currentRoom;
        socket.emit("message-room", roomId, message, user, time, todayDate);
        setMessage("");
    }
    return (
        <>
        <div className="messages-output">
                {user && !privateMemberMsg?._id && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative -z-10" role="alert">
            You are in the {currentRoom} room
          </div>
        )}

        {user && privateMemberMsg?._id && (
          <div className="alert alert-info bg-blue-200 text-blue-800 conversation-info">
            <div>
              Your conversation with {privateMemberMsg.name}{" "}
            
            </div>
          </div>
        )}

          {!user && <div className="alert alert-danger">Please login</div>}
      
          {user &&
  messages.map(({ _id: date, messagesByDate }, idx) => (
    <div key={idx}>
      <p className="bg-blue-500 text-white text-center p-2 rounded-md">{date}</p>
      {messagesByDate?.map(({ content, time, from: sender }, msgIdx) => (
        <div
          className={
            sender?.email === user?.email
              ? "flex justify-end my-4"
              : "flex justify-start my-4"
          }
          key={msgIdx}
        >
          <div
            className={
              sender?.email === user?.email
                ? "bg-red-200 p-4 rounded-lg rounded-tr-none mr-4"
                : "bg-gray-300 p-4 rounded-lg rounded-tl-none ml-4"
            }
          >
            <div className="flex items-center mb-2">
              <p className="font-semibold">
                {sender._id === user?._id ? "You" : sender.name}
              </p>
            </div>
            <p className="text-gray-800">{content}</p>
            <p className="text-gray-600">{time}</p>
          </div>
        </div>
      ))}
    </div>
  ))}
        {user &&
  messages.map(({ _id: date, messagesByDate }, idx) => (
    <div key={idx}>
      <p className="bg-blue-500 text-white text-center p-2 rounded-md">{date}</p>
      {messagesByDate?.map(({ content, time, from: sender }, msgIdx) => (
        <div
          className={
            sender?.email === user?.email
              ? "flex justify-end my-4"
              : "flex justify-start my-4"
          }
          key={msgIdx}
        >
          <div
            className={
              sender?.email === user?.email
                ? "bg-red-200 p-4 rounded-lg rounded-tr-none mr-4"
                : "bg-gray-300 p-4 rounded-lg rounded-tl-none ml-4"
            }
            style={{ maxWidth: "70%" }} // Set maximum width here
          >
            <div className="flex items-center mb-2">
              <p className="font-semibold">
                {sender._id === user?._id ? "You" : sender.name}
              </p>
            </div>
            <p className="text-gray-800" style={{ wordWrap: "break-word" }}>{content}</p> {/* Apply word wrap */}
            <p className="text-gray-600">{time}</p>
          </div>
        </div>
      ))}
    </div>
  ))}



          <div ref={messageEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Your message"
              disabled={!user}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-10/12 border border-gray-300 rounded-l-md p-2"
            />
            <button
              type="submit"
              className={`w-2/12 bg-orange-500 text-white rounded-r-md ${!user && "cursor-not-allowed"}`}
              disabled={!user}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </>
      
    );
}

export default MessageForm;
