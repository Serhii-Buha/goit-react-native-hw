import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
  },
  reducers: {
    addPost(state, action) {
      console.log(action.payload);
      state.posts.push(action.payload);
    },
    delPost(state, action) {
      // state.posts=[];
    },
    addComment(state, action) {
      //todo some
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(addPost.pending, (state, action) => {})
  //     .addCase(addPost.rejected, (state, action) => {})
  //     .addCase(addPost.fulfilled, (state, action) => {})
  //     .addCase(delPost.pending, (state, action) => {})
  //     .addCase(delPost.rejected, (state, action) => {})
  //     .addCase(delPost.fulfilled, (state, action) => {})
  //     .addCase(addComment.pending, (state, action) => {})
  //     .addCase(addComment.rejected, (state, action) => {})
  //     .addCase(addComment.fulfilled, (state, action) => {});
  // },
});

export const { addPost, delPost, addComment } = postsSlice.actions;

const persistPostConfig = {
  key: 'posts',
  storage: AsyncStorage,
};

export const pesistPostReducer = persistReducer(
  persistPostConfig,
  postsSlice.reducer
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    login: 'no name',
    password: '',
    photo: null,
  },
  reducers: {
    createUser(state, action) {
      state.email = action.payload.email;
      state.login = action.payload.login;
      state.password = action.payload.password;
      state.photo = action.payload.photo;
    },
    loginUser(state, action) {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(createUser.pending, (state, action) => {})
  //     .addCase(createUser.rejected, (state, action) => {})
  //     .addCase(createUser.fulfilled, (state, action) => {
  //       state.email = action.payload.email;
  //       state.login = action.payload.login;
  //       state.password = action.payload.password;
  //       state.photo = action.payload.photo;
  //     })
  //     .addCase(loginUser.pending, (state, action) => {})
  //     .addCase(loginUser.rejected, (state, action) => {})
  //     .addCase(loginUser.fulfilled, (state, action) => {});;
  // },
});

export const { createUser, loginUser } = userSlice.actions;

const persistUserConfig = {
  key: 'user',
  storage: AsyncStorage,
};

export const pesistUserReducer = persistReducer(
  persistUserConfig,
  userSlice.reducer
);
