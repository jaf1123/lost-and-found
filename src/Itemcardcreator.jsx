import { useState } from "react";
function ItemcardCreator(props) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [email, setEmail] = useState("");
  const [emoji, setEmoji] = useState("👕");
  const emojis = ["👕", "📱", "💻", "🔑", "🎧"];
  const handleSubmit = () => {
    // Don't create empty cards
    if (!name.trim()) {
      alert("Please enter a name!");
      return;
    }
    // Call the function passed from App
    props.onAddCard({
      name: name,
      desc: desc || "",
      email: email || "",
      emoji: emoji,
    });

    // Clear the form
    setName("");
    setDesc("");
    setEmail("");
    setEmoji("👕");
  };

  return (
    <div className="form-section">
      <h2>Report lost item?</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description (color,brand,etc)"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email, or other contact information"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p>Choose an emoji which best describes it:</p>
      <div className="emoji-picker">
        {emojis.map((e) => (
          <button
            key={e}
            type="button"
            className={emoji === e ? "selected" : ""}
            onClick={() => setEmoji(e)}
          >
            {e}
          </button>
        ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
export default ItemcardCreator;
