// // Repositories.test.tsx
// import { render, screen } from "@testing-library/react";
// import Repositories from "./Repositories";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useQuery } from "@tanstack/react-query"; // Import useQuery directly
// import React from "react";
// import UserDetails from "../UserDetails/UserDetails";

// const queryClient = new QueryClient();

// Tests don't work because of mui

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

// test("displays error state", () => {
//   // Mock the return value of useQuery
//   (useQuery as jest.Mock).mockReturnValue({
//     isLoading: false,
//     error: new Error("Failed to fetch"),
//   });

//   render(
//     <QueryClientProvider client={queryClient}>
//       <Repositories username="octocat" />
//     </QueryClientProvider>
//   );

//   expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
// });

// test("displays loading state initially", () => {
//   (useQuery as jest.Mock).mockReturnValue({
//     isLoading: true,
//   });

//   render(
//     <QueryClientProvider client={queryClient}>
//       <Repositories username="octocat" />
//     </QueryClientProvider>
//   );

//   expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
// });

// test("displays repositories when fetched", () => {
//   const repos = [
//     {
//       id: 1,
//       name: "Repo 1",
//       html_url: "https://github.com/repo1",
//       language: "JavaScript",
//     },
//     {
//       id: 2,
//       name: "Repo 2",
//       html_url: "https://github.com/repo2",
//       language: "TypeScript",
//     },
//   ];

//   (useQuery as jest.Mock).mockReturnValue({
//     isLoading: false,
//     data: repos,
//   });

//   render(
//     <QueryClientProvider client={queryClient}>
//       <Repositories username="octocat" />
//     </QueryClientProvider>
//   );

//   expect(screen.getByText(/Repo 1/i)).toBeInTheDocument();
//   expect(screen.getByText(/Repo 2/i)).toBeInTheDocument();
// });
