<script>
  import { extractVideoId, isValidUrl } from './YouTubePlayerUtils';
  import './YouTubePlayer.css';

  let {
    videoUrl = '',
    onVideoUrlChange,
    onClose,
    isPlayingAll = false,
  } = $props();

  let videoLink = $state('');
  let player = $state(null);
  let isPlaying = $state(false);
  let playerElement = $state();
  let lastLoadedUrl = $state('');
  let lastPlayAllValue = $state();

  const ensureYouTubeApi = () =>
    new Promise((resolve) => {
      if (window.YT?.Player) {
        resolve(window.YT);
        return;
      }

      const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }

      const previousReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previousReady?.();
        resolve(window.YT);
      };
    });

  const closePlayer = () => {
    if (player) {
      player.destroy();
      player = null;
    }
  };

  const loadPlayer = async (videoId) => {
    if (!playerElement) return;

    await ensureYouTubeApi();
    closePlayer();

    player = new window.YT.Player(playerElement, {
      height: '240',
      width: '426',
      videoId,
      events: {
        onStateChange: (event) => {
          isPlaying = event.data === window.YT.PlayerState.PLAYING;
        },
      },
    });
  };

  const handleEnterClick = () => {
    if (!videoLink || !isValidUrl(videoLink)) return;

    const videoId = extractVideoId(videoLink);
    if (!videoId) return;

    onVideoUrlChange?.(videoLink);
    lastLoadedUrl = videoLink;
    loadPlayer(videoId);
  };

  const handleCloseClick = () => {
    videoLink = '';
    lastLoadedUrl = '';
    onVideoUrlChange?.('');
    isPlaying = false;
    closePlayer();
  };

  const handleRemovePlayer = () => {
    handleCloseClick();
    onClose?.();
  };

  const handleButtonClick = () => {
    player ? handleCloseClick() : handleRemovePlayer();
  };

  const togglePlay = () => {
    if (!player?.pauseVideo || !player?.playVideo) return;

    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    isPlaying = !isPlaying;
  };

  $effect(() => {
    if (!videoUrl || !isValidUrl(videoUrl) || videoUrl === lastLoadedUrl) return;

    const videoId = extractVideoId(videoUrl);
    if (!videoId) return;

    videoLink = videoUrl;
    lastLoadedUrl = videoUrl;
    loadPlayer(videoId);
  });

  $effect(() => {
    if (lastPlayAllValue === undefined) {
      lastPlayAllValue = isPlayingAll;
      return;
    }

    if (isPlayingAll === lastPlayAllValue) return;

    lastPlayAllValue = isPlayingAll;
    if (isPlayingAll !== isPlaying) {
      togglePlay();
    }
  });

  $effect(() => {
    return () => {
      closePlayer();
    };
  });
</script>

<div class="youtube-player-container">
  <div class="youtube-player-row">
    <input
      type="text"
      bind:value={videoLink}
      placeholder="Enter YouTube link"
      class="youtube-player-input"
    />
    <button onclick={handleEnterClick} class="red-button">View</button>
    <button onclick={handleButtonClick} class="black-button" id="button-close">
      {player ? 'Clear' : 'Close'}
    </button>
  </div>
  <div class:hidden={!player} class="youtube-player-video-wrapper">
    <div bind:this={playerElement}></div>
  </div>
</div>
