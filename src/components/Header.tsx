import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import Search from 'components/Search'

const Header: React.FC = () => {
  const { data: session } = useSession()
  return (
    <div className="Header fixed-header">
      <Navbar collapseOnSelect bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href={process.env.BASEURL}>
            <Link href="/">
              <Nav.Link href="/">Next.js Weather App</Nav.Link>
            </Link>
          </Navbar.Brand>
          <Search />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Link href="/">
                <Nav.Link href="/">Home</Nav.Link>
              </Link>
              <Link href="/dashboard">
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              </Link>
              {session ? (
                <Link href="#">
                  <Nav.Link onClick={() => signOut({ callbackUrl: '/auth' })}>
                    Log Out
                  </Nav.Link>
                </Link>
              ) : (
                <Link href="/auth">
                  <Nav.Link href="/auth">Log In</Nav.Link>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
