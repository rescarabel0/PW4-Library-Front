import {Button, ButtonGroup, Container, ListGroup} from "react-bootstrap";
import {Navigate, useSearchParams} from "react-router-dom";

const Books = () => {
    const [searchParams] = useSearchParams()

    const author = searchParams.get("author")
    let books;
    if (author) {
        books = [
            {id: 1, title: "Book 1"},
            {id: 2, title: "Book 2"}
        ]
    } else {
        return <Navigate to={"/"}/>
    }
    return (
        <Container className={"text-center"}>
            <h1>Livros de {author}</h1>
            <ListGroup>
                {books.map(book =>
                    <ListGroup.Item key={book.id} className={"d-flex justify-content-between"}>
                        <span>{book.title}</span>
                        <ButtonGroup>
                            <Button className={"btn-success"}>Alugar</Button>
                            <Button>Editar</Button>
                            <Button className={"btn-danger"}>Excluir</Button>
                        </ButtonGroup>
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Container>
    )
}

export default Books