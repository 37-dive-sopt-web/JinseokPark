import "./App.css";
import data from "./member.js";
import Card from "./components/Card.jsx";
import Header from "./components/Header.jsx";
import Search from "./components/Search.jsx";
import useSearch from "./hooks/useSearch.js";

function App() {
  const { search, filteredMembers, handleSearchChange, handleSearch } =
    useSearch(data);

  return (
    <>
      <Header />
      <Search
        search={search}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
      />
      <div className="card_wrapper">
        {filteredMembers.map((memberData) => (
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
