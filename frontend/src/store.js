import { createStore, applyMiddleware, combineReducers} from 'redux';
import {thunk} from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegistrationReducer } from './reducers/userReducers';
import { notesCreateReducer, notesDeleteReducer, notesListReducer, notesUpdateReducer } from './reducers/noteReducers';

const reducer = combineReducers({
  //this will contain all the reducers
  userLogin: userLoginReducer,
  userRegister: userRegistrationReducer,
  notesList: notesListReducer,
  notesCreate: notesCreateReducer,
  notesUpdate: notesUpdateReducer,
  notesDelete: notesDeleteReducer,
});

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const middleware = [thunk]


const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};


const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store