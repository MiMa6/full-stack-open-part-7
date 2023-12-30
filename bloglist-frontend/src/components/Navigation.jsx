import { Link } from "react-router-dom";

const Navigation = ({ userName, handleLogout }) => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {userName} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Navigation;
