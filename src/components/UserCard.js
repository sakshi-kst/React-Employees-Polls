import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Segment, Header, Grid, Image } from 'semantic-ui-react';
import PollQuestion from './PollQuestion';
import PollResult from './PollResult';
import PollTeaser from './PollTeaser';
import { withRouter } from "../utils/helper";

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

const pollTypes = {
    POLL_TEASER: 'POLL_TEASER',
    POLL_QUESTION: 'POLL_QUESTION',
    POLL_RESULT: 'POLL_RESULT'
};

const PollContent = props => {
    const { pollType, question, unanswered } = props;
  
    switch (pollType) {
      case pollTypes.POLL_TEASER:
        return <PollTeaser question = {question} unanswered = {unanswered} />;
      case pollTypes.POLL_QUESTION:
        return <PollQuestion question = {question} />;
      case pollTypes.POLL_RESULT:
        return <PollResult question = {question} />;
      default:
        return;
    }
};

export class UserCard extends Component {
  static propTypes = {
    question: PropTypes.object,
    author: PropTypes.object,
    pollType: PropTypes.string,
    unanswered: PropTypes.bool,
    question_id: PropTypes.string
  };
  
  render() {
    const { author, question, pollType, wrongPath, unanswered = null } = this.props;
    
    if (wrongPath === true) {
      return <Navigate to = "/questions/wrong_id" />;
    }

    const tabColor = (unanswered === true) ? colors.green : colors.blue;
    const borderTop = (unanswered === null) ? `1px solid ${colors.grey}` : `2px solid ${tabColor.hex}`;

    return (
      <Segment.Group>
        <Header as = "h5" textAlign = "left" block attached = "top" style = {{ borderTop: borderTop }}>
            {author.name} asks:
        </Header>

        <Grid padded>
          <Grid.Row verticalAlign = "middle">
            <Grid.Column width = {2}>
              <Image src = {author.avatarURL} />
            </Grid.Column>
            <Grid.Column width = {2}>
            </Grid.Column>
            <Grid.Column width = {8}>
                <PollContent
                    pollType = {pollType}
                    question = {question}
                    unanswered = {unanswered}
                />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment.Group>
    );
  }
}

function mapStateToProps({ users, questions, authUser }, { router, question_id }) {
    let question, pollType, author, wrongPath = false;
    

    if (question_id !== undefined) {
      question = questions[question_id];
      pollType = pollTypes.POLL_TEASER;
      author = users[question.author];
    } else {
      const { question_id } = router.params;
      question = questions[question_id];
      const user = users[authUser];
      
      if (question === undefined) {
        wrongPath = true;
      } else {
        pollType = pollTypes.POLL_QUESTION;
        if (Object.keys(user.answers).includes(question.id)) {
          pollType = pollTypes.POLL_RESULT;
        }
        author = users[question.author];
      }
    }
  
    return {
      wrongPath,
      question,
      author,
      pollType
    };
  }

export default withRouter(connect(mapStateToProps)(UserCard));