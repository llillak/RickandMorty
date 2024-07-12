import React, { useEffect, useState, ChangeEvent } from "react";
import { Answer, CharacterResult } from "../../interfaces";
import bringCharacters from "../../services/api-calls";
import "./Home.css";

import rickImage from "../../assets/rick.png";

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<CharacterResult[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<CharacterResult[]>([]);
  const [flag, setFlag] = useState<boolean>(false);
  const [msgError, setMsgError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loggedInUsername, setLoggedInUsername] = useState<string>("");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);

  useEffect(() => {
    const fetchDataRickMorty = async (): Promise<void> => {
      try {
        const fetched: Answer = await bringCharacters();

        if (fetched.success) {
          setCharacters(fetched.data.results);
        } else {
          setMsgError(fetched.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMsgError("Failed to fetch characters.");
      } finally {
        setFlag(true);
      }
    };

    if (!flag && characters.length === 0) {
      fetchDataRickMorty();
    }
  }, [characters, flag]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCharacters(characters);
    } else {
      const filtered = characters.filter(character =>
        character.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
      setFilteredCharacters(filtered);
    }
  }, [characters, searchQuery]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(new Set(JSON.parse(storedFavorites)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  const handleLogin = (): void => {
    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
      setLoggedInUsername(username);
    } else {
      setIsLoggedIn(false);
      setLoggedInUsername("");
      setMsgError("Invalid username or password.");
    }
  };

  const handleLogout = (): void => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setLoggedInUsername("");
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const toggleFavorite = (id: number): void => {
    if (!isLoggedIn) return;
    setFavorites(prevFavorites => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const toggleShowFavorites = (): void => {
    setShowFavoritesOnly(!showFavoritesOnly);
  };

  const favoriteCharacters = characters.filter(character => favorites.has(character.id));

  const displayedCharacters = showFavoritesOnly ? favoriteCharacters : filteredCharacters;

  return (
    <div className="container">
      <img src={rickImage} alt="Rick" className="rick-image" />

      {isLoggedIn ? (
        <div>
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
        <div>
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

