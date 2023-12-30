import { Link } from "react-router-dom";
import _ from "lodash";

const UsersView = ({ blogs }) => {
  if (blogs.length === 0) {
    return null;
  }

  const groupBlogsByAuthor = _.groupBy(blogs, "user.id");
  const userName = blogs[0].user.name;

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Blogs</th>
          </tr>
          {Object.entries(groupBlogsByAuthor).map(([userId, blogs]) => {
            return (
              <tr key={userId}>
                <td>
                  <Link to={`/users/${userId}`}>{userName}</Link>
                </td>
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
