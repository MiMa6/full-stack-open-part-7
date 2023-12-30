const BlogView = ({ blog }) => {
  if (blog === undefined) {
    return null;
  }
  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes <button>like</button>
      </div>
      <div>added by {blog.user.name}</div>
    </div>
  );
};

export default BlogView;
