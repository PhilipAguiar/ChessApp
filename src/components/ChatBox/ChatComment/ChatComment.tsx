import { Comment } from "../../../types";
import "./ChatComment.scss";

type Props = { comment: Comment };

function ChatComment({ comment }: Props) {
  return (
    <div>
      <p>
        {comment.user}: {comment.comment}
      </p>
    </div>
  );
}
export default ChatComment;
