import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./User.css";
import { useQuery } from "@tanstack/react-query";

interface UserDetailsProps {
  username: string;
}

function UserDetails({ username }: UserDetailsProps) {
  const { isPending, error, data } = useQuery({
    queryKey: ["userDetails", username],
    queryFn: () =>
      fetch(`https://api.github.com/users/${username}`).then((res) =>
        res.json()
      ),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  console.log(data);
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={data.avatar_url}
        alt={username}
      />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {data.name}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            {username}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

export default UserDetails;
