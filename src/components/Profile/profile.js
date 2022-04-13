import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useRef } from 'react';
import { useAuth } from '../context/authContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './profile.css'

export default function Profile() {
    let navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passConfirmRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)




    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        const promises = [];
        setLoading(true)
        setError("")

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
            .then(() => {
                navigate("/")
            })
            .catch(() => {
                setError("Failed to update account")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile Update</h2>
                    {error && <Alert varient="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef}></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder='keep blank to keep the same'></Form.Control>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password-confirmation" ref={passConfirmRef} placeholder='keep blank to keep the same'></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type='submit'> Update Profile </Button>
                    </Form>
                </Card.Body>
            <div className="w-100 text-center mt-2">
                Cancel <Link to='/'>Log In</Link>
            </div>
            </Card>
        </>
    )
}

