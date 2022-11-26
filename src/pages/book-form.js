import {Button, Container, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Moment from "moment";

const BookForm = () => {
    Moment.locale("pt-br")
    const navigate = useNavigate()
    const location = useLocation()
    const [form, setForm] = useState({title: '', date: '', author: ''})
    const [authors, setAuthors] = useState(null)
    const [loading, setLoading] = useState(true)
    const [currentBook, setCurrentBook] = useState(null)

    useEffect(() => {
        if (location.state && location.state.book) {
            setCurrentBook(location.state.book);
            setForm({
                title: location.state.book.title,
                date: location.state.book.date,
                author: location.state.book.author
            })
        }
        fetch("http://localhost:8080/author")
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                throw res
            })
            .then(json => {
                setAuthors(json)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [location.state])


    const handleSubmit = (event) => {
        event.preventDefault()
        let body = form
        if (!form.author && authors) {
            body.author = authors[0].id
        }
        fetch(currentBook ? "http://localhost:8080/book/" + currentBook.id : "http://localhost:8080/book/", {
            method: currentBook ? "PUT" : "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
            .then(res => {
                if (res.ok) {
                    alert(`Livro ${currentBook ? "editado" : "adicionado"} com sucesso!`)
                    navigate("/")
                    return
                }
                throw res
            }).catch(() => {
            alert("Erro ao adicionar livro!")
        })
    }

    const handleTitleChange = (event) => {
        setForm({
            title: event.target.value, date: form.date, author: form.author
        })
    }

    const handleDateChange = (event) => {
        setForm({
            title: form.title, date: event.target.value, author: form.author
        })
    }

    const handleAuthorChange = (event) => {
        setForm({
            title: form.title, date: form.date, author: event.target.value
        })
    }

    if (loading)
        return "Carregando..."

    return (
        <Container>
            <h1>{currentBook ? "Editar livro" : "Novo livro"}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className={"mb-3"}>
                    <Form.Label>Título</Form.Label>
                    <Form.Control onChange={handleTitleChange}
                                  value={form.title}
                                  type="text"
                                  placeholder="Título do livro"/>
                </Form.Group>
                <Form.Group className={"mb-3"}>
                    <Form.Label>Data de lançamento</Form.Label>
                    <Form.Control onChange={handleDateChange}
                                  value={form.date ? Moment(new Date(form.date)).format("yyyy-MM-DD") : ''}
                                  type="date"/>
                </Form.Group>
                <Form.Group className={"mb-3"}>
                    <Form.Label>Autor</Form.Label>
                    <Form.Select onChange={handleAuthorChange}>
                        {authors.map(author =>
                            form.author === author.id ?
                                <option selected key={author.id} value={author.id}>{author.name}</option> :
                                <option key={author.id} value={author.id}>{author.name}</option>
                        )}
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Enviar
                </Button>
            </Form>
        </Container>
    )
}

export default BookForm