import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { MessageObj } from "../utils/chatTree/type";

const TreeStructure = () => {
  const [messages, setMessages] = useState<MessageObj[]>([]);

  const messageRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);

  // メッセージ作成の共通関数
  const createMessage = (parentId?: string) => {
    const inputMessage = messageRef?.current?.value;
    const inputRole = roleRef?.current?.checked;

    if (inputMessage) {
      const newMessage: MessageObj = {
        id: uuidv4(),
        message: inputMessage,
        role: inputRole ? "user" : "assistant",
        createdAt: new Date(),
        ...(parentId ? { parentId } : {}),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  const handleCreateMessage = () => {
    createMessage();
  };

  const handleCreateBranch = (parentId: string) => {
    createMessage(parentId);
  };

  return (
    <div style={{ position: "fixed", top: 0 }}>
      <h1>tree structure</h1>
      <div>
        <input ref={messageRef} type="text" placeholder="Enter text" />
        <label htmlFor="role">user?</label>
        <input ref={roleRef} type="checkbox" id="role" />
        <button type="submit" onClick={handleCreateMessage}>
          Submit
        </button>
      </div>
      <div>
        <h2>json here</h2>
        <div style={{ overflowY: "scroll", maxHeight: "500px" }}>
          {messages.map((message: MessageObj) => (
            <div key={message.id}>
              <p>{message.role}</p>
              <p>{message.createdAt.getTime()}</p>
              <h3>{message.message}</h3>
              <div>
                <p>{message.id}</p>
                {message.parentId && <p>Parent ID: {message.parentId}</p>}
              </div>
              <button
                type="submit"
                onClick={() => handleCreateBranch(message.id)}
              >
                create branch
              </button>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreeStructure;
