import { useRef } from "react";
import ChatComment from "./ChatComment/ChatComment";
import { Comment } from "../../types";
import { addChatMessage } from "../../utils/databaseUtils/databaseUtils";
import "./ChatBox.scss";
import { useAuth } from "../../contexts/FirebaseContext";

type Props = {
  chatLog: Array<Comment>;
  userID: string;
};

function ChatBox({ chatLog, userID }: Props) {
  const { currentUser } = useAuth();

  const commentRef = useRef<HTMLInputElement>(null);

  return (
    <div className="chat">
      <h2 className="chat__title">Chat:</h2>
      <div className="chat__comments">
        {chatLog &&
          chatLog.map((comment, i) => {
            return <ChatComment key={i} comment={comment} />;
          })}
      </div>

      <div className="chat__new-comment">
        <input
          className="chat__input"
          ref={commentRef}
          type="text"
          name=""
          id=""
          onKeyDown={(e) => {
            if (e.key === "Enter" && commentRef.current!.value !== "") {
              const newComment: Comment = { user: currentUser.displayName, comment: commentRef.current!.value };
              addChatMessage(userID, newComment);
              commentRef.current!.value = "";
            }
          }}
        />
        <button
          className="chat__submit"
          onClick={() => {
            if (commentRef.current!.value !== "") {
              const newComment: Comment = { user: currentUser.displayName, comment: commentRef.current!.value };
              addChatMessage(userID, newComment);
              commentRef.current!.value = "";
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
export default ChatBox;
