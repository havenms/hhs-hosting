'use client';

import {
	createContext,
	useContext,
	ReactNode,
	useState,
	useEffect,
} from 'react';

// Define user type
interface User {
	name?: string;
	email?: string;
	isAdmin?: boolean;
	role?: string;
}

// Define auth context type
interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	isAdmin: boolean;
	login: (emailOrUser: string | User, password?: string) => Promise<any>;
	logout: () => void;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth hook
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	// Check for stored user on initial load
	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			try {
				setUser(JSON.parse(storedUser));
			} catch (error) {
				console.error('Failed to parse stored user:', error);
			}
		}
	}, []);

	// Login function that can accept either email/password or a user object
	const login = async (emailOrUser: string | User, password?: string) => {
		setIsLoading(true);

		try {
			// Case 1: User object is passed directly (demo login)
			if (typeof emailOrUser === 'object') {
				const userData = emailOrUser;
				console.log('Setting user with data:', userData); // Debug
				setUser(userData);
				localStorage.setItem('user', JSON.stringify(userData));

				// Set cookie for middleware (requires a document environment)
				if (typeof document !== 'undefined') {
					document.cookie = `user=${JSON.stringify(
						userData
					)}; path=/; max-age=86400`;
				}

				return userData;
			}
			// Case 2: Email and password are passed
			else if (typeof emailOrUser === 'string' && password) {
				const email = emailOrUser;
				// Mock authentication - in a real app this would call an API
				const mockUser = {
					name: email.split('@')[0],
					email: email,
					role: email.includes('admin') ? 'admin' : 'user',
					isAdmin: email.includes('admin'),
				};
				setUser(mockUser);
				localStorage.setItem('user', JSON.stringify(mockUser));
				return mockUser;
			} else {
				throw new Error('Invalid login parameters');
			}
		} catch (error) {
			console.error('Login failed:', error);
			throw new Error('Login failed. Please check your credentials.');
		} finally {
			setIsLoading(false);
		}
	};

	// Logout function
	const logout = () => {
		setUser(null);
		localStorage.removeItem('user');

		// Clear the cookie
		if (typeof document !== 'undefined') {
			document.cookie = 'user=; path=/; max-age=0';
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoading,
				isAdmin: user?.isAdmin || user?.role === 'admin',
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
