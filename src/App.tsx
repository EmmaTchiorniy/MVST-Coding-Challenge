import React, { useState } from "react";
import Repositories from "./Components/Repos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button, TextField, Container } from "@mui/material";

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

  const handleHome = () => {
    setUsername("");
    setSearchUsername("");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#f6f8fa", // Light background similar to GitHub
          minHeight: "100vh",
          padding: 4,
        }}
      >
        <h1>GitHub Repository Viewer</h1>
        <Button
          variant="contained"
          sx={{
            mb: 2,
            bgcolor: "#0366d6", // GitHub blue
            ":hover": {
              bgcolor: "#0356a1", // Darker blue for hover
            },
          }}
          onClick={handleHome}
        >
          Home
        </Button>
        <TextField
          label="Enter GitHub username"
          variant="outlined"
          value={username}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          sx={{ mb: 2, width: "100%", maxWidth: 400 }}
        />
        <Button
          variant="contained"
          sx={{
            bgcolor: "#28a745", // Green for search
            ":hover": {
              bgcolor: "#218838", // Darker green for hover
            },
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
        {searchUsername && <Repositories username={searchUsername} />}
      </Container>
    </QueryClientProvider>
  );
};

export default App;
