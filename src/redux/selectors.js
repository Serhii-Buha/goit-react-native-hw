export const getUid = state => state.user.uid;
export const getLogin = state => state.user.isLogin;
export const getPosts = state => state.posts.posts;
export const getUser = state => state.user;
export const getEmail = state => state.user.email;
export const getPost = id => state => {
  const posts = state.posts.posts;
  const [post] = posts.filter(post => post.creationTime === id);
  return post.comments;
};
export const getFilteredPosts = email => state => {
  const posts = state.posts.posts;
  const filteredPosts = posts.filter(post => post.email === email);
  return filteredPosts;
};
