import algoliasearch from 'algoliasearch';
import request from 'axios';
import { getAsyncType } from '../../middlewares/promiseMiddleware';

// const algolia = algoliasearch('1SY0GAJSAN', '85c6b04ab9ad451f9802d37f5365305b');
// // console.log(algolia);
const algolia = algoliasearch('1SY0GAJSAN', '85c6b04ab9ad451f9802d37f5365305b', { protocol: 'https:' })
  .initIndex('idealsSolutions');
  // .setSettings({ attributesToIndex: ['firstname'] });
  // .set_settings({
  //   attributesToIndex: ['firstname'],
  // });

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
const SUCCESS = '_SUCCESS';
const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';


export default function (state = initialState, action) {
  switch (action.type) {
    case getAsyncType(SEARCH, SUCCESS): {
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
      return Object.assign({}, state, { error: action.error });
    }
    case RECIPIENT: {
      console.log(action.payload instanceof Object);
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
            // console.log(recipient);
            if (validateEmail(recipient.trim())) {
              newRecipients.push({ email: recipient.trim() });
            } else {
              newRecipients.push({ email: 'illegal' });
            }
          }
        });
      // console.log(newRecipients);
      // validateEmail('');
      return Object.assign({}, state, { recipients: newRecipients });
    }
    case MESSAGE: {
      return Object.assign({}, state, { message: action.payload.trim() });
    }
    case getAsyncType(SEND, SUCCESS): {
      return Object.assign({}, state, { algolia: [], recipients: [], message: '' });
    }
    case getAsyncType(SEND, FAILURE): {
      return Object.assign({}, state, { algolia: [], recipients: [], message: '' });
    }
    default: {
      return state;
    }
  }
}

export const search = payload => {
  const filter = payload.split(';');
  // console.log(payload);
  // console.log(payload.split(';'));
  // const queries = payload.split(';').map(query => {
  //   return {
  //     indexName: 'idealsSolutions',
  //     query,
  //     params: {},
  //   };
  // });
  // console.log(queries);
  return {
    type: SEARCH,
    promise: algolia.search((filter.length > 1) ? filter[filter.length - 1].trim() : filter[0].trim()),
  };
};

export const setRecipient = payload => {
  // console.log('setRecipient');
  // console.log(payload);
  // let recipient;
  // if (index === -1) {
  //   recipient = {};
  //   recipient.email = validateEmail(payload) ? payload : null;
  // } else {
  //   recipient = payload;
  // }
  return {
    type: RECIPIENT,
    payload,
  };
};

export const setMessage = event => {
  console.log(event.target.value);
  return {
    type: MESSAGE,
    payload: event.target.value,
  };
};

export const sendMessage = data => {
  console.log(data);
  // const messages = [];
  // data.recipients.forEach(recipient => messages.push({ email: recipient.email, body: data.message }));
  const send = {
    email: data.recipients.map(recipient => recipient.email).join(),
    body: data.message,
  };
  // console.log(JSON.stringify(messages));
  console.log(JSON.stringify(send));
  return {
    type: SEND,
    promise: request.post('http://example.org', send),
  };
};
