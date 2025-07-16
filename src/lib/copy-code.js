// src/scripts/copy-code.js
document.addEventListener('DOMContentLoaded', () => {
    const codeBlocks = document.querySelectorAll('.prose pre');
  
    codeBlocks.forEach(block => {

      const wrapper = document.createElement('div');
      wrapper.style.position = 'relative';
      block.parentNode.insertBefore(wrapper, block);
      wrapper.appendChild(block);

      const copyButton = document.createElement('button');
      copyButton.className = 'copy-code-button';
      copyButton.textContent = 'Copy';
      wrapper.appendChild(copyButton);
  
      copyButton.addEventListener('click', () => {
        const code = block.querySelector('code').innerText;
        navigator.clipboard.writeText(code).then(() => {
          copyButton.textContent = 'Copied!';
          setTimeout(() => {
            copyButton.textContent = 'Copy';
          }, 2000);
        });
      });
    });
  });