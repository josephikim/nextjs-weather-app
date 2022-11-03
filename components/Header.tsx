import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import Link from 'next/link'
import SearchBox from 'components/SearchBox'
import LoginButton from 'components/LoginButton'

const Header: React.FC = () => {
  return (
    <div className="Header fixed-header">
      <Navbar collapseOnSelect bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href={process.env.BASEURL}>
            Next.js Weather App
          </Navbar.Brand>
          <SearchBox />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Link href="/">
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link href="/favorites">
                <Nav.Link>Favorites</Nav.Link>
              </Link>
              <Link href="/register">
                <Nav.Link>Register</Nav.Link>
              </Link>
              <LoginButton />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
