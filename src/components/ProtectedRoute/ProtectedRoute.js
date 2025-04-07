/**
 * ProtectedRoute component that implements route protection based on user authentication.
 * Checks if a user is logged in before allowing access to protected routes.
 * Redirects to home page if user is not authenticated.
 */
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    // Check for user authentication in localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    
    // If user exists, render the protected content
    // Otherwise, redirect to home page
    return user ? children : <Navigate to="/" />;    
}