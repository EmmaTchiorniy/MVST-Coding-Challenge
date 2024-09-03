import { useState } from "react";
import FilterControls from "./FilterComponents/FilterControls";
import "./Repos.css";
import UserDetails from "./User";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography, Button, Link, List, ListItem } from "@mui/material";

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
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [nameFilter, setNameFilter] = useState("");

  function updateSelectedLanguages(languages: string[]) {
    setSelectedLanguages(languages);
  }

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

  const uniqueLanguages: string[] = repos
    ? Array.from(
        new Set(repos.map((repo: Repository) => repo.language).filter(Boolean))
      )
    : [];

  const filteredRepos = repos?.filter((repo: Repository) => {
    const matchesName = repo.name
      .toLowerCase()
      .includes(nameFilter.toLowerCase());

    const matchesLanguage =
      selectedLanguages.length === 0 ||
      (repo.language && selectedLanguages.includes(repo.language));

    return matchesName && matchesLanguage;
  });

  function clearFilters() {
    setNameFilter("");
    setSelectedLanguages([]);
  }

  if (isLoading) return "Loading...";
  if (error)
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
          onClick={() => refetch()}
        >
          Try Again
        </Button>
      </Box>
    );

  return (
    <Box sx={{ width: "100%", maxWidth: 800, mt: 4 }}>
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
      <UserDetails username={username} />
      <List sx={{ width: "100%" }}>
        {filteredRepos.length === 0 ? (
          <Typography>No repositories found</Typography>
        ) : (
          filteredRepos.map((repo: Repository) => (
            <Box
              key={repo.id}
              sx={{ border: "1px solid #e1e4e8", borderRadius: 2, mb: 2, p: 2 }}
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
  );
}

export default Repositories;
