import { useRef, useState } from "react";
import type { MessageObj } from "../utils/chatTree/type";

const TreeStructure = () => {
  const [messages, setMessages] = useState<MessageObj[]>([]);

  const messageRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);

  // 送信ボタンの挙動
  const handleClick = async () => {
    // 入力状態
    const inputMessage = messageRef?.current?.value;
    const inputRole = roleRef?.current?.checked;

    // 更新処理
    if (inputMessage) {
      const newMessage: MessageObj = {
        id: "hoge",
        message: inputMessage,
        role: inputRole ? "user" : "assistant",
        createdAt: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  return (
    <div style={{ position: "fixed", top: 0 }}>
      <h1>tree structure</h1>
      <div>
        <input ref={messageRef} type="text" placeholder="Enter text" />
        <label htmlFor="role">user?</label>
        <input ref={roleRef} type="checkbox" id="role" />
        <button type="submit" onClick={handleClick}>
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
              <button
                type="submit"
                onClick={() => console.log("created branch!")}
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
