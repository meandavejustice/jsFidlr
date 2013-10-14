chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval);

      var zip = new JSZip();

      var html = document.querySelector('#panel_html textarea').textContent;
      var jscript = document.querySelector('#panel_js textarea').textContent;
      var csscss = document.querySelector('#panel_css textarea').textContent;

      var head = createHead(html);
      var body = createBody(html);

      function createHead(html) {
        var beginIndex = html.indexOf('<head>');
        var endIndex = html.indexOf('</head>');
        var head = document.createElement('head');
        head.innerHTML = html.slice(beginIndex + 7, endIndex);
        return head;
      }

      function createBody(html) {
        var beginIndex = html.indexOf('<body>');
        var endIndex = html.indexOf('</body>');
        var body = document.createElement('body');
        body.innerHTML = html.slice(beginIndex + 7, endIndex);
        return body;
      }

      function createScript() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'scripts/index.js';
        return script;
      }

      function createStyle() {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = "styles/style.css";
        return link;
      }

      function prepareHtml(head) {
        return '<!DOCTYPE html>' + '<html>' + head.outerHTML + body.outerHTML + '</html>';
      }

      // prepare html
      var sTag = createScript();
      body.appendChild(sTag);

      var cssTag = createStyle();
      head.appendChild(cssTag);

      // prepare zip
      var jsFid = zip.folder('jsFidlr');
      jsFid.file('index.html', prepareHtml(head));

      var scriptin = jsFid.folder('scripts');
      scriptin.file('index.js', jscript);

      var stylin = jsFid.folder('styles');
      stylin.file('style.css', csscss);

      jsFid = jsFid.generate();

      location.href='data:application/zip;base64,'+jsFid;
    }
  }, 10);
});