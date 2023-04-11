import React from "react";
import ChatGroupList from "../components/ChatGroupList";
import ChatView from "../components/ChatView";

function ChatContainer() {
  return (
    <div>
      <ChatGroupList />
      <ChatView />
    </div>
  );
}

export default ChatContainer;
