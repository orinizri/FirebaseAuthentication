import { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/authContext'
function Dashboard() {
    const [ error, setError ] = useState('')
    const { currentUser, logout } = useAuth();
    let navigate = useNavigate();
    async function handleLogout() {
        setError('')
        try {
            await logout()
            navigate('/')
        } catch {
            setError('Failed to log out.')
        }
    }

    return (
        <Card>
            <Card.Body>
                <h2 className="w-100 text-center mt-4">Profile</h2>
                {error && <Alert varient="danger">{error}</Alert>}
                <strong>Email: </strong> {currentUser.email}
            </Card.Body>
            <div className='w-100 text-center mt-2'>
                <Button variant='link' onClick={handleLogout}>Log out</Button>
            </div>
        </Card>
    )
}

export default Dashboard;