import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchPosts } from '../../actions/index';

class Posts extends Component {
  componentDidMount() {
    if (!this.props.users.length) {
      this.props.fetchUsers();
    }
  }
  render() {
    return <div>{this.props.match.params.id}</div>;
  }
}
function mapStateToProps(state) {
  return {
    users: state.user.users,
    posts: state.publication.posts,
  };
}
export default connect(
  mapStateToProps,
  { fetchUsers, fetchPosts },
)(Posts);