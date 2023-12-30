import _ from "lodash";

const UsersView = ({ blogs }) => {
  if (blogs.length === 0) {
    return null;
  }

  const groupBlogsByAuthor = _.groupBy(blogs, "user.name");
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Blogs</th>
          </tr>
          {Object.entries(groupBlogsByAuthor).map(([user, blogs]) => {
            return (
              <tr key={user}>
                <td>{user}</td>
                <td>{blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersView;
