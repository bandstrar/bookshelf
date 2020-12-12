import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link, withRouter } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

class MyNavbar extends Component {
  state = {
    isOpen: false,
  }

  logMeOut = (e) => {
    e.preventDefault();
    this.props.history.push('/');
    firebase.auth().signOut();
  };

  toggle = () => this.setState({
    isOpen: !this.state.isOpen,
  })

  render() {
    const { isOpen } = this.state;
    const { user } = this.props;

    return (
    <div>
      <Navbar dark expand='md' className='navbar justify-content-between'>
        <Link className="navbar-brand" to='/'>Home</Link>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <Link className="nav-link" to='/shelves'>Shelves</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to='/books'>
                Books
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to='/search'>
                Search
              </Link>
            </NavItem>
          </Nav>
          {
            user
            && <>
              <h4 className="text-white">{user?.displayName}</h4>
              <UncontrolledDropdown>
              <DropdownToggle className="text-white" nav caret>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <div
                    className='nav-link btn btn-danger'
                    onClick={(e) => this.logMeOut(e)}
                  >
                    Logout
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            </>
          }
        </Collapse>
      </Navbar>
    </div>
    );
  }
}

export default withRouter(MyNavbar);
