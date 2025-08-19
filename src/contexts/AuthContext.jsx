import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    // Initialize authentication state based on token existence
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = Cookies.get('token');
        return !!token;
    });

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null)

    const navigate = useNavigate();

    // Post Login successful handler
    const handleLogin = (data) => {
        Cookies.set('token', data.token, { expires: 1 }); // Token is set to expire in  1 day

        const decodedToken = jwtDecode(data.token); // decode token to extract (id, role, exp)
        setIsAuthenticated(true); // authenticate user
        setUser(data.user);
        setToken(data.token)


        // Redirect based on role, use the role from the decoded token to redirect user
        if (decodedToken.role === "STUDENT") {
            navigate("/student-dashboard");
        } else {
            navigate("/driver-dashboard");
        }
    };

    const handleLogout = () => {
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
        navigate('/login');
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
                    // Token expired, logout
                    handleLogout();
                    return;
                }

                const userId = decodedToken.id; // Access id of the user
                setIsAuthenticated(true); // Authenticate user
                setUser({ name: "Stroge" }); // dummy user data
                setToken(token) // set token

                // Make request with the user id to fetch the data of the user...

            } catch (error) {
                // if token is not valid, log user out.
                console.error("Invalid token:", error);
                handleLogout();
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
        </AuthContext.Provider>
    );

}

