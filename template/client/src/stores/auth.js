import { writable } from 'svelte/store';

export const isLoggedIn = writable(localStorage.getItem('token') != undefined);