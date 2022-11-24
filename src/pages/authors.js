import {Button, Container, ListGroup} from "react-bootstrap";

const Authors = () => {
    const authors = [
        {id: 1, name: "Author 1"},
        {id: 2, name: "Author 2"},
        {id: 3, name: "Author 3"},
        {id: 4, name: "Author 4"},
    ]
    return (
        <Container className="authors-page text-center">
            <h1>Autores</h1>
            <ListGroup>
                {authors.map(author =>
                    <ListGroup.Item key={author.id} className="d-flex justify-content-between">
                        <span>{author.name}</span>
                        <span>
                            <a href={'/books?author=' + author.name}>
                                <Button>Ver livros</Button>
                            </a>
                        </span>
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Container>
    )
}

export default Authors