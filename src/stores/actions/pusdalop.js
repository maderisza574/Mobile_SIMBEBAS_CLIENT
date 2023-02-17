import axios from '../../utils/axios';

export const getDataPusdalop = () => ({
  type: 'GET_PUSDALOP',
  payload: axios.get('/v1/pusdalops?page=1&perPage=5'),
});

export const createDataPusdalop = (dataPusdalop, config) => ({
  type: 'CREATE_PUSDALOP',
  payload: axios.post('/v1/pusdalops', dataPusdalop, config),
});

export const deleteDataPusdalop = (pusdalopId, config) => ({
  type: 'DELETE_PUSDALOP',
  payload: axios.delete(`/v1/pusdalops/${pusdalopId}`, config),
});
