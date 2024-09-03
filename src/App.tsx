import React, { useState } from "react";
import Repositories from "./Components/Repos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "@mui/material";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [searchUsername, setSearchUsername] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSearch = () => {
    setSearchUsername(username);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <h1>GitHub Repository Viewer</h1>
          <input
            type="text"
            value={username}
            className="search-bar"
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Enter GitHub username"
          />
          <Button
            onClick={handleSearch}
            variant="contained"
            className="search-button"
          >
            Search
          </Button>
          {searchUsername && <Repositories username={searchUsername} />}
        </header>
      </div>
    </QueryClientProvider>
  );
};

export default App;
