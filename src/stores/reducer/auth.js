const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  message: '',
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_PENDING': {
      return {
        ...state,
        data: {},
        isLoading: false,
        isError: false,
        message: '',
      };
    }
    case 'LOGIN_FULFILLED': {
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false,
        isError: false,
        // message: action.payload.data.message,
        message: 'berhasil',
      };
    }
    case 'LOGIN_REJECTED': {
      return {
        ...state,
        data: {},
        isLoading: false,
        isError: true,
        // message: action.payload.response.data.m,
        message: 'gagal',
      };
    }
    default: {
      return state;
    }
  }
};

export default login;
