import React, { useState } from "react";
import Repositories from "./Components/Repos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button, TextField, Container, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";

const queryClient = new QueryClient();

function App() {
  const [username, setUsername] = useState<string>("");
  const [searchUsername, setSearchUsername] = useState<string>("");

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
          overflowY: "auto", // Ensure container scrolls if content is too long
        }}
      >
        <h1>GitHub Repository Viewer</h1>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            mb: 5,
            bgcolor: "#0366d6",
            ":hover": {
              bgcolor: "#0356a1",
            },
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
          onClick={handleHome}
        >
          <HomeIcon sx={{ fontSize: 24 }} /> Home
        </Button>
        <Box sx={{ display: "flex", gap: 2, mb: 0 }}>
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
            }}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: "#28a745", // Green for search
              ":hover": {
                bgcolor: "#218838", // Darker green for hover
              },
              minWidth: 115,
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1, // Space between icon and text
            }}
            onClick={handleSearch}
          >
            <SearchIcon sx={{ fontSize: 24 }} />
            Search
          </Button>
        </Box>
        {searchUsername && <Repositories username={searchUsername} />}
      </Container>
    </QueryClientProvider>
  );
}

export default App;
