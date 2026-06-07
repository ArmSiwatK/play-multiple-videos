<script>
  import he from 'he';
  import './YouTubeSearch.css';
  import './SearchResults.css';

  let { onVideoUrlCopy } = $props();

  let searchTerm = $state('');
  let searchResults = $state([]);
  let isLoading = $state(false);
  let showResults = $state(true);
  let maxResults = $state(undefined);
  let maxResultsInput = $state('');
  let copyMode = $state(false);
  let previousSearchTerm = $state('');
  let previousMaxResults = $state('');

  const maxTitleLength = 60;
  const buttonActive = $derived(copyMode);

  const handleSearch = async () => {
    try {
      if (searchTerm === previousSearchTerm && maxResults === previousMaxResults) {
        return;
      }

      searchResults = [];
      showResults = false;
      isLoading = true;
      previousSearchTerm = searchTerm;
      previousMaxResults = maxResults;

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchTerm, maxResults }),
      });

      if (response.ok) {
        const { items } = await response.json();
        searchResults = items;
      } else {
        throw new Error('Search request failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      isLoading = false;
      showResults = true;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleMaxResultsChange = (event) => {
    const input = event.target.value;
    const isValidNumber = /^(?:[1-9]|10)$/.test(input);

    if (isValidNumber) {
      maxResultsInput = input;
      maxResults = Number.parseInt(input, 10);
    } else {
      maxResultsInput = '';
      maxResults = undefined;
    }
  };

  const handleCardClick = async (videoId) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    if (copyMode) {
      try {
        await navigator.clipboard.writeText(videoUrl);
      } catch (error) {
        console.error('Failed to copy the URL to clipboard:', error);
      }
    } else {
      onVideoUrlCopy?.(videoUrl);
    }
  };

  const handleClearResults = () => {
    searchTerm = '';
    searchResults = [];
    showResults = false;
    previousSearchTerm = '';
    previousMaxResults = '';
  };

  const truncateTitle = (title) => {
    const truncatedTitle = title.length <= maxTitleLength ? title : `${title.substring(0, maxTitleLength)}...`;
    return he.decode(truncatedTitle);
  };

  $effect(() => {
    const keepAliveInterval = setInterval(async () => {
      try {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/keep-alive`);
      } catch (error) {
        console.error('An error occurred during keep-alive:', error);
      }
    }, 300000);

    return () => {
      clearInterval(keepAliveInterval);
    };
  });
</script>

<div class="container">
  <div class="input-container">
    <input
      type="text"
      bind:value={searchTerm}
      onkeydown={handleKeyDown}
      placeholder="Enter search term"
      class="search-query-input"
    />
    <button onclick={handleSearch} class="red-button">Search</button>
    <button onclick={() => (copyMode = !copyMode)} class:active={buttonActive} class="gradient-button">
      Copy
    </button>
    <button onclick={handleClearResults} class="black-button">Clear</button>
    <input
      type="number"
      value={maxResultsInput}
      oninput={handleMaxResultsChange}
      placeholder="Results (1-10)"
      class="results-number-input"
      min="1"
      max="10"
    />
  </div>

  {#if isLoading}
    <div class="search-loading-icon">
      <div class="search-spinner"></div>
    </div>
  {/if}

  {#if showResults}
    <ul>
      {#each searchResults as video (video.id.videoId)}
        <li>
          <button class="card" onclick={() => handleCardClick(video.id.videoId)}>
            <img src={video.snippet.thumbnails.default.url} alt="Video Thumbnail" />
            <h3>{truncateTitle(video.snippet.title)}</h3>
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
