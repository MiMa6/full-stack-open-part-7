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
    try {
      dispatch(createNewBlog(blogObject));
      dispatch(
        setNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`,
          "info",
          5,
        ),
      );
      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      console.log(exception);
      const responseErrorMessage = exception.response.data.error;
      if (responseErrorMessage.includes("Blog validation failed")) {
        dispatch(setNotification("title and url required", "error", 5));
      } else {
        dispatch(setNotification(responseErrorMessage, "error", 5));
      }
    }
  };

  const increaseLikes = async (id) => {
    const blogToChange = blogs.find((blog) => blog.id === id);
    try {
      dispatch(increaseBlogLikes(id, user.id, blogToChange));
    } catch (exception) {
      console.log(exception);
      dispatch(setNotification("Updating likes failed", "error", 5));
    }
  };

  const deleteBlog = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(deleteBlogById(id));
        dispatch(
          setNotification(
            `Blog ${blog.title} by ${blog.author} deleted`,
            "info",
            5,
          ),
        );
      } catch (exception) {
        console.log(exception);
        if (exception.response.status === 401) {
          dispatch(
            setNotification("Only blog creator can delete blog", "error", 5),
          );
        } else {
          dispatch(setNotification("Removing blog failed", "error", 5));
        }
      }
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
