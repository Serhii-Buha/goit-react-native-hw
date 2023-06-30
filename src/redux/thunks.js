import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase/config';
import {
  deletePost,
  getAllPostsFirestore,
  getUserData,
  registerUser,
  setComment,
  setLike,
  setPost,
} from '../firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setStorage } from '../firebase/storage';
import * as MediaLibrary from 'expo-media-library';

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ login, email, password, photoUri }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const uid = user.uid;
      let url = null;
      if (photoUri) {
        const response = await fetch(photoUri);
        const file = await response.blob();
        const { creationTime } = await MediaLibrary.createAssetAsync(photoUri);
        url = await setStorage({ folder: 'avatar', creationTime, file });
      }
      await registerUser({ login, email, url, uid });
      const data = await getUserData(uid);
      return { ...data, uid };
    } catch (error) {
      console.log('register ', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;
      const data = await getUserData(uid);
      return { ...data, uid };
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  'user/logOutUser',
  async (data, thunkAPI) => {
    try {
      await signOut(auth);
      await AsyncStorage.clear();
      return 'logout';
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addPost = createAsyncThunk(
  'posts/addPost',
  async ({ photoUri, ...restData }, thunkAPI) => {
    try {
      const { creationTime } = await MediaLibrary.createAssetAsync(photoUri);
      const response = await fetch(photoUri);
      const file = await response.blob();
      const url = await setStorage({ folder: 'posts', creationTime, file });
      const post = {
        ...restData,
        url,
        creationTime,
      };
      await setPost(post);
      return post;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllPosts = createAsyncThunk(
  'posts/getAllPosts',
  async (data, thunkAPI) => {
    try {
      const posts = await getAllPostsFirestore();
      return posts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const delPost = createAsyncThunk(
  'posts/delPost',
  async (data, thunkAPI) => {
    try {
      await deletePost(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addComment = createAsyncThunk(
  'posts/addComment',
  async (post, thunkAPI) => {
    try {
      await setComment(post);
      return post;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addLike = createAsyncThunk(
  'posts/addLike',
  async (data, thunkAPI) => {
    try {
      await setLike(data);
      return data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
