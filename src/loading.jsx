function Loading() {
  return (
    <div>
      <style scoped>
        {`
      body {
        margin: 0;
        padding: 0;
        overflow: hidden;
      }

      .loading-container {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .loading {
        position: relative;
        width: 128px;
        height: 128px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 4px solid #6f6af8;
        box-shadow: 0 6px 12px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }

      .loading::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #6f6af8;
        opacity: 0.6;
      }

      .logo {
        position: absolute;
        width: 60%;
        height: 60%;
        padding: 0;
        z-index: 10;
      }

      .loading-title {
        margin-top: 2em;
        font-size: 20px;
        font-weight: bold;
        font-family: system-ui, -apple-system, emoji;
      }`}
      </style>
      <div className="loading-container">
        <div className="loading">
          <img className="logo" src="/logo.png" alt="logo" />
        </div>
        <div className="loading-title">Wowon Admin Pro</div>
      </div>
    </div>
  );
}

export default Loading;
