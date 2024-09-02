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
    <div className="user-details">
      <img src={data.avatar_url} alt={username} />
      <h3>{data.name}</h3>
      <p>{username}</p>
    </div>
  );
}

export default UserDetails;
