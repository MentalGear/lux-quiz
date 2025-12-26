<script>
    import sayingsData from '$lib/dataset.json';
    import GameCard from '$lib/components/GameCard.svelte';

    let state = 'settings';
    let rounds = 5;
    let mode = 'lu';
    let gameSet = [];
    let container;
    let currentIndex = 0;

    function startGame() {
        gameSet = [...sayingsData]
            .sort(() => 0.5 - Math.random())
            .slice(0, rounds)
            .map(s => ({ ...s, isRevealed: false }));
        currentIndex = 0;
        state = 'playing';
    }

    function handleScroll() {
        if (container) {
            const newIndex = Math.round(container.scrollLeft / container.clientWidth);
            // Only allow scrolling forward if the current card has been answered
            if (newIndex > currentIndex && !gameSet[currentIndex].isRevealed) {
                container.scrollTo({
                    left: currentIndex * container.clientWidth,
                    behavior: 'smooth'
                });
            } else {
                currentIndex = newIndex;
            }
        }
    }

    function handleAction() {
        if (!gameSet[currentIndex].isRevealed) {
            gameSet[currentIndex].isRevealed = true;
        } else if (currentIndex < gameSet.length - 1) {
            // Scroll to next card
            currentIndex++;
            container.scrollTo({
                left: currentIndex * container.clientWidth,
                behavior: 'smooth'
            });
        } else {
            state = 'settings';
        }
    }

    // Calculate progress for the top bar
    $: progress = ((currentIndex + 1) / gameSet.length) * 100;
</script>

<main>
    {#if state === 'settings'}
        <div class="screen settings">
            <h1>🇱🇺 Spreechwierder</h1>
            
            <div class="control">
                <label>Number of Rounds</label>
                <select bind:value={rounds}>
                    {#each [5, 10, 15, 20, 25] as num}
                        <option value={num}>{num} Cards</option>
                    {/each}
                </select>
            </div>

            <div class="control">
                <label>Mode</label>
                <select bind:value={mode}>
                    <option value="lu">Luxembourgish Only</option>
                    <option value="literal">LU + English Literal</option>
                    <option value="correct">LU + English Equivalent</option>
                </select>
            </div>

            <button class="btn-primary" on:click={startGame}>Start Game</button>
        </div>
    {:else}
        <div class="screen game">
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: {progress}%" />
            </div>

            <button class="btn-back floating" on:click={() => state = 'settings'}>✕</button>

            <div class="scroll-wrapper" bind:this={container} on:scroll={handleScroll}>
                {#each gameSet as saying, i}
                    <div class="snap-point">
                        <GameCard {saying} {mode} revealed={saying.isRevealed} />
                    </div>
                {/each}
            </div>

            {#if gameSet[currentIndex].isRevealed && currentIndex < gameSet.length - 1}
                <button class="btn-action floating-next" on:click={handleAction}>Next →</button>
            {:else if gameSet[currentIndex].isRevealed && currentIndex === gameSet.length - 1}
                <button class="btn-action floating-next" on:click={handleAction}>Finish</button>
            {:else}
                <button class="btn-action floating-reveal" on:click={handleAction}>Reveal</button>
            {/if}
        </div>
    {/if}
</main>

<style>
    :global(body) { margin: 0; background: #f8f9fa; font-family: 'Segoe UI', system-ui, sans-serif; overflow: hidden; }

    main { height: 100svh; width: 100svw; display: flex; flex-direction: column; }

    .screen { height: 100svh; display: flex; flex-direction: column; padding: 2rem; box-sizing: border-box; position: relative; }
    .settings { justify-content: center; align-items: center; max-width: 400px; margin: 0 auto; }

    .control { width: 100%; margin-bottom: 2rem; }
    label { font-weight: 700; color: #444; display: block; margin-bottom: 0.5rem; }
    select { width: 100%; padding: 1rem; border-radius: 1rem; border: 2px solid #ddd; background: white; font-size: 1rem; }

    .progress-bar-container {
        width: 100%;
        height: 10px;
        background-color: #eee;
        border-radius: 5px;
        margin-bottom: 1rem;
    }

    .progress-bar {
        height: 100%;
        background-color: #00A3E0;
        border-radius: 5px;
        transition: width 0.3s ease;
    }

    .scroll-wrapper {
        flex: 1;
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
    }
    .scroll-wrapper::-webkit-scrollbar { display: none; }
    .snap-point { flex: 0 0 100svw; scroll-snap-align: center; display: flex; align-items: center; justify-content: center; }

    .btn-back.floating {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: #eee; border: none; width: 64px; height: 64px;
        border-radius: 50%; font-size: 2rem; cursor: pointer; display: flex;
        align-items: center; justify-content: center; color: #666;
        z-index: 100;
    }

    .btn-action.floating-reveal {
        position: absolute;
        bottom: 2rem;
        right: 2rem;
        background: #00A3E0; color: white; border: none; padding: 1rem 2rem;
        border-radius: 100px; font-weight: bold; font-size: 1.2rem; cursor: pointer;
        z-index: 100;
    }

    .btn-action.floating-next {
        position: absolute;
        bottom: 2rem;
        right: 2rem;
        background: #EF3340; color: white; border: none; padding: 1rem 2rem;
        border-radius: 100px; font-weight: bold; font-size: 1.2rem; cursor: pointer;
        z-index: 100;
    }

    .btn-primary {
        background: #EF3340; color: white; border: none; padding: 1.5rem 3rem;
        border-radius: 100px; font-weight: bold; font-size: 1.2rem; cursor: pointer; width: 100%;
    }
</style>