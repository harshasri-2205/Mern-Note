import axios from "axios";
import { NOTES_CREATE_FAIL, NOTES_CREATE_REQUEST, NOTES_CREATE_SUCCESS, NOTES_DELETE_FAIL, NOTES_DELETE_REQUEST, NOTES_DELETE_SUCCESS, NOTES_FAIL, NOTES_REQUEST,NOTES_SUCCESS, NOTES_UPDATE_FAIL, NOTES_UPDATE_REQUEST, NOTES_UPDATE_SUCCESS } from "../constants/notesConstants";


export const notesList = () => async (dispatch,getState) => {
    try {
        dispatch({ type: NOTES_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }
        if (userInfo) {
            const { data } = await axios.get("api/notes/", config)
            if (data) {
                dispatch({ type: NOTES_SUCCESS ,payload:data});
            }
        }
    }
    catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message: null;
        dispatch({ type: NOTES_FAIL, payload: message });
        
    }
}

export const createNotesList = (title,content,category) => async (dispatch, getState) => {
    try {
        dispatch({ type: NOTES_CREATE_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const notesList = {
            title,content,category
        }
        if (userInfo) {
            const { data } = await axios.post(
              `/api/notes/create`,
              notesList,
              config
            );
            if (data) {
                
                dispatch({ type: NOTES_CREATE_SUCCESS, payload: data });
            }

            
        }
        
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : null;
        dispatch({type: NOTES_CREATE_FAIL,payload:message})
    }
}


export const updateNotesList = (id, title, content, category) => async (dispatch, getState) => {
    try {
        dispatch({ type: NOTES_UPDATE_REQUEST })
          const {
            userLogin: { userInfo },
          } = getState();
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo?.token}`,
          },
        };
        const noteList = { title, content, category }
        const { data } = await axios.put(`/api/notes/${id}`, noteList, config)
        dispatch({type: NOTES_UPDATE_SUCCESS,payload:data})
        
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : null;
        dispatch({type: NOTES_UPDATE_FAIL,payload:message})
    }
}

export const deleteNoteAction = (id) => async (dispatch, getState) => {
    try{
        dispatch({ type: NOTES_DELETE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const { token } = userInfo
        const config = {
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        }
        const { response } = await axios.delete(`/api/notes/${id}`, config)
        dispatch({type: NOTES_DELETE_SUCCESS,payload:response})
    } catch (error){
        const message = error.response && error.response.data.message ? error.response.data.message : null;
        dispatch({type: NOTES_DELETE_FAIL,payload:message})
     }
}
