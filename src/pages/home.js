import {Button, ButtonGroup, Container, ListGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Moment from 'moment';

const Home = () => {
    Moment.locale('pt-br')
    const [books, setBooks] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("http://localhost:8080/book")
            .then(res => {
                if (res.ok)
                    return res.json()
                throw res
            })
            .then(books => {
                setBooks(books)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    const handleDeleteBook = (bookId) => {
        fetch("http://localhost:8080/book/" + bookId, {method: "DELETE"})
            .then(res => {
                if (res.ok) {
                    alert("Livro excluído com sucesso!")
                    window.location.reload()
                    return
                }
                throw res
            })
            .catch(() => {
                alert("Erro ao excluir livro.")
            })
    }

    if (loading) {
        return "Carregando..."
    }

    return (
        <Container className={'home-page text-center'}>
            <h1 className={"title mb-4"}>Seja bem vindo a Livraria PW4!</h1>
            <div className={'books'}>
                <Link to={"/books/new"}><Button className={"mb-3"}>Adicionar Livro</Button></Link>
                <ListGroup>
                    {books.map(book =>
                        <ListGroup.Item key={book.id} className={"d-flex justify-content-between"}>
                            <span>{book.title} <br/> {Moment(book.date).format("DD/MM/yyyy")}</span>
                            <ButtonGroup>
                                <Link to={"/books/new"} state={{book}}><Button>Editar</Button></Link>
                                <Button className={"btn-danger"}
                                        onClick={() => handleDeleteBook(book.id)}>Excluir</Button>
                            </ButtonGroup>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </div>
        </Container>
    )
}

export default Home;