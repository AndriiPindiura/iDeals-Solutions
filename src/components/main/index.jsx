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
  console.log(props);
  const { ideals } = props;
  // const dataSource3 = [
  //   {textKey: 'Some Text', valueKey: 'someFirstValue'},
  //   {textKey: 'Some Text', valueKey: 'someSecondValue'},
  // ];
  const dataSourceConfig = {
    text: 'firstname',
    value: 'email',
  };
  return (
    <section className={styles.main}>
      <div>
        <div>
          <AutoComplete
            hintText="Type recipient"
            // onUpdateInput={this.handleUpdateInput}
            // onUpdateInput={(e, source) => {
            //   console.log(e);
            //   console.log(source);
            // }}
            onUpdateInput={props.actions.search}
            floatingLabelText="Recipient (name or email)"
            filter={AutoComplete.caseInsensitiveFilter}
            filter={AutoComplete.noFilter}
            openOnFocus={false}
            dataSource={ideals.algolia}
            dataSourceConfig={dataSourceConfig}
          />
        </div>
        <div>
          <TextField
            hintText="Type your message"
            floatingLabelText="Message"
            multiLine
            rows={10}
          />
        </div>
        <div>
          <FlatButton
            label="Send"
            href="https://github.com/callemall/material-ui"
            primary
            icon={<SendIcon />}
            // onClick={props.actions.search}
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

