const UserView = ({ blogs }) => {
  if (!blogs || blogs.length === 0) {
    return null;
  }
  const user = blogs[0].user;
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added Blogs</h3>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserView;
