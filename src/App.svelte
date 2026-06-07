<script>
  import Background from './components/Background/Background.svelte';
  import Instructions from './components/Instructions/Instructions.svelte';
  import PlayerArray from './components/PlayerArray/PlayerArray.svelte';
</script>

<Background />
<main>
  <PlayerArray />
  <Instructions />
  <a class="youtube-link" href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
    <button class="youtube-link-button">Go to YouTube</button>
  </a>
</main>

<style>
  main {
    margin: 0 auto;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
  }

  .youtube-link {
    font-weight: 500;
    text-decoration: inherit;
  }

  .youtube-link-button {
    display: block;
    width: 200px;
    height: 60px;
    margin: 0 auto 40px;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background-image: linear-gradient(to right, #dc3545, #333333);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    color: #ffffff;
    cursor: pointer;
    font: inherit;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    text-decoration: none;
    transition: transform 0.3s ease;
  }

  .youtube-link-button:hover {
    transform: scale(1.1);
  }

  .youtube-link-button:active {
    transform: scale(0.95);
  }
</style>
