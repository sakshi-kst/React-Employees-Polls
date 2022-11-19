import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';

export class Error extends Component {
  render() {
    return (
      <Container textAlign = "center">
        <br />
        <Header as = "h3">Error 404: Page Not Found</Header>
        <p>Whoops, that's a dead end!! Please check the URL and try again.</p>
      </Container>
    );
  }
}

export default Error;