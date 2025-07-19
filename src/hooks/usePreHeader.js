document.addEventListener('DOMContentLoaded', function () {
  const preElements = document.querySelectorAll('.prose pre');
  preElements.forEach((pre) => {
    const code = pre.querySelector('code');
    if (code) {
      const language = code.className.match(/language-(\w+)/);
      if (language) {
        const preHeader = document.createElement('div');
        preHeader.className = 'pre-header';
        const languageText = document.createElement('span');
        languageText.textContent = language[1].toUpperCase();
        preHeader.appendChild(languageText);
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        const copyIcon = document.createElement('i');
        copyIcon.className = 'ri-file-copy-line';
        copyButton.appendChild(copyIcon);
        preHeader.appendChild(copyButton);
        pre.insertBefore(preHeader, code);

        copyButton.addEventListener('click', function () {
          navigator.clipboard.writeText(code.textContent).then(function () {
            copyIcon.className = 'ri-check-line';
            setTimeout(function () {
              copyIcon.className = 'ri-file-copy-line';
            }, 2000);
          });
        });
      }
    }
  });
});