// NewPoll.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Segment, Header, Grid, Divider, Form, Dimmer, Loader } from 'semantic-ui-react';
import { handleSaveQuestion } from '../actions/questions';

export class NewPoll extends Component {
  static propTypes = {
    authUser: PropTypes.string.isRequired,
    handleSaveQuestion: PropTypes.func.isRequired
  };

  state = {
    validSubmit: false,
    isLoading: false,
    option1: '',
    option2: ''
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { authUser, handleSaveQuestion } = this.props;
    const { option1, option2 } = this.state;

    new Promise((res, rej) => {
      this.setState({ isLoading: true });
      handleSaveQuestion(option1, option2, authUser);
      setTimeout(() => res('success'), 1000);
    }).then(() => {
      this.setState({
        option1: '',
        option2: '',
        validSubmit: true
      });
    });
  };

  render() {
    const disabled = this.state.option1 === '' || this.state.option2 === '';

    if (this.state.validSubmit === true) {
      return <Navigate to = "/" />;
    }
    
    return (
      <Segment.Group>
        <Header as = "h3" textAlign = "left" block attached = "top">
          Create a New Poll
        </Header>

        <Grid padded>
          <Grid.Column>
            {this.state.isLoading && (
              <Dimmer active inverted>
                <Loader content = "Updating" />
              </Dimmer>
            )}
            <p>Add a new question:</p>
            <p>
              <strong>Would You Rather</strong>
            </p>
            <Form onSubmit = {this.handleSubmit}>
              <Form.Input id = "option1" placeholder = "Enter first option" value = {this.state.option1} onChange = {this.handleChange} required />
              <Divider horizontal>OR</Divider>
              <Form.Input id = "option2" placeholder = "Enter second option" value = {this.state.option2} onChange = {this.handleChange} required />
              <Form.Button positive size = "tiny" fluid disabled = {disabled}>Submit</Form.Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment.Group>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}

export default connect(mapStateToProps, {handleSaveQuestion})(NewPoll);