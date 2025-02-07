'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Page = () => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Indicate loading state
    const [errorMessage, setErrorMessage] = useState(''); // Display error messages
    const router = useRouter();

    interface AuthResponse {
        status: number;
        data: {
            message?: string;
        };
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const endpoint = `/api/${isLogin ? 'login' : ' Register'}`;
            const response: AuthResponse = await axios.post(endpoint, { email, password });

            if (response.status === 200) {
                router.push('/dashboard'); // Redirect on success
            } else {
                setErrorMessage('Unexpected response from server.');
            }
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || 'Authentication failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>{isLogin ? 'Login' : ' Register'}</h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                />

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                <button type="submit" disabled={loading} style={{ padding: '10px', cursor: loading ? 'not-allowed' : 'pointer' }}>
                    {loading ? 'Processing...' : isLogin ? 'Login' : ' Register'}
                </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p>
                    {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ marginLeft: '5px', color: 'blue', textDecoration: 'underline', cursor: 'pointer', background: 'none', border: 'none' }}
                    >
                        {isLogin ? ' Register' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Page;
