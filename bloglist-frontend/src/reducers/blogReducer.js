import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const changedBlog = action.payload;
      return state.map((blog) =>
        blog.id !== changedBlog.id ? blog : changedBlog
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
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const increaseBlogLikes = (id, userId, blogToChange) => {
  return async (dispatch) => {
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
  };
};

export const deleteBlogById = (id) => {
  return async (dispatch) => {
    await blogService.del(id);
    dispatch(deleteBlog(id));
  };
};

export default blogSlice.reducer;
