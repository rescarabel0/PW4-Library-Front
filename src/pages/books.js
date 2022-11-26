import {Button, ButtonGroup, Container, ListGroup} from "react-bootstrap";
import {Link, Navigate, useSearchParams} from "react-router-dom";
import Moment from "moment/moment";
import {useEffect, useState} from "react";

const Books = () => {
    const [searchParams] = useSearchParams()
    const [books, setBooks] = useState(null)
    const [author, setAuthor] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if (searchParams.get("author")) {
            setAuthor(searchParams.get("author"))
        }
        fetch("http://localhost:8080/book/author/" + searchParams.get("author"))
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
    }, [author, searchParams])


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

    if (!author && !loading) {
        return <Navigate to={"/authors"}/>
    }

    if (loading) {
        return "Carregando..."
    }

    return (
        <Container className={"text-center"}>
            <h1>Livros</h1>
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
        </Container>
    )
}

export default Books