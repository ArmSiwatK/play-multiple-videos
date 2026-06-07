<script>
  import YouTubePlayer from '../YouTubePlayer/YouTubePlayer.svelte';
  import './PlayerArray.css';

  let { videoUrl = '' } = $props();
  let videoUrls = $state(['', '']);
  let isPlayingAll = $state(false);
  let previousVideoUrl = $state('');

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
    if (!videoUrl || videoUrl === previousVideoUrl) return;

    const emptyIndex = videoUrls.findIndex((url) => url === '');
    if (emptyIndex !== -1) {
      videoUrls = videoUrls.map((currentUrl, index) => (index === emptyIndex ? videoUrl : currentUrl));
    }

    previousVideoUrl = videoUrl;
  });

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
    <button class="gradient-button" id="play-pause-button" onclick={togglePlayAll}>
      {isPlayingAll ? 'Pause All' : 'Play All'}
    </button>
    <button onclick={handleRemoveAllPlayers} class="black-button">Remove All Players</button>
  </div>
</div>
