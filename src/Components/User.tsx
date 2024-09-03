import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

interface UserDetailsProps {
  username: string;
}

function UserDetails({ username }: UserDetailsProps) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["userDetails", username],
    queryFn: () =>
      fetch(`https://api.github.com/users/${username}`).then((res) =>
        res.json()
      ),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

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
        borderRadius: "20px", // Rounded corners
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: 120, // Adjusted profile picture width
          height: 120, // Maintain aspect ratio
          borderRadius: "50%", // Circular image
          mb: 2,
          mt: 2,
        }}
        image={data.avatar_url}
        alt={username}
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {data.name}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
          {username}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UserDetails;
