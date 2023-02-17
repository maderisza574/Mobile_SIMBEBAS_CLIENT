const initialState = {
  data: [],
  isLoading: false,
  errorMessage: null,
};

const pusdalopReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PUSDALOP_PENDING':
      return {
        ...state,
        errorMessage: null,
        isLoading: true,
      };
    case 'GET_PUSDALOP_FULFILLED':
      return {
        ...state,
        errorMessage: null,
        isLoading: false,
        data: action.payload.data.rows,
      };
    case 'GET_PUSDALOP_REJECTED':
      return {
        ...state,
        errorMessage: 'GAGAL',
        isLoading: false,
      };
    default: {
      return state;
    }
  }
};

export default pusdalopReducer;
