import { Container, Nav, Navbar } from 'react-bootstrap';
import style from '../header/Index.module.css';
import Logo from '/assets/logo.png';
import { Link, useLocation } from 'react-router-dom';

function Index() {
  const location = useLocation();

  // A function to determine if the link should be active
  const isActive = (path) => location.pathname === path ? style.active : '';

  return (
    <Navbar expand="lg" className={`bg-white ${style.navbar}`}>
      <Container>
        <Navbar.Brand href="#home"><img src={Logo} alt="imagess" width='180px' height='60px' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className={style.navbar_right}>
          <Nav className="m-2">
            <Link to="/" className={isActive('/')}>Home</Link>
          </Nav>
          <Nav className="m-2">
            <Link to="/select_template" className={isActive('/select_template')}>Create</Link>
          </Nav>
          <Nav className="m-2">
            <Link to="/show" className={isActive('/show')}>Show</Link>
          </Nav>
          <Nav className="m-2">
            <Link to="/updatePage" className={isActive('/updatePage')}>Update</Link>
          </Nav>
          <Nav className="m-2">
            <Link to="/deletePage" className={isActive('/deletePage')}>Delete</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Index;
