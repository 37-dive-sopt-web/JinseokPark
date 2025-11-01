import "./App.css";
import data from "./member.js";
import Card from "./components/Card.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <>
      <Header />
      <div className="card_wrapper">
        {data.map((memberData) => (
          <Card
            key={memberData.id}
            name={memberData.name}
            engName={memberData.englishName}
            github={memberData.github}
          />
        ))}
      </div>
    </>
  );
}

export default App;
