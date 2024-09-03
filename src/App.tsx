import React, { useState } from "react";
import Repositories from "./Components/Repositories";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button, TextField, Container, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";

// Define QueryClient for React Query API calls
const queryClient = new QueryClient();

function App() {
  // Defined separate useStates for username and searchUsername
  const [username, setUsername] = useState<string>("");
  const [searchUsername, setSearchUsername] = useState<string>("");

  // Functions for user interactions
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handleSearch() {
    setSearchUsername(username);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  function handleHome() {
    setUsername("");
    setSearchUsername("");
  }

  // html with styling & calling the Repositories function
  return (
    <QueryClientProvider client={queryClient}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#f6f8fa",
          minHeight: "100vh",
          padding: 4,
          overflowY: "auto",
        }}
      >
        <h1>GitHub Repository Viewer</h1>

        <Box sx={{ display: "flex", gap: 2, mb: 4, mt: 6 }}>
          <TextField
            label="GitHub Username"
            variant="outlined"
            value={username}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            sx={{
              width: "100%",
              maxWidth: 400,
              minWidth: 250,
              "& .MuiInputBase-root": {
                height: 45,
              },
              "& .MuiInputLabel-root": {
                top: -5,
                left: 5,
              },
              "& .MuiOutlinedInput-input": {
                padding: "10px 14px",
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: "#28a745",
              ":hover": {
                bgcolor: "#218838",
              },
              minWidth: 117,
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
            onClick={handleSearch}
          >
            <SearchIcon sx={{ fontSize: 24 }} />
            Search
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#0366d6",
              ":hover": {
                bgcolor: "#0356a1",
              },
              minWidth: 110,
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
            onClick={handleHome}
          >
            <HomeIcon sx={{ fontSize: 24 }} /> Home
          </Button>
        </Box>
        {searchUsername && <Repositories username={searchUsername} />}
      </Container>
    </QueryClientProvider>
  );
}

export default App;
