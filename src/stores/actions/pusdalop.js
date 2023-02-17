import axios from '../../utils/axios';

export const getDataPusdalop = () => ({
  type: 'GET_PUSDALOP',
  payload: axios.get('/v1/pusdalops?page=1&perPage=5'),
});
