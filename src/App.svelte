<script>
  import Background from './components/Background/Background.svelte';
  import Instructions from './components/Instructions/Instructions.svelte';
  import PlayerArray from './components/PlayerArray/PlayerArray.svelte';
  import YouTubeSearch from './components/YouTubeSearch/YouTubeSearch.svelte';
  import './styles/App.css';

  let videoUrl = $state('');

  const handleVideoUrlCopy = (url) => {
    videoUrl = url;
  };
</script>

<Background />
<YouTubeSearch onVideoUrlCopy={handleVideoUrlCopy} />
<PlayerArray {videoUrl} />
<Instructions />
<a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
  <button class="gradient-button" id="youtube-link-button">Go to YouTube</button>
</a>
