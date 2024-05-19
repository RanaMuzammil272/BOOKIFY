import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar.jsx";
import MessageForm from "../components/MessageForm.jsx";

function Chat() {
    
    return (
        <div className="container mx-auto mt-20 ">
        <div className="md:flex">
            <div className="md:w-1/4 mx-10">
                <Sidebar/>
            </div>
            <div className="md:w-3/4 ">
                <MessageForm/>
            </div>
        </div>
    </div>
    
    );
}

export default Chat;
