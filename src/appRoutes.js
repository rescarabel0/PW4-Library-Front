import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import Authors from "./pages/authors";
import {Container, Nav, Navbar} from "react-bootstrap";
import Books from "./pages/books";
import BookForm from "./pages/book-form";
import AuthorForm from "./pages/author-form";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Navbar className={"mb-3"} bg='dark' expand='sm'>
                <Container>
                    <Navbar.Brand href="/">Livraria PW4</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar"/>
                    <Navbar.Collapse id="navbar">
                        <Nav className="me-auto">
                            <Link className="nav-link" to={'/'}>Início</Link>
                            <Link className="nav-link" to={'/authors'}>Autores</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                <Route element={<Home/>} path="/"/>
                <Route element={<Authors/>} path="/authors"/>
                <Route element={<AuthorForm/>} path="/authors/new"/>
                <Route element={<Books/>} path="/books"/>
                <Route element={<BookForm/>} path="/books/new"/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes