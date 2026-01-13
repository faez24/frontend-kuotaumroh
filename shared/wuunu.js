/**
 * Wuunu Widget Loader
 *
 * This script automatically loads the Wuunu widget on all pages.
 * Include this file before </body> tag: <script src="shared/wuunu.js"></script>
 */

(function() {
  // Set Wuunu WebSocket connection
  window.__WUUNU_WS__ = "http://127.0.0.1:49275/?token=fd2593a903940808c14fe666980a4d1b36163c154479be92";

  // Load Wuunu widget script
  const script = document.createElement('script');
  script.id = 'wuunu-widget-script';
  script.setAttribute('data-wuunu-widget', '');
  script.src = 'https://cdn.jsdelivr.net/npm/@wuunu/widget@0.1';
  script.defer = true;
  script.crossOrigin = 'anonymous';

  // Append to document
  document.body.appendChild(script);
})();
