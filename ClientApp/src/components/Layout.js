import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { Divider, Icon} from 'semantic-ui-react'

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
        <div id="copyright">
        <Icon name='copyright'/><label>2020 - Kushan</label>
        </div>
      </div>
    );
  }
}
