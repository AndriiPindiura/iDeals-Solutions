import algoliasearch from 'algoliasearch';
import request from 'axios';
import { getAsyncType } from '../../middlewares/promiseMiddleware';

const algolia = algoliasearch('1SY0GAJSAN', '85c6b04ab9ad451f9802d37f5365305b', { protocol: 'https:' })
  .initIndex('idealsSolutions');

const validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const initialState = {
  algolia: [],
  recipients: [],
  message: '',
};

const SEARCH = 'ideals-solutions/ideals/SEARCH';
const RECIPIENT = 'ideals-solutions/ideals/RECIPIENT';
const MESSAGE = 'ideals-solutions/ideals/MESSAGE';
const SEND = 'ideals-solutions/ideals/SEND';
const CLEARERROR = 'ideals-solutions/ideals/CLEARERROR';
const SUCCESS = '_SUCCESS';
const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';


export default function (state = initialState, action) {
  switch (action.type) {
    case getAsyncType(SEARCH, SUCCESS): {
      if (action.res.query.length < 1) {
        return Object.assign({}, state, { recipients: [] });
      }
      const searchList = action.res.hits.map(user => {
        const modifiedUser = Object.assign({}, user, {
          info: `${user.firstname} ${user.lastname}`,
        });
        return modifiedUser;
      });
      return Object.assign({}, state, { algolia: searchList });
    }
    case getAsyncType(SEARCH, REQUEST): {
      return state;
    }
    case getAsyncType(SEARCH, FAILURE): {
      global.msg.show(action.error && action.error.message, { time: 2000, type: 'error' });
      const error = action.error && action.error.message;
      return Object.assign({}, state, { error });
    }
    case RECIPIENT: {
      if (action.payload === null) {
        return state;
      }
      const recipients = [...state.recipients].filter(recipient => recipient.email !== 'illegal');
      if (action.payload instanceof Object) {
        recipients.push(action.payload);
        return Object.assign({}, state, { recipients });
      }
      const newRecipients = [];
      action.payload.split(';').filter(recipient => recipient.trim().length > 0)
        .forEach(recipient => {
          const totalRecipients = newRecipients.length;
          recipients.filter(searchRecipient => {
            return searchRecipient.firstname === recipient.trim().split(' ')[0]
              && searchRecipient.lastname === recipient.trim().split(' ')[1];
          }).forEach(pushRecipient => newRecipients.push(pushRecipient));
          if (totalRecipients >= newRecipients.length) {
            if (validateEmail(recipient.trim())) {
              newRecipients.push({ email: recipient.trim() });
            } else {
              newRecipients.push({ email: 'illegal' });
            }
          }
        });
      return Object.assign({}, state, { recipients: newRecipients });
    }
    case MESSAGE: {
      return Object.assign({}, state, { message: action.payload });
    }
    case getAsyncType(SEND, SUCCESS): {
      return Object.assign({}, state, { algolia: [], recipients: [], message: '' });
    }
    case getAsyncType(SEND, FAILURE): {
      global.msg.show(action.error && action.error.message, { time: 2000, type: 'error' });
      const error = action.error && action.error.message;
      return Object.assign({}, state, { algolia: [], recipients: [], message: '', error });
    }
    case CLEARERROR: {
      return Object.assign({}, state, { error: null });
    }
    default: {
      return state;
    }
  }
}

export const search = payload => {
  const filter = payload.split(';');
  return {
    type: SEARCH,
    promise: algolia.search((filter.length > 1) ? filter[filter.length - 1].trim() : filter[0].trim()),
  };
};

export const setRecipient = payload => {
  const recipients = (payload.target && payload.target.value) || payload;
  return {
    type: RECIPIENT,
    payload: recipients,
  };
};

export const setRecipientBlur = payload => {
  if (!(payload.nativeEvent.relatedTarget instanceof HTMLSpanElement)) {
    const recipients = (payload.target && payload.target.value) || null;
    return {
      type: RECIPIENT,
      payload: recipients,
    };
  }
  return { type: 'DEFAULT' };
};

export const setMessage = event => {
  return {
    type: MESSAGE,
    payload: event.target.value,
  };
};

export const sendMessage = data => {
  const send = {
    email: data.recipients.map(recipient => recipient.email).join(),
    body: data.message,
  };
  console.log(JSON.stringify(send));
  return {
    type: SEND,
    promise: request.post('http://example.org', send),
  };
};

export const removeError = () => {
  return {type: CLEARERROR };
};
