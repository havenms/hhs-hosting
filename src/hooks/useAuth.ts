// src/hooks/useAuth.ts
'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';


export function useAuth() {
	const { user, isLoaded, isSignedIn } = useUser();
	const { signOut } = useClerk();
	const router = useRouter();
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const [adminCheckComplete, setAdminCheckComplete] =
		useState<boolean>(false);

	useEffect(() => {
		if (isLoaded) {
			// Set a maximum waiting time for metadata - don't block UI forever
			const timeout = setTimeout(() => {
				if (!adminCheckComplete) {
					console.log('Admin check timed out - using default value');
					setAdminCheckComplete(true);
				}
			}, 2000);

			if (isSignedIn && user) {
				try {
					// Log what we're finding in the metadata for debugging
					console.log(
						'User metadata:',
						JSON.stringify(user.publicMetadata)
					);

					// Perform the admin check with multiple fallbacks
					const userRole = user.publicMetadata?.role;
					const adminFlag = user.publicMetadata?.isAdmin;

					const hasAdminRole = userRole === 'admin';
					const hasAdminFlag = adminFlag === true;
					const anyAdminIndicator = Boolean(
						hasAdminRole || hasAdminFlag
					);

					console.log(
						`Admin check results - role:${hasAdminRole}, flag:${hasAdminFlag}, combined:${anyAdminIndicator}`
					);

					setIsAdmin(anyAdminIndicator);
					setAdminCheckComplete(true);
				} catch (error) {
					console.error('Error checking admin status:', error);
					setAdminCheckComplete(true);
				}
			} else if (isLoaded && !isSignedIn) {
				setIsAdmin(false);
				setAdminCheckComplete(true);
			}

			return () => clearTimeout(timeout);
		}
	}, [isLoaded, isSignedIn, user, adminCheckComplete]);

	const logout = async () => {
		await signOut();
		router.push('/');
	};

	return {
		user: isSignedIn ? user : null,
		isLoading: !isLoaded || !adminCheckComplete, // Only finished loading when admin check is done
		isAdmin,
		logout,
	};
}
