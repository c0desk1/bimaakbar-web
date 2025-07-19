document.addEventListener('DOMContentLoaded', () => {
  const preElements: NodeListOf<HTMLElement> = document.querySelectorAll('.prose pre');

  preElements.forEach((pre: HTMLElement) => {
    const codeElement: HTMLElement | null = pre.querySelector('code');

    if (codeElement) {
      const lang: string = codeElement.classList[0].replace('language-', '');
      const header: HTMLDivElement = document.createElement('div');
      header.classList.add('pre-header');

      const langSpan: HTMLSpanElement = document.createElement('span');
      langSpan.textContent = `Bahasa: ${lang}`;
      header.appendChild(langSpan);

      const copyButton: HTMLButtonElement = document.createElement('button');
      copyButton.textContent = 'Salin';
      copyButton.onclick = () => {
        if (codeElement.textContent) {
          navigator.clipboard.writeText(codeElement.textContent);
        }
      };
      header.appendChild(copyButton);

      if (pre.parentNode) {
        pre.parentNode.insertBefore(header, pre);
      }
    }
  });
});
