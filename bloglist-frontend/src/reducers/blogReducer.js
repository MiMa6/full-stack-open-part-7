import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const changedBlog = action.payload;
      return state.map((blog) =>
        blog.id !== changedBlog.id ? blog : changedBlog,
      );
    },
    sortBlogs(state) {
      return state.sort((a, b) => b.likes - a.likes);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, sortBlogs, appendBlog, updateBlog, deleteBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
    if (blogs.length > 1) {
      dispatch(sortBlogs(blogs));
    }
  };
};

export const createNewBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content);
      console.log(newBlog);
      dispatch(appendBlog(newBlog));
      dispatch(
        setNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
          "info",
          5,
        ),
      );
    } catch (exception) {
      console.log("exception");
      const responseErrorMessage = exception.response.data.error;
      if (responseErrorMessage.includes("Blog validation failed")) {
        dispatch(setNotification("title and url required", "error", 5));
      } else {
        dispatch(setNotification(responseErrorMessage, "error", 5));
      }
    }
  };
};

export const increaseBlogLikes = (id, userId, blogToChange) => {
  return async (dispatch) => {
    try {
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
        user: userId,
      };
      const updatedBlog = await blogService.update(id, changedBlog);
      const updatedBlogWithUser = {
        ...updatedBlog,
        user: blogToChange.user,
      };
      dispatch(updateBlog(updatedBlogWithUser));
    } catch (exception) {
      console.log(exception);
      dispatch(setNotification("Updating likes failed", "error", 5));
    }
  };
};

export const deleteBlogById = (id, blog) => {
  return async (dispatch) => {
    try {
      await blogService.del(id);
      dispatch(deleteBlog(id));
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
  };
};

export default blogSlice.reducer;
