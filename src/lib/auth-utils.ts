// src/lib/auth-utils.ts - Client-safe version
// No server-only imports here

export async function authFetch(url: string, options: RequestInit = {}) {
	try {
		const response = await fetch(url, {
			...options,
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				...options.headers,
			},
		});

		if (!response.ok) {
			const errorText = await response.text();
			try {
				const errorJson = JSON.parse(errorText);
				throw new Error(
					errorJson.error ||
						`API request failed with status ${response.status}`
				);
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (e) {
				throw new Error(
					`API request failed with status ${response.status}: ${
						errorText || ''
					}`
				);
			}
		}

		return response;
	} catch (error) {
		console.error('Auth fetch error:', error);
		throw error;
	}
}
