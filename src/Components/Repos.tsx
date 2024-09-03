import { useState } from "react";
import FilterControls from "./FilterComponents/FilterControls";
import "./Repos.css";
import UserDetails from "./User";
import { useQuery } from "@tanstack/react-query";

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
      (repo.language &&
        selectedLanguages.includes(repo.language.toLowerCase()));

    return matchesName && matchesLanguage;
  });

  function clearFilters() {
    setNameFilter("");
    setSelectedLanguages([]);
  }

  if (isLoading) return "Loading...";
  if (error)
    return (
      <div>
        <p>{error.message}</p>
        <button onClick={() => refetch()}>Try Again</button>
      </div>
    );

  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <UserDetails username={username} />
      <div>
        <h2>Repositories of {username}</h2>
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
        <ul>
          {filteredRepos.map((repo: Repository) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name} - {repo.language}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Repositories;
