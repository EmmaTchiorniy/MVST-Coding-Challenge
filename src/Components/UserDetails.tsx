import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

interface UserDetailsProps {
  username: string;
}

// Fetching User Details with Github API call
function UserDetails({ username }: UserDetailsProps) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["userDetails", username],
    queryFn: () =>
      fetch(`https://api.github.com/users/${username}`).then((res) =>
        res.json()
      ),
  });

  // Handling of different API states
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  // html with styling
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: 2,
        maxWidth: 220,
        width: "100%",
        borderRadius: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 50,
        zIndex: 10,
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          mb: 2,
          mt: 2,
        }}
        image={data.avatar_url}
        alt={username}
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          {data.name}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          {username}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UserDetails;
