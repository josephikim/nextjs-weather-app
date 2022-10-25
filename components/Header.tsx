import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Link from "next/link";
import SearchBox from "components/SearchBox";

const Header: React.FC = () => {
  const authToken = true;

  const handleLogout = (): void => {
    alert("logged out!");
  };

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
              {authToken ? (
                <>
                  <Link href="/locations">
                    <Nav.Link>Saved</Nav.Link>
                  </Link>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Link href="/register">
                    <Nav.Link>Register</Nav.Link>
                  </Link>
                  <Link href="/login">
                    <Nav.Link>Login</Nav.Link>
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
