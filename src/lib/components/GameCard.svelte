<script>
    export let saying;
    export let mode;
    export let revealed = false;

    // Determine which English parts to show
    $: en_p1 = mode === 'literal' ? saying.en_literal_p1 : mode === 'correct' ? saying.en_correct_p1 : saying.en_literal_p1;
    $: en_p2 = mode === 'literal' ? saying.en_literal_p2 : mode === 'correct' ? saying.en_correct_p2 : saying.en_literal_p2;

    // Determine which parts to reveal
    $: showEnglish = mode === 'en_to_lu';

    $: luWords = saying.lu_part2.split(' ');
    $: enWords = en_p2.split(' ');
</script>

<div class="card">
    <div class="content">
        {#if showEnglish}
            <div class="text-block en">
                <span class="part1">{en_p1}</span>
                <div class="part2">
                    {#each enWords as word, i}
                        <span class="word" class:revealed style="transition-delay: {revealed ? i * 100 : 0}ms">
                            {word}
                        </span>
                    {/each}
                </div>
            </div>
            
            {#if revealed}
                <div class="divider"></div>
                
                <div class="text-block lu">
                    <span class="part1">{saying.lu_part1}</span>
                    <div class="part2">
                        {#each luWords as word, i}
                            <span class="word" class:revealed style="transition-delay: {revealed ? (enWords.length + i) * 100 : 0}ms">
                                {word}
                            </span>
                        {/each}
                    </div>
                </div>
            {/if}
        {:else}
            <div class="text-block lu">
                <span class="part1">{saying.lu_part1}</span>
                <div class="part2">
                    {#each luWords as word, i}
                        <span class="word" class:revealed style="transition-delay: {revealed ? i * 100 : 0}ms">
                            {word}
                        </span>
                    {/each}
                </div>
            </div>

            {#if mode !== 'lu'}
                <div class="divider"></div>
                
                <div class="text-block en">
                    <span class="part1">{en_p1}</span>
                    <div class="part2">
                        {#each enWords as word, i}
                            <span class="word" class:revealed style="transition-delay: {revealed ? (luWords.length + i) * 100 : 0}ms">
                                {word}
                            </span>
                        {/each}
                    </div>
                </div>
            {/if}
        {/if}
    </div>
</div>

<style>
    .card {
        width: 85svw;
        max-width: 500px;
        height: 60svh;
        background: white;
        border-radius: 2rem;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
    }

    :global(body.dark-mode) .card {
        background: #3d4448;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    }

    .content { text-align: center; width: 100%; }
    .text-block.lu { font-size: 1.8rem; font-weight: 800; color: #2d3436; }
    .text-block.en { font-size: 1.2rem; color: #636e72; font-style: italic; }

    :global(body.dark-mode) .text-block.lu { color: #f8f9fa; }
    :global(body.dark-mode) .text-block.en { color: #b2bec3; }

    .part1 { display: block; margin-bottom: 0.5rem; }
    .lu .part1 { color: #00A3E0; }

    :global(body.dark-mode) .lu .part1 { color: #00A3E0; }

    .divider { height: 2px; width: 40px; background: #eee; margin: 2rem auto; }

    :global(body.dark-mode) .divider { background: #666; }

    .word {
        display: inline-block;
        opacity: 0;
        filter: blur(12px);
        transform: translateY(10px);
        transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        margin-right: 0.3rem;
    }

    .word.revealed {
        opacity: 1;
        filter: blur(0px);
        transform: translateY(0);
    }
</style>