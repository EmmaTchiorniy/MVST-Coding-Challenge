import { useEffect, useState } from "react";
import FilterControls from "../FilterControls/FilterControls";
import UserDetails from "../UserDetails/UserDetails";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography, Button, Link, List } from "@mui/material";

interface Repository {
  id: number;
  name: string;
  html_url: string;
  language: string | null;
}

interface RepositoriesProps {
  username: string;
}

function Repositories({ username }: RepositoriesProps) {
  // useStates for name input and selected languages for filtering repositories
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [nameFilter, setNameFilter] = useState("");

  // Wrapper function for child components
  function updateSelectedLanguages(languages: string[]) {
    setSelectedLanguages(languages);
  }

  // Fetching repositories from Github API call
  const {
    isLoading,
    error,
    data: repos,
    refetch,
  } = useQuery({
    queryKey: ["repoData", username],
    queryFn: () =>
      fetch(`https://api.github.com/users/${username}/repos`).then((res) =>
        res.json()
      ),
  });

  // Storing repository languages with no copies
  const uniqueLanguages: string[] = repos
    ? Array.from(
        new Set(repos.map((repo: Repository) => repo.language).filter(Boolean))
      )
    : [];

  // Filtering repositories based on name and/or selected language(s)
  const filteredRepos = repos?.filter((repo: Repository) => {
    const matchesName = repo.name
      .toLowerCase()
      .includes(nameFilter.toLowerCase());

    const matchesLanguage =
      selectedLanguages.length === 0 ||
      (repo.language && selectedLanguages.includes(repo.language));

    return matchesName && matchesLanguage;
  });

  // Remove all filters
  function clearFilters() {
    setNameFilter("");
    setSelectedLanguages([]);
  }

  // Clear filters when username changes
  useEffect(() => {
    clearFilters();
  }, [username]);

  // Deal with different API states
  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    clearFilters();
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          An error has occurred: {error.message}
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: "#0366d6",
            ":hover": {
              bgcolor: "#0356a1",
            },
          }}
          onClick={() => {
            refetch();
          }}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  // Return html & in-line styling, as well as calling FilterControls & UserDetails functions
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
      }}
    >
      <Box sx={{ flex: "1", mr: 2 }}>
        <UserDetails username={username} />
      </Box>
      <Box sx={{ flex: "2" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Repositories of {username}
        </Typography>
        <FilterControls
          nameFilter={nameFilter}
          selectedLanguages={selectedLanguages}
          onNameFilterChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNameFilter(e.target.value)
          }
          updateSelectedLanguages={updateSelectedLanguages}
          onClearFilters={clearFilters}
          languages={uniqueLanguages}
        />
        <Box
          sx={{
            border: "1px solid #e1e4e8",
            borderRadius: 2,
            padding: 2,
            mt: 2,
            backgroundColor: "#fff",
          }}
        >
          <List sx={{ width: "100%", mb: -2 }}>
            {filteredRepos.length === 0 ? (
              <Box
                key={"Not found"}
                sx={{
                  border: "1px solid #e1e4e8",
                  borderRadius: 2,
                  borderColor: "#f1807e",
                  mb: 2,
                  p: 2,
                }}
              >
                <Typography color="error">No Repositories Found</Typography>
              </Box>
            ) : (
              filteredRepos.map((repo: Repository) => (
                <Box
                  key={repo.id}
                  sx={{
                    border: "1px solid #e1e4e8",
                    borderRadius: 2,
                    mb: 2,
                    p: 2,
                  }}
                >
                  <Link
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ display: "block", fontWeight: 600, mb: 1 }}
                  >
                    {repo.name}
                  </Link>
                  <Typography variant="body2" color="text.secondary">
                    {repo.language || "No language"}
                  </Typography>
                </Box>
              ))
            )}
          </List>
        </Box>
      </Box>
    </Box>
  );
}

export default Repositories;
