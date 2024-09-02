import React, { useState, useRef, useCallback, useEffect } from "react";
import "./Repos.css";
import UserDetails from "./User";
import FilterControls from "./FilterControls";

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
  const [repos, setRepos] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [langValues, setLangValues] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nameFilter, setNameFilter] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userDetails, setUserDetails] = useState<{
    avatar_url: string;
    login: string;
    name: string;
  } | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch repositories
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      if (!response.ok) throw new Error("Failed to fetch repositories");
      const data = await response.json();
      setRepos(data);
      setFilteredRepos(data);

      // Fetch user details
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );
      if (!userResponse.ok) throw new Error("Failed to fetch user details");
      const userData = await userResponse.json();
      setUserDetails({
        avatar_url: userData.avatar_url,
        login: userData.login,
        name: userData.name,
      });

      // Set languages
      const uniqueLanguages: string[] = Array.from(
        new Set(
          data
            .map((repo: Repository) => repo.language)
            .filter((lang: string) => typeof lang === "string")
        )
      );
      setLanguages(uniqueLanguages);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [username]);

  const filterRepos = useCallback(() => {
    const filtered = repos.filter((repo) => {
      const matchesName = repo.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
      const matchesLanguage =
        langValues.length === 0 ||
        (repo.language && langValues.includes(repo.language.toLowerCase()));
      return matchesName && matchesLanguage;
    });
    setFilteredRepos(filtered);
  }, [repos, nameFilter, langValues]);

  function handleLanguageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = event.target;
    setLangValues((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((lang) => lang !== value);
      }
    });
  }

  function toggleDropdown() {
    setDropdownVisible((prev) => !prev);
  }

  function clearFilters() {
    setNameFilter("");
    setLangValues([]);
  }

  function handleClickOutside(event: MouseEvent) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
    }
  }

  function resetState() {
    setRepos([]);
    setFilteredRepos([]);
    setLanguages([]);
    setLangValues([]);
    setLoading(true);
    setError(null);
    setNameFilter("");
    setUserDetails(null);
  }

  function retryFetching() {
    resetState();
    fetchData();
  }

  useEffect(() => {
    if (username) {
      fetchData();
    } else {
      resetState();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [username, fetchData]);

  useEffect(() => {
    filterRepos();
  }, [filterRepos]);

  if (loading && !error) return <p>Loading...</p>;
  if (error)
    return (
      <div>
        <p>{error}</p>
        <button onClick={retryFetching}>Try Again</button>
      </div>
    );

  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      {userDetails && (
        <UserDetails
          avatarUrl={userDetails.avatar_url}
          username={userDetails.login}
          name={userDetails.name}
        />
      )}
      <div>
        <h2>Repositories of {username}</h2>
        <FilterControls
          nameFilter={nameFilter}
          langValues={langValues}
          languages={languages}
          onNameFilterChange={(e) => setNameFilter(e.target.value)}
          onLanguageChange={handleLanguageChange}
          onToggleDropdown={toggleDropdown}
          onClearFilters={clearFilters}
          dropdownVisible={dropdownVisible}
          dropdownRef={dropdownRef}
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
