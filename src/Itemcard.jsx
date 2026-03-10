function IC(props) {
  props.name = "Name";
  return (
    <div className="card">
      <div className="emoji">{props.emoji}</div>
      <h3>{props.name}</h3>
      <p>{props.desc}</p>
      <p>{props.email}</p>
      <button onClick={props.onDelete}>Delete</button>
    </div>
  );
}
export default IC;
