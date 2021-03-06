import axios from 'axios';
import {
  FETCH_USERS,
  LOADING_USERS,
  ERROR_USERS,
  FETCH_POSTS,
  LOADING_POSTS,
  ERROR_POSTS,
  FETCH_COMMENTS,
  LOADING_COMMENTS,
  ERROR_COMMENTS,
  FETCH_TODOS,
  LOADING_TODOS,
  ERROR_TODOS,
  UPDATE_USER_ID,
  UPDATE_TITLE,
  POST_TODO,
} from './types';

const BASE_URL = 'http://jsonplaceholder.typicode.com';

// Actions for users
export function fetchUsers() {
  return async function(dispatch) {
    dispatch({ type: LOADING_USERS });
    try {
      const { data } = await axios.get(`${BASE_URL}/users`);
      dispatch({
        type: FETCH_USERS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: ERROR_USERS, payload: error.message });
    }
  };
}

// Action for publications
export function fetchPosts(id) {
  return async function(dispatch) {
    dispatch({ type: LOADING_POSTS });
    try {
      // Sometimes I need posts by user
      // But also I need all of the posts (Probably not)
      // const param = id ? `posts?userId=${id}` : 'posts';
      // But, right now I don't need it.

      const { data } = await axios.get(`${BASE_URL}/posts?userId=${id}`);
      dispatch({ type: FETCH_POSTS, payload: data });
    } catch (error) {
      dispatch({ type: ERROR_POSTS, payload: error.message });
    }
  };
}

// Action for comments
export function fetchComments(id) {
  return async function(dispatch) {
    dispatch({ type: LOADING_COMMENTS });

    try {
      const { data } = await axios.get(`${BASE_URL}/comments?postId=${id}`);
      dispatch({ type: FETCH_COMMENTS, payload: data });
    } catch (error) {
      dispatch({ type: ERROR_COMMENTS, payload: error.message });
    }
  };
}

// Action for todos
export function fetchTodos() {
  return async function(dispatch) {
    dispatch({ type: LOADING_TODOS });

    try {
      const { data } = await axios.get(`${BASE_URL}/todos`);

      const formattedData = {};
      data.map(todo => {
        formattedData[todo.userId] = {
          ...formattedData[todo.userId],
          [todo.id]: {
            ...todo,
          },
        };
      });
      dispatch({ type: FETCH_TODOS, payload: formattedData });
    } catch (error) {
      dispatch({ type: ERROR_TODOS, payload: error.message });
    }
  };
}

export function updateUserId(userId) {
  return function(dispatch) {
    dispatch({ type: UPDATE_USER_ID, payload: userId });
  };
}
export function updateTitle(title) {
  return function(dispatch) {
    dispatch({ type: UPDATE_TITLE, payload: title });
  };
}

export function postTodo(newTodo) {
  return async function(dispatch) {
    // dispatch({ type: LOADING });

    try {
      const { data } = await axios.post(`${BASE_URL}/todos`, newTodo);
      console.log(data);
      dispatch({ type: POST_TODO });
    } catch (error) {
      //dispatch({ type: ERROR_TODOS_POST, payload: error.message });
    }
  };
}
