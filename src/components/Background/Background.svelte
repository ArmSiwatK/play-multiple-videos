<div class="background">
  <div class="gradient"></div>
</div>

<style>
  .background {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    background: linear-gradient(to bottom, #cccccc, #eeeeee, #cccccc, #eeeeee, #cccccc);
    animation: gradientAnimation 10s linear infinite;
  }

  @keyframes gradientAnimation {
    0% {
      transform: translateY(0%);
    }

    100% {
      transform: translateY(-50%);
    }
  }
</style>
