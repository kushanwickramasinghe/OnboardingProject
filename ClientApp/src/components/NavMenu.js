import React, { Component } from 'react';
// import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom'
import { Input, Menu } from 'semantic-ui-react'
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      activeItem: 'customers'
    };
  }


  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  
  render () {
    const { activeItem } = this.state
    return (
      <header>
        <Menu secondary>
        <Menu.Item
          as={NavLink} to="/"
          name='customers'
          active={activeItem === 'customers'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink} to="/products"
          name='products'
          active={activeItem === 'products'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink} to="/store"
          name='stores'
          active={activeItem === 'stores'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink} to="/sales"
          name='sales'
          active={activeItem === 'sales'}
          onClick={this.handleItemClick}
        />
      </Menu>
      </header>
    );
  }
}
