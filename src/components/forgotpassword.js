import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import  '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useRef } from 'react';
import { useAuth } from './context/authContext';
import { Link, useNavigate } from 'react-router-dom';

    
export default function ForgotPassword() {
    let navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions.')
        } catch {
            setError('Failed to reset password.')
        }
        setLoading(false)
    }

    return (
        <>
    <Card>
        <Card.Body>
            <h2 className="text-center mb-4">Password Reset</h2>
            {message && <Alert varient="success">{message}</Alert>}
            {error && <Alert varient="danger">{error}</Alert>}
            
            <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef}></Form.Control>
            </Form.Group>
            <Button disabled={loading} className="w-100" type='submit'> Reset Password </Button>
            </Form>
            <div className="w-100 text-center mt-3">
                Need an account? <Link to='/login'>Login</Link>
            </div>
        </Card.Body>
        <div className="w-100 text-center mt-2">
            Need an account? <Link to='/signup'>Sign Up</Link>
        </div>
    </Card>
        </>
    )
}