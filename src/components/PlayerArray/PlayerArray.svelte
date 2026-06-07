<script>
  import YouTubePlayer from '../YouTubePlayer/YouTubePlayer.svelte';

  let videoUrls = $state(['', '']);
  let isPlayingAll = $state(false);

  const handleAddPlayer = () => {
    videoUrls = [...videoUrls, ''];
  };

  const handleRemovePlayerAtIndex = (index) => {
    videoUrls = videoUrls.filter((_, i) => i !== index);
  };

  const handleRemoveAllPlayers = () => {
    videoUrls = [];
  };

  const handleVideoUrlChange = (index, url) => {
    videoUrls = videoUrls.map((currentUrl, i) => (i === index ? url : currentUrl));
  };

  const togglePlayAll = () => {
    isPlayingAll = !isPlayingAll;
  };

  $effect(() => {
    const handleKeyPress = (event) => {
      const isInputElement = event.target instanceof HTMLInputElement;
      if (event.code === 'Space' && !isInputElement) {
        event.preventDefault();
        togglePlayAll();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });
</script>

<div class="player-array-container">
  <div class="player-array-players">
    {#each videoUrls as url, index (`player-${index + 1}`)}
      <div class="player-array-player">
        <YouTubePlayer
          videoUrl={url}
          onVideoUrlChange={(nextUrl) => handleVideoUrlChange(index, nextUrl)}
          onClose={() => handleRemovePlayerAtIndex(index)}
          {isPlayingAll}
        />
      </div>
    {/each}
  </div>
  <div class="player-array-buttons">
    <button class="red-button" onclick={handleAddPlayer}>Add YouTube Player</button>
    <button class="gradient-button" onclick={togglePlayAll}>
      {isPlayingAll ? 'Pause All' : 'Play All'}
    </button>
    <button onclick={handleRemoveAllPlayers} class="black-button">Remove All Players</button>
  </div>
</div>

<style>
  .player-array-container {
    margin: 20px;
  }

  .player-array-buttons {
    margin-bottom: 10px;
  }

  .player-array-players {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .player-array-player {
    display: flex;
    align-items: center;
    margin: 10px;
  }

  button {
    margin: 0 5px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    color: #ffffff;
    cursor: pointer;
    font: inherit;
    font-size: 16px;
    font-weight: 500;
    transition:
      background-color 0.3s ease,
      transform 0.3s ease;
  }

  button:hover {
    transform: scale(1.1);
  }

  button:active {
    transform: scale(0.95);
  }

  .red-button {
    background-color: #dc3545;
  }

  .red-button:hover {
    background-color: #c82333;
  }

  .gradient-button {
    background-image: linear-gradient(to right, #dc3545, #333333);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    text-decoration: none;
  }

  .black-button {
    background-color: #333333;
  }

  .black-button:hover {
    background-color: #555555;
  }
</style>
