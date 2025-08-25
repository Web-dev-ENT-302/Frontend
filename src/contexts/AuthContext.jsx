import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import LogoutConfirmationModal from '../components/LogoutConfirmationModal';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    // Initialize authentication state based on token existence
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = Cookies.get('token');
        return !!token;
    });

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const navigate = useNavigate();

    // Post Login successful handler
    const handleLogin = (data) => {
        Cookies.set('token', data.token, { expires: 1 }); // Token is set to expire in  1 day

        // Store user data in sessionStorage
        sessionStorage.setItem('userData', JSON.stringify(data.user));

        const decodedToken = jwtDecode(data.token); // decode token to extract (id, role, exp)
        setIsAuthenticated(true); // authenticate user
        setUser(data.user);
        setToken(data.token)


        // Redirect based on role, use the role from the decoded token to redirect user
        if (decodedToken.role === "STUDENT") {
            navigate("/student");
        } else {
            navigate("/driver");
        }
    };

    // display the confirmation modal
    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    // log user out
    const confirmLogout = () => {
        Cookies.remove('token');
        sessionStorage.removeItem('userData');
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
        setShowLogoutModal(false);
        navigate('/login');
    };

    // remove the confirmation modal
    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    // verify token and fetch user data
    useEffect(() => {
        const token = Cookies.get('token'); // get token from storage

        if (token) {
            try {
                const decodedToken = jwtDecode(token); // Decode token

                // Check if token is expired
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    // Token expired, logout immediately without confirmation
                    confirmLogout();
                    return;
                }

                const userId = decodedToken.id; // Access id of the user
                setIsAuthenticated(true); // Authenticate user
                setToken(token) // set token

                // Try to get user data from sessionStorage first
                const storedUserData = sessionStorage.getItem('userData');
                if (storedUserData) {
                    // Parse and use stored user data
                    const userData = JSON.parse(storedUserData);
                    setUser(userData);
                }
                // Make request with the user id to fetch the data of the user...
            } catch (error) {
                // if token is not valid, log user out immediately without confirmation
                console.error("Invalid token:", error);
                confirmLogout();
            }
        } else {
            // No token found, ensure user is logged out
            setIsAuthenticated(false);
            setUser(null);
            setToken(null)
        }
    }, []);
    const value = {
        isAuthenticated,
        user,
        token,
        login: handleLogin,
        logout: handleLogout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}

            {/* log out modal popup */}
            <LogoutConfirmationModal
                open={showLogoutModal}
                onClose={cancelLogout}
                onConfirm={confirmLogout}
            />
        </AuthContext.Provider>
    );

}

