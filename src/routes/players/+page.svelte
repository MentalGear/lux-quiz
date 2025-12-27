<script>
import { fade, slide } from 'svelte/transition';
import { themeMode, initializeTheme } from '$lib/stores';

let players = [''];

// Load players from localStorage on page load
if (typeof window !== 'undefined') {
    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers) {
        players = JSON.parse(savedPlayers);
    }
}

function addPlayer() {
    const lastPlayer = players[players.length - 1];
    if (lastPlayer && lastPlayer.trim().length > 0) {
        players = [...players, ''];
    }
}

function updatePlayer(index, value) {
    players[index] = value;
}

function removePlayer(index) {
    if (players.length > 1) {
        players = players.filter((_, i) => i !== index);
    }
}

// Initialize theme on page load
$: if (typeof window !== 'undefined') {
    initializeTheme();
}

// Save players to localStorage whenever they change
$: if (typeof window !== 'undefined') {
    const filteredPlayers = players.filter(player => player.trim().length > 0);
    localStorage.setItem('players', JSON.stringify(filteredPlayers));
}
</script>

<main>
    <div class="screen players">
        <h1>Players</h1>
        
        {#each players as player, index (index)}
            <div class="player-input-container" in:slide|local out:slide|local>
                <input
                    type="text"
                    class="player-input"
                    bind:value={players[index]}
                    placeholder={`Player ${index + 1} Name`}
                    on:input={() => addPlayer()}
                />
                <button class="remove-player" on:click={() => removePlayer(index)}>×</button>
            </div>
        {/each}
        
        <button class="btn-primary" on:click={() => window.location.href = '/'}>Back to Settings</button>
    </div>
</main>

<style>
    .screen.players {
        min-height: 100svh;
        display: flex;
        flex-direction: column;
        padding: 2rem;
        box-sizing: border-box;
        background: #f8f9fa;
        color: #333;
    }

    :global(body.dark-mode) .screen.players {
        background: #2d3436;
        color: #f8f9fa;
    }

    .player-input-container {
        width: 100%;
        max-width: 400px;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    h1 {
        font-size: 2rem;
        margin-bottom: 2rem;
        font-family: 'Segoe UI', system-ui, sans-serif;
    }

    .player-input {
        flex: 1;
        padding: 0.75rem 1rem;
        border-radius: 1rem;
        border: 2px solid #ddd;
        background: white;
        font-size: 1rem;
        font-family: 'Segoe UI', system-ui, sans-serif;
    }

    :global(body.dark-mode) .player-input {
        background: #3d4448;
        color: #f8f9fa;
        border-color: #666;
    }

    .remove-player {
        background: #EF3340;
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    :global(body.dark-mode) .player-input {
        background: #3d4448;
        color: #f8f9fa;
        border-color: #666;
    }

    :global(body.dark-mode) .remove-player {
        background: #EF3340;
    }

    .btn-primary {
        background: #EF3340;
        color: white;
        border: none;
        padding: 1.5rem 3rem;
        border-radius: 100px;
        font-weight: bold;
        font-size: 1.2rem;
        cursor: pointer;
        width: 100%;
        max-width: 400px;
        margin-top: 2rem;
        font-family: 'Segoe UI', system-ui, sans-serif;
    }
</style>