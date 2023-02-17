import {combineReducers} from 'redux';

import counter from './counter';
import auth from './auth';
import pusdalop from './pusdalop';

export default combineReducers({
  counter,
  auth,
  pusdalop,
});
