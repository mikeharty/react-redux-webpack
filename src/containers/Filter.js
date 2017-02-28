import {connect} from 'react-redux';
import {selectDay, selectType} from '../actions';
import Link from '../components/Link';

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
};

const Filter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

export default Filter;