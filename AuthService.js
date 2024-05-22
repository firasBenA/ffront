import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './config';


export const AuthService = createContext();
export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null); // Added state for user ID

    useEffect(() => {
        const checkLoginStatus = async () => {
            const { isLoggedIn } = await isLoggedIn();
            setIsAuthenticated(isLoggedIn);
            setToken(token); // Set token state

        };

        checkLoginStatus();
    }, []);


    const login = async (email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}api/User/login`, {
                email,
                password,
            });

            const { existingUser, jwt } = response.data;

            if (jwt) {
                await AsyncStorage.setItem('jwt', jwt);
                await AsyncStorage.setItem('user', JSON.stringify(existingUser));
                // Set other user-related data if needed
                setUserId(existingUser.id);
                setIsAuthenticated(true);
                return true;
            } else {
                console.error('Login failed: JWT token is null or undefined');
                return false;
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Login failed: Invalid email or password');
            } else {
                console.error('Login failed:', error);
            }
            return false;
        }
    };



    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            setIsAuthenticated(false); // Update isAuthenticated after logout
            return true; // Logout successful
        } catch (error) {
            console.error('Logout error:', error);
            return false; // Logout failed
        }
    };

    const isLoggedIn = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                console.log('Token:', token);
                setIsAuthenticated(true);
                return { isLoggedIn: true, token }; // Return an object with isLoggedIn and token
            } else {
                setIsAuthenticated(false);
                return { isLoggedIn: false, token: null }; // Return false and null token if token doesn't exist
            }
        } catch (error) {
            console.error('Error checking login status:', error);
            setIsAuthenticated(false);
            return { isLoggedIn: false, token: null }; // Return false and null token on error
        }
    };

    const register = async (name, email, password) => {
        try {
            await axios.post(`${BASE_URL}api/User`, {
                name,
                email,
                password,
            });

            setIsAuthenticated(true);

            return true; // Registration successful
        } catch (error) {
            console.error('Registration error:', error);
            return false;
        }
    };

    const authContext = {
        userInfo,
        isAuthenticated,
        login,
        logout,
        isLoggedIn,
        register,
        userId, // Include userId in the context

    };

    return (
        <AuthService.Provider value={authContext}>
            {children}
        </AuthService.Provider>
    );
};

export default AuthService;
