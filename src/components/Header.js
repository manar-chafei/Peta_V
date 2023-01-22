import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>
                <img
                  alt=""
                  src="/petavlogo.svg"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{' '}
                Peta-V
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="mr-auto">

                <LinkContainer to='/confirm'>
                  <Nav.Link><i className="fa fa-paw"></i> Adoption</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to='/diagnosis'>
                  <Nav.Link><i className="fa fa-question"></i> Diagnosis</Nav.Link>
                  </LinkContainer>

                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id ='username'>
                      <LinkContainer to='/profile'>
                          <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to='/mypets'>
                          <NavDropdown.Item>Pets</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to='/myrequests'>
                          <NavDropdown.Item>Requests</NavDropdown.Item>
                      </LinkContainer>


                      <LinkContainer to='/login'>
                          <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                      </LinkContainer>
                      

                    </NavDropdown>

                  ): (
                    <LinkContainer to='/login'>
                  <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                  </LinkContainer>
                  )}

                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title='Admin' id ='adminmenu'>
                      <LinkContainer to='/admin/userlist'>
                          <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to='/admin/petlist'>
                          <NavDropdown.Item>Pets</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to='/admin/requestlist'>
                          <NavDropdown.Item>Requests</NavDropdown.Item>
                      </LinkContainer>

                  </NavDropdown>
                  )}
                  

                </Nav>
              </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header