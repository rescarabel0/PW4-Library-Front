import {Button, ButtonGroup, Container, ListGroup} from "react-bootstrap";

const Home = () => {
    const books = [
        {id: 1, title: "Book 1", author: "Author 1"},
        {id: 2, title: "Book 2", author: "Author 2"},
        {id: 3, title: "Book 3", author: "Author 3"},
    ]

    return (
        <Container className={'home-page text-center'}>
            <h1 className={"title mb-4"}>Seja bem vindo a Livraria PW4!</h1>
            <div className={'books'}>
                <ListGroup>
                    {books.map(book =>
                        <ListGroup.Item key={book.id} className={"d-flex justify-content-between"}>
                            <span>{book.title}</span>
                            <span>{book.author}</span>
                            <ButtonGroup>
                                <Button className={"btn-success"}>Alugar</Button>
                                <Button>Editar</Button>
                                <Button className={"btn-danger"}>Excluir</Button>
                            </ButtonGroup>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </div>
        </Container>
    )
}

export default Home;