import {Button, ButtonGroup, Container, ListGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Authors = () => {
    const [authors, setAuthors] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("http://localhost:8080/author")
            .then(res => {
                if (res.ok)
                    return res.json()
                throw res
            })
            .then(authors => {
                setAuthors(authors)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    const handleDeleteAuthor = (authorId) => {
        fetch("http://localhost:8080/author/" + authorId, {method: "DELETE"})
            .then(res => {
                if (res.ok) {
                    alert("Autor excluído com sucesso!")
                    window.location.reload()
                    return
                }
                throw res
            })
            .catch(() => {
                alert("Erro ao excluir autor.")
            })
    }

    if (loading) {
        return "Carregando..."
    }

    return (
        <Container className="authors-page text-center">
            <h1>Autores</h1>
            <Link to={"/authors/new"}><Button className={"mb-3"}>Adicionar autor</Button></Link>
            <ListGroup>
                {authors.map(author =>
                    <ListGroup.Item key={author.id} className="d-flex justify-content-between">
                        <span>{author.name}</span>
                        <ButtonGroup>
                            <Link to={'/books?author=' + author.id}>
                                <Button>Ver livros</Button>
                            </Link>
                            <Button variant="danger" onClick={() => handleDeleteAuthor(author.id)}>Excluir</Button>
                        </ButtonGroup>
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Container>
    )
}

export default Authors