const listHelper = require("../utils/list_helper");

const listWithZeroBlog = [];
const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];
const listWitMultipleBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

test("dummy returns one", () => {
  const result = listHelper.dummy(listWithZeroBlog);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes(listWithZeroBlog);
    expect(result).toBe(0);
  });
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(listWitMultipleBlogs);
    expect(result).toBe(36);
  });
});

describe("Most likes - Blog", () => {
  test("of empty list is {}", () => {
    const emptyBlog = {};
    const result = listHelper.favoriteBlog(listWithZeroBlog);
    expect(result).toEqual(emptyBlog);
  });
  test("when list has only one blog, equals that", () => {
    const blogWithMostLikesFromOne = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    };
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(blogWithMostLikesFromOne);
  });
  test("of a bigger list is calculated right", () => {
    const blogWithMostLikesFromMultiple = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };
    const result = listHelper.favoriteBlog(listWitMultipleBlogs);
    expect(result).toEqual(blogWithMostLikesFromMultiple);
  });
});

describe("Most blogs", () => {
  test("of empty list is {}", () => {
    const emptyBlog = {};
    const result = listHelper.mostBlogs(listWithZeroBlog);
    expect(result).toEqual(emptyBlog);
  });
  test("when list has only one blog, equals that", () => {
    const authorWithMostBlogsFromOne = {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    };
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual(authorWithMostBlogsFromOne);
  });
  test("of bigger list is calculated right", () => {
    const authorWithMostBlogsFromMultiple = {
      author: "Robert C. Martin",
      blogs: 3,
    };
    const result = listHelper.mostBlogs(listWitMultipleBlogs);
    expect(result).toEqual(authorWithMostBlogsFromMultiple);
  });
});

describe("Most Likes - Author", () => {
  test("of empty list is {}", () => {
    const emptyBlog = {};
    const result = listHelper.mostLikes(listWithZeroBlog);
    expect(result).toEqual(emptyBlog);
  });
  test("when list has only one blog, equals that", () => {
    const authorWithMostLikesFromOne = {
      author: "Edsger W. Dijkstra",
      likes: 5,
    };
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual(authorWithMostLikesFromOne);
  });
  test("of bigger list is calculated right", () => {
    const authorWithMostLikesFromMultiple = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    };
    const result = listHelper.mostLikes(listWitMultipleBlogs);
    expect(result).toEqual(authorWithMostLikesFromMultiple);
  });
});
