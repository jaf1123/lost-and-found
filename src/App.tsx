import { useState } from "react";
import IC from "./Itemcard.jsx";
import Itemcardcreator from "./Itemcardcreator.jsx";
import "./style.css";
export default function App() {
  // State: an array of card objects
  const [cards, setCards] = useState([]);
  // Function to add a new card
  const addCard = (newCard) => {
    setCards([...cards, newCard]);
  };
  //function for clearing cards
  const clearAll = () => {
    setCards([]);
  };
  //function to delete an individual card
  const deleteCard = (indexToDelete) => {
    setCards(cards.filter((_, index) => index !== indexToDelete));
  };
  return (
    <div className="app">
      <h1 className="PageTXT">Campus Lost Item Reporting System</h1>
      <p className="PageTXT">Total lost items: {cards.length}</p>
      <Itemcardcreator onAddCard={addCard} />
      <button className="AdminDelbutton" onClick={clearAll}>
        Delete all (Admin only)
      </button>
      <div className="card-grid">
        {cards.map((card, index) => (
          <IC
            key={index}
            user={card.user}
            name={card.name}
            desc={card.desc}
            email={card.email}
            emoji={card.emoji}
            onDelete={() => deleteCard(index)}
          />
        ))}
      </div>
      <div className="PageTXT">
        {cards.length === 0 ? (
          <p>It seems nothing is currently lost!</p>
        ) : (
          <div className="card-grid">{/* ... map over cards */}</div>
        )}
      </div>
    </div>
  );
}
