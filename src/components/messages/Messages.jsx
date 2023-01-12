import "./messages.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

const url = "https://strangers-things.herokuapp.com/api/2110-ftb-et-web-pt/";

const Message = ({ content, setContent, fetchUser, message, setMessage }) => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}posts/${id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: {
            content,
          },
        }),
      });
      const data = await response.json();
      setContent("");
      setSent(true);
      fetchUser();
      setMessage("Your message has been sent!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div className="message_container">
    <h1>Send a Message</h1>
      <form className="new-post" onSubmit={handleSubmit}>
        {!sent && <input
          id="message-body"
          type="text"
          placeholder="What do you want to ask the seller?..."
          value={content}
          required
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></input>}
        {!sent && <button className="btn" type="submit" >Send Message</button>}
        <p>{message}</p>
        {message !== "" && (
          <Link to="/posts">
            <button className="btn">Back to Posts</button>
          </Link>
        )}
        
      </form>
      </div>
    </>
  );
};

export default Message;
