import { useState, useEffect, useRef } from "react";
import Navigation from "./components/Navigation";
import BlogsView from "./components/BlogsView";
import BlogView from "./components/BlogView";
import UsersView from "./components/UsersView";
import UserView from "./components/UserView";
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

import { Routes, Route, useMatch } from "react-router-dom";

import { setUser, clearUser } from "./reducers/userReducer";
import { setNotification } from "./reducers/notificationReducer";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const userMatch = useMatch("/users/:id");
  const blogMatch = useMatch("/blogs/:id");

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

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
      dispatch(setUser(user));
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
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("wrong username or password", "error", 5));
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out")) {
      window.localStorage.removeItem("loggedBlogAppUser");
      dispatch(clearUser(user));
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

  const blogsByUserId = (userId) =>
    blogs.filter((blog) => blog.user.id === userId);

  const blogsByUserMatch = userMatch
    ? blogsByUserId(userMatch.params.id)
    : null;

  const blogById = (blogId) => blogs.find((blog) => blog.id === blogId);

  const blogByMatch = blogMatch ? blogById(blogMatch.params.id) : null;

  return (
    <div className="container">
      <h2>blogs</h2>
      <Notification />
      <Navigation userName={user.name} handleLogout={handleLogout} />
      <br />

      <Routes>
        <Route
          path="/"
          element={
            <BlogsView
              blogForm={blogForm}
              blogs={blogs}
              increaseLikes={increaseLikes}
              deleteBlog={deleteBlog}
              user={user}
            />
          }
        />
        <Route path="/blogs/:id" element={<BlogView blog={blogByMatch} />} />
        <Route path="/users" element={<UsersView blogs={blogs} />} />
        <Route
          path="/users/:id"
          element={<UserView blogs={blogsByUserMatch} />}
        />
      </Routes>
    </div>
  );
};

export default App;
