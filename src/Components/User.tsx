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
        width: 300,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "#f6f8fa", // Light background similar to GitHub
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 150, borderRadius: "50%" }}
        image={data.avatar_url}
        alt={username}
      />
      <CardContent>
        <Typography component="div" variant="h5" sx={{ fontWeight: 600 }}>
          {data.name || "No Name"}
        </Typography>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ color: "text.secondary", fontWeight: 300 }}
        >
          {username}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UserDetails;
