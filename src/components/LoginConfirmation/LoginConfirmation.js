import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginConfirmation() {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to home page after 2 seconds
        const timer = setTimeout(() => {
            navigate('/');
        }, 3500);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="login-confirmation">
            <h1>Login Successful!</h1>
            <br />
            <h3>Redirecting you to the home page...</h3>
        </div>
    );
} 