import "./User.css";

interface UserDetailsProps {
  avatarUrl: string;
  username: string;
  name: string;
}

function UserDetails({ avatarUrl, username, name }: UserDetailsProps) {
  return (
    <div className="user-details">
      <img src={avatarUrl} alt={username} />
      <h3>{name}</h3>
      <p>{username}</p>
    </div>
  );
}

export default UserDetails;
