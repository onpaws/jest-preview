import fs from 'fs';
import { getStyle } from './styled-components';

export function debug(element: Element = document.body): void {
  if (!fs.existsSync('./node_modules/.cache/jest-preview-dom')) {
    fs.mkdirSync('./node_modules/.cache/jest-preview-dom', {
      recursive: true,
    });
  }

  // If user use styled-components
  // TODO: We actually do not need to write the file, since it's already in `document.head`.
  // Just try to inject document.head, beside document.body and we can remove following code.
  if (getStyle) {
    // TODO: We can send this data via websocket instead of writing to disk
    fs.writeFileSync(
      './node_modules/.cache/jest-preview-dom/jp-styled-components.css',
      getStyle(),
      {
        encoding: 'utf-8',
        flag: 'w',
      },
    );
  }

  // TODO: To write header to header.html
  // To convert body to body.html
  // chokidar needs to watch both head and body
  // CSS Modules and sass should append css to head, instead of body

  fs.writeFileSync(
    './node_modules/.cache/jest-preview-dom/index.html',
    element.outerHTML,
    {
      encoding: 'utf-8',
      flag: 'w',
    },
  );
}
