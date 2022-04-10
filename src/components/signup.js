import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useRef } from 'react';
import { useAuth } from '../components/context/authContext';
import { Link } from 'react-router-dom';
import { auth, signup } from './firebase';
export default function Signup() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passConfirmRef.current.value) {
            return setError('Passwords do not match.')
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
        } catch {
            setError('Failed to create an account.')
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign up</h2>
                    {error && <Alert varient="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef}></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef}></Form.Control>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password-confirmation" ref={passConfirmRef}></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type='submit'> Sign Up </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to='login'>Log In</Link>
            </div>
        </>
    )
}