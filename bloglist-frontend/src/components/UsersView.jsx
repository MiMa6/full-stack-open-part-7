import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import _ from "lodash";

const UsersView = ({ blogs }) => {
  if (blogs.length === 0) {
    return null;
  }

  const groupBlogsByAuthor = _.groupBy(blogs, "user.id");

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Blogs</th>
          </tr>
          {Object.entries(groupBlogsByAuthor).map(([userId, blogs]) => {
            const userName = blogs[0].user.name;
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
      </Table>
    </div>
  );
};

export default UsersView;
