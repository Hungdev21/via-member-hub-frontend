import usePageRequests from './usePageRequests.js';

const apiUrl = import.meta.env.VITE_API_URL;
const errorStatus = 'error';

export default function apiResource() {
    const { makePostRequest } = usePageRequests();

    const auth_login = async (data) => {
        try {
            const response = await makePostRequest(`${apiUrl}/auth/login`, data);
            return response;
        } catch (error) {
            console.error('Error fetching:', error);
            return null;
        }
    }

    return {
        auth_login,
    }
}