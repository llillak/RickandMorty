import React, { useContext } from "react";
import { AppContext } from "../context/AppProvider";

const Home: React.FC = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Home must be used within an AppProvider");
  }

  const {
    characters,
    filteredCharacters,
    searchQuery,
    isLoggedIn,
    username,
    password,
    loggedInUsername,
    favorites,
    showFavoritesOnly,
    msgError,
    handleSearch,
    handleLogin,
    handleLogout,
    handleUsernameChange,
    handlePasswordChange,
    toggleFavorite,
    toggleShowFavorites,
  } = context;

  const favoriteCharacters = characters.filter(character => favorites.has(character.id));
  const displayedCharacters = showFavoritesOnly ? favoriteCharacters : filteredCharacters;

  return (
    <div className="container">
      <img src={"/rick.png"} alt="Rick" className="rick-image" />

      {isLoggedIn ? (
        <div className="box">
          <div className="profile-info" onClick={toggleShowFavorites}>{loggedInUsername}</div>
          <button onClick={handleLogout}>Logout</button>
          {!showFavoritesOnly && (
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by character name..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
              />
            </div>
          )}
          {showFavoritesOnly && favoriteCharacters.length === 0 && (
            <div className="error-message">No favorite characters found.</div>
          )}
          {displayedCharacters.length > 0 ? (
            <div className="character-list">
              {displayedCharacters.map((character) => {
                const statusClass =
                  character.status === "Alive"
                    ? "alive"
                    : character.status === "Dead"
                    ? "dead"
                    : "unknown";
                return (
                  <div key={character.id} className="character-card">
                    <span
                      className={`star ${favorites.has(character.id) ? "favorite" : ""}`}
                      onClick={() => toggleFavorite(character.id)}
                    >
                      ★
                    </span>
                    <img
                      src={character.image}
                      alt={character.name}
                      className="character-image"
                    />
                    <div className="character-details">
                      <div className="character-name">{character.name}</div>
                      <div className="character-status">
                        <div className={`status-circle ${statusClass}`}></div>
                        {character.status} - {character.species}
                      </div>
                      <div className="details">Origin:</div>
                      <div className="character-origin">{character.origin.name}</div>
                      <div className="details">Last known Location:</div>
                      <div className="character-location">{character.location.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="error-message">{msgError}</div>
          )}
        </div>
      ) : (
        <div className="box">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button onClick={handleLogin}>Login</button>
          {msgError && <div className="error-message">{msgError}</div>}
        </div>
      )}
    </div>
  );
};

export default Home;