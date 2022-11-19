import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Segment, Progress, Label, Icon } from 'semantic-ui-react';
import { withRouter } from "../utils/helper";

const styles = {
    primary: {
      color: 'green',
      bgColor: 'honeydew'
    },
    secondary: {
      color: 'grey',
      bgColor: '#f4f4f4'
    }
};

const YourVoteLabel = () => (
  <Label color = "blue" circular className = "vote">
    <Icon name = "check" size = "big" className = "compact" />
    <div style = {{ float: 'right' }}> Your Vote </div>
  </Label>
);


export class PollResult extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };

  render() {
    const { question, user } = this.props;
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const votesTotal = optionOneVotes + optionTwoVotes;
    const userVote = user.answers[question.id];

    let option1 = styles.secondary,
      option2 = styles.secondary;
    if (optionOneVotes > optionTwoVotes) {
      option1 = styles.primary;
    } else if (optionTwoVotes > optionOneVotes) {
      option2 = styles.primary;
    }

    return (
      <Fragment>
        <Header as = "h3">
          Results:
          <Header.Subheader style = {{ fontWeight: 'bold' }}>
            Would You Rather
          </Header.Subheader>
        </Header>

        <Segment color = {option1.color} style = {{ backgroundColor: `${option1.bgColor}` }}>
          {userVote === 'optionOne' && <YourVoteLabel />}
          <p style = {{ fontWeight: 'bold' }}>{question.optionOne.text}</p>
          <Progress
            percent = {((optionOneVotes / votesTotal) * 100).toFixed(2)}
            progress
            color = {option1.color}
          >
            {optionOneVotes} out of {votesTotal} votes
          </Progress>
        </Segment>

        <Segment color = {option2.color} style = {{ backgroundColor: `${option2.bgColor}` }}>
          {userVote === 'optionTwo' && <YourVoteLabel />}
          <p style = {{ fontWeight: 'bold' }}>{question.optionTwo.text}</p>
          <Progress
            percent = {((optionTwoVotes / votesTotal) * 100).toFixed(2)}
            progress
            color = {option2.color}
          >
            {optionTwoVotes} out of {votesTotal} votes
          </Progress>
        </Segment>
      </Fragment>
    );
  }
}

function mapStateToProps({ users, authUser }) {
  const user = users[authUser];
  return {
    user
  };
}

export default withRouter(connect(mapStateToProps)(PollResult));