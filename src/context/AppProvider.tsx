import React, { createContext, useEffect, useState, ChangeEvent, ReactNode } from "react";
import { Answer, CharacterResult } from "../interfaces";
import bringCharacters from "../services/api-calls";

interface AppContextType {
  characters: CharacterResult[];
  filteredCharacters: CharacterResult[];
  searchQuery: string;
  isLoggedIn: boolean;
  username: string;
  password: string;
  loggedInUsername: string;
  favorites: Set<number>;
  showFavoritesOnly: boolean;
  msgError: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  handleLogin: () => void;
  handleLogout: () => void;
  handleUsernameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
  toggleFavorite: (id: number) => void;
  toggleShowFavorites: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);


const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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
          fetched.data && setCharacters(fetched.data.results);
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

  return (
    <AppContext.Provider value={{
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
      toggleShowFavorites
    }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
