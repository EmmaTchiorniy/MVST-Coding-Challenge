// import React, { useState } from "react";
import "./Repos.css";
import UserDetails from "./User";
// import FilterControls from "./FilterControls";
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
  // const [langFilter, setLangFilter] = useState<string[]>([]);
  // const [nameFilter, setNameFilter] = useState("");

  const {
    isPending,
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

  // const filtered = repos?.filter((repo) => {
  //   const matchesName = repo.name
  //     .toLowerCase()
  //     .includes(nameFilter.toLowerCase());
  //   const matchesLanguage =
  //     langFilter.length === 0 ||
  //     (repo.language && langFilter.includes(repo.language.toLowerCase()));
  //   return matchesName && matchesLanguage;
  // });

  // function handleLanguageChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   const { value, checked } = event.target;
  //   setLangFilter((prev) => {
  //     if (checked) {
  //       return [...prev, value];
  //     } else {
  //       return prev.filter((lang) => lang !== value);
  //     }
  //   });
  // }

  // function clearFilters() {
  //   setNameFilter("");
  //   setLangFilter([]);
  // }

  if (isPending) return "Loading...";
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
        {/* <FilterControls
          nameFilter={nameFilter}
          langValues={langFilter}
          languages={languages}
          onNameFilterChange={(e) => {
            setNameFilter(e.target.value);
            filterRepos();
          }}
          onLanguageChange={(e) => {
            handleLanguageChange(e);
            filterRepos();
          }}
          onClearFilters={clearFilters}
        /> */}
        <ul>
          {repos.map((repo: Repository) => (
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
