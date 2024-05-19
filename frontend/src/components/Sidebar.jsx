import React, { useContext, useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import { addNotifications, resetNotifications } from "../features/userSlice";
import "./Sidebar.css";

function Sidebar() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { socket, setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, rooms, setPrivateMemberMsg, currentRoom } = useContext(AppContext);

    function joinRoom(room, isPublic = true) {
        if (!user) {
            return alert("Please login");
        }
        socket.emit("join-room", room, currentRoom);
        setCurrentRoom(room);

        if (isPublic) {
            setPrivateMemberMsg(null);
        }
        // dispatch for notifications
        dispatch(resetNotifications(room));
    }

    socket.off("notifications").on("notifications", (room) => {
        if (currentRoom != room) dispatch(addNotifications(room));
    });

    useEffect(() => {
        if (user) {
            setCurrentRoom("General");
            getRooms();
            socket.emit("join-room", "General");
            socket.emit("new-user");
        }
    }, []);

    socket.off("new-user").on("new-user", (payload) => {
        setMembers(payload);
    });

    function getRooms() {
        fetch("http://localhost:5000/rooms")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((data) => setRooms(data))
            .catch((error) => {
                console.error("Error fetching rooms:", error);
                
            });
    }
    
    if (!user) {
        return <></>;
    }
    return (
        <>
        <h2 className="text-xl font-bold">Available rooms</h2>
        <ul className="divide-y divide-gray-200">
  {rooms.map((room, idx) => (
    <li key={idx} onClick={() => joinRoom(room)} className={`flex items-center justify-between py-3 px-4 cursor-pointer ${room === currentRoom ? 'bg-gray-100' : ''}`}>
      <span className="text-lg font-medium">{room}</span>
      {currentRoom !== room && (
        <span className="inline-flex items-center justify-center px-2 py-1 text-sm font-semibold leading-none text-white bg-blue-500 rounded-full">
          {user.newMessages[room]}
        </span>
      )}
    </li>
  ))}
</ul>



        
    </>
    
    );
}

export default Sidebar;
