import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';

const colors = {
    green: {
      name: 'green',
      hex: '#21ba45'
    },
    blue: {
      name: 'blue',
      hex: '#2185d0'
    },
    grey: {
      name: null,
      hex: '#d4d4d5'
    }
};

export class PollTeaser extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    unanswered: PropTypes.bool,
  };

  state = {
    viewPoll: false
  };

  handleClick = e => {
    this.setState(prevState => ({
      viewPoll: !prevState.viewPoll
    }));
  };

  render() {
    const { question, unanswered } = this.props;
    const buttonColor = (unanswered === true) ? colors.green : colors.blue;

    if (this.state.viewPoll === true) {
      return <Navigate push to = {`/questions/${question.id}`} />;
    }

    return (
      <Fragment>
        <Header as = "h5" textAlign = "left">
          Would You Rather
        </Header>
        <p style = {{ textAlign: 'center' }}>
          {question.optionOne.text} <br />
          OR <br />
          {question.optionTwo.text}
        </p>
        <Button color = {buttonColor.name} size = "tiny" fluid onClick = {this.handleClick}
                content = {(unanswered === true) ? 'Answer Poll' : 'Results'}
        />
      </Fragment>
    );
  }
}

export default PollTeaser;