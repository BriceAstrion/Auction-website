import { writable } from 'svelte/store';

const storedToken = localStorage.getItem('token') || '';
export const token = writable(storedToken);

export function getToken() {
    let value;
    const unsubscribe = token.subscribe(val => {
        value = val;
    });
    unsubscribe();
    return value;
}

export function getDecodedToken() {
    const tokenValue = getToken();
    if (tokenValue) {
        try {
            // Split the token into header, payload, and signature
            const [header, payload, signature] = tokenValue.split('.');

            // Base64 decode the payload section
            const decodedPayload = atob(payload);

            // Parse the JSON payload to get the payload data
            const payloadData = JSON.parse(decodedPayload);
            return payloadData;
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }
    return null;
}