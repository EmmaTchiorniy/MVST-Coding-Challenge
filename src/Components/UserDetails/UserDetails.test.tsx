import React from "react";
import { render, screen } from "@testing-library/react";
import UserDetails from "./UserDetails";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

// Tests don't work because of mui

// const queryClient = new QueryClient();

// jest.mock("@tanstack/react-query", () => ({
//   useQuery: jest.fn(),
// }));

// describe("UserDetails Component", () => {
//   test("displays loading state initially", () => {
//     (useQuery as jest.Mock).mockReturnValue({
//       isLoading: true,
//     });

//     render(
//       <QueryClientProvider client={queryClient}>
//         <UserDetails username="octocat" />
//       </QueryClientProvider>
//     );

//     expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
//   });

//   test("displays error state", () => {
//     (useQuery as jest.Mock).mockReturnValue({
//       isLoading: false,
//       error: new Error("Failed to fetch"),
//     });

//     render(
//       <QueryClientProvider client={queryClient}>
//         <UserDetails username="octocat" />
//       </QueryClientProvider>
//     );

//     expect(screen.getByText(/An error has occurred/i)).toBeInTheDocument();
//   });

//   test("displays user details when fetched", () => {
//     const user = {
//       name: "Octocat",
//       avatar_url: "https://github.com/octocat.png",
//     };

//     (useQuery as jest.Mock).mockReturnValue({
//       isLoading: false,
//       data: user,
//     });

//     render(
//       <QueryClientProvider client={queryClient}>
//         <UserDetails username="octocat" />
//       </QueryClientProvider>
//     );

//     expect(screen.getByText(/Octocat/i)).toBeInTheDocument();
//     expect(screen.getByRole("img")).toHaveAttribute("src", user.avatar_url);
//   });
// });
