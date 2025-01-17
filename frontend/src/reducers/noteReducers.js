import { NOTES_CREATE_FAIL, NOTES_CREATE_REQUEST, NOTES_CREATE_SUCCESS, NOTES_DELETE_FAIL, NOTES_DELETE_REQUEST, NOTES_DELETE_SUCCESS, NOTES_FAIL, NOTES_REQUEST, NOTES_SUCCESS } from "../constants/notesConstants"

export const notesListReducer = (state = {}, action) => {
    switch (action.type) {
        case NOTES_REQUEST:
            return { loading: true }
        case NOTES_SUCCESS:
            return { loading: false, notes: action.payload }
        case NOTES_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const notesCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_CREATE_REQUEST:
      return { loading: true };
    case NOTES_CREATE_SUCCESS:
      return { loading: false, success: true };
    case NOTES_CREATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};



export const notesUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_CREATE_REQUEST:
      return { loading: true };
    case NOTES_CREATE_SUCCESS:
      return { loading: false, success: true };
    case NOTES_CREATE_FAIL:
      return { loading: false, error: action.payload, success:false };

    default:
      return state;
  }
};
export const notesDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_DELETE_REQUEST:
      return { loading: true };
    case NOTES_DELETE_SUCCESS:
      return { loading: false, success: true };
    case NOTES_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

