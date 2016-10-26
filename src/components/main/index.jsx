import React from 'react';
// import { browserHistory } from 'react-router';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import BemyButton from '../button';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import SendIcon from 'material-ui/svg-icons/content/mail';
import styles from './main.scss';
// import animation from './animation.css';

const Main = props => {
  const { actions, ideals } = props;
  const recipients = ideals.recipients.length > 0 ? [...ideals.recipients].map(recipient => {
    return (recipient.firstname && recipient.lastname) ? `${recipient.firstname} ${recipient.lastname}` : recipient.email;
  })
    .join('; ') : '';
  const searchText = ((recipients.length > 0) ? recipients + '; ' : recipients).replace('illegal;', '');
  console.log((recipients.length > 0) ? recipients + '; ' : recipients);
  // console.log(recipients);
  // const dataSource3 = [
  //   {textKey: 'Some Text', valueKey: 'someFirstValue'},
  //   {textKey: 'Some Text', valueKey: 'someSecondValue'},
  // ];
  const dataSourceConfig = {
    text: 'info',
    value: 'info',
  };
  return (
    <section className={styles.main}>
      <div>
        <div>
          <AutoComplete
            hintText="Type recipient"
            onNewRequest={actions.setRecipient}
            onUpdateInput={actions.search}
            searchText={searchText}
            errorText={recipients.includes('illegal') ? <div>Invalid Email</div> : null}
            floatingLabelText="Recipient (name or email)"
            filter={AutoComplete.caseInsensitiveFilter}
            filter={AutoComplete.noFilter}
            fullWidth
            openOnFocus={false}
            dataSource={ideals.algolia}
            dataSourceConfig={dataSourceConfig}
            listStyle={{ maxHeight: '50vh' }}
          />
        </div>
        <div>
          <TextField
            hintText="Type your message"
            floatingLabelText="Message"
            fullWidth
            multiLine
            rows={10}
            onChange={actions.setMessage}
            value={ideals.message}
          />
        </div>
        <div>
          <FlatButton
            label="Send"
            primary
            disabled={!(ideals.recipients.length > 0 && ideals.message.length > 0)}
            icon={<SendIcon />}
            onClick={() => actions.sendMessage({ recipients: ideals.recipients, message: ideals.message})}
          />
        </div>
      </div>
    </section>
  );
};

Main.displayName = 'Main';

// Uncomment properties you need
// GoFEx.propTypes = {
//   facebook: React.PropTypes.object.isRequired,
//   invitation: React.PropTypes.object.isRequired,
// };
// InvitationComponent.defaultProps = {};

export default Main;
