import Blog from "./Blog";

const BlogsView = ({ blogForm, blogs, increaseLikes, deleteBlog, user }) => {
  return (
    <div>
      <div>
        <h2> create new </h2>
        {blogForm()}
      </div>
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            increaseLikes={increaseLikes}
            deleteBlog={deleteBlog}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogsView;
