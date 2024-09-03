import React, { useState } from "react";
import Repositories from "./Components/Repos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button, TextField, Container, Box, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home"; // Import HomeIcon

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
          bgcolor: "#ffffff", // White background
          minHeight: "100vh",
          padding: 4,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow for container
        }}
      >
        <Typography variant="h3" component="h1" sx={{ mb: 4, fontWeight: 600 }}>
          GitHub Repository Viewer
        </Typography>
        <Box
          sx={{ display: "flex", gap: 2, mb: 4, width: "100%", maxWidth: 500 }}
        >
          <TextField
            label="Enter GitHub username"
            variant="outlined"
            value={username}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            sx={{
              flex: 1,
              "& .MuiInputBase-root": {
                borderRadius: "20px", // Rounded corners
              },
              "& .MuiInputLabel-root": {
                fontSize: "1rem", // Modern font size for label
              },
              "& .MuiOutlinedInput-root": {
                padding: "0 12px", // Consistent padding
                borderRadius: "20px", // Rounded corners
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
              borderRadius: "20px", // Rounded corners
              height: "100%",
              padding: "0 20px", // Consistent padding
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
        <Button
          variant="outlined"
          startIcon={<HomeIcon />}
          sx={{
            mb: 4,
            borderColor: "#0366d6", // GitHub blue border
            color: "#0366d6",
            ":hover": {
              borderColor: "#0356a1", // Darker blue for hover
              backgroundColor: "#f0f6fc", // Light background for hover
            },
            borderRadius: "20px", // Rounded corners
            padding: "6px 16px", // Consistent padding
          }}
          onClick={handleHome}
        >
          Home
        </Button>
        {searchUsername && <Repositories username={searchUsername} />}
      </Container>
    </QueryClientProvider>
  );
};

export default App;
