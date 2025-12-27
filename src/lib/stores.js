import { writable } from 'svelte/store';

export const themeMode = writable('device');
export const playerCount = writable(0);

// @ts-ignore

export function initializeTheme() {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('themeMode');
        if (savedTheme) {
            themeMode.set(savedTheme);
        }
        themeMode.subscribe(value => {
            document.body.classList.remove('light-mode', 'dark-mode');
            if (value === 'light') {
                document.body.classList.add('light-mode');
            } else if (value === 'dark') {
                document.body.classList.add('dark-mode');
            } else if (value === 'device') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (prefersDark) {
                    document.body.classList.add('dark-mode');
                } else {
                    document.body.classList.add('light-mode');
                }
            }
        });
    }
}

export function initializePlayerCount() {
    if (typeof window !== 'undefined') {
        const savedPlayers = localStorage.getItem('players');
        if (savedPlayers) {
            const players = JSON.parse(savedPlayers);
            // @ts-ignore
            const filteredPlayers = players.filter(player => player.trim().length > 0);
            playerCount.set(filteredPlayers.length);
        }
    }
}