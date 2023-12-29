import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

import {
  initializeBlogs,
  createNewBlog,
  increaseBlogLikes,
  deleteBlogById,
} from "./reducers/blogReducer";

import { setNotification } from "./reducers/notificationReducer";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(initializeBlogs());
    console.log("blogs fetched");
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("wrong username or password", "error", 5));
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out")) {
      window.localStorage.removeItem("loggedBlogAppUser");
      setUser(null);
    }
  };

  const createBlog = async (blogObject) => {
    dispatch(createNewBlog(blogObject));
    blogFormRef.current.toggleVisibility();
  };

  const increaseLikes = async (id) => {
    const blogToChange = blogs.find((blog) => blog.id === id);
    dispatch(increaseBlogLikes(id, user.id, blogToChange));
  };

  const deleteBlog = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlogById(id, blog));
    }
  };

  const blogFormRef = useRef();

  const blogForm = () => {
    return (
      <Togglable
        openButtonLabel="new blog"
        closeButtonLabel="cancel"
        ref={blogFormRef}
      >
        <BlogForm createBlog={createBlog} />
      </Togglable>
    );
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification />

        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>

      <br />

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

export default App;
