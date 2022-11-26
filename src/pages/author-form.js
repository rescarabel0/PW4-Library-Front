import {Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const AuthorForm = () => {
    const navigate = useNavigate()
    const [state, setState] = useState({name: ''})

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!state.name || state.name === '') {
            return
        }
        fetch("http://localhost:8080/author",
            {
                method: "POST", headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify(state)
            }
        )
            .then(res => {
                if (res.ok) {
                    alert("Autor adicionado com sucesso!")
                    navigate("/authors")
                    return
                }
                throw res
            }).catch(() => {
            alert("Erro ao adicionar autor.")
        })
    }

    const handleChange = (event) => {
        setState({name: event.target.value})
    }

    return (
        <Container>
            <h1>Novo autor</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" onChange={handleChange} placeholder="John Doe"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Enviar
                </Button>
            </Form>
        </Container>
    )
}

export default AuthorForm