import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as iDealsActions from '../redux/modules/ideals';
// import * as fbActions from '../actions/facebook';
// import * as invitationActions from '../actions/invitation';
import MainComponent from '../components/main';


function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    ideals: state.ideals,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
// function mapDispatchToProps() {
  /* Populated by react-webpack-redux:action */
  // const actions = { facebook: require('../actions/facebook.js') };
  // const actionMap = { actions: bindActionCreators(actions, dispatch) };
  // return actionMap;
  return {
     actions: bindActionCreators(iDealsActions, dispatch),
    // invitationActions: bindActionCreators(invitationActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
