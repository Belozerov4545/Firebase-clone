import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

import './CodeEditor.css';

function CodeEditor({ fileName, data, setData }) {
  const codes = {
    html: 'html',
    php: 'php',
    js: 'javascript',
    jsx: 'jsx',
    txt: 'txt',
    xml: 'xml',
    css: 'css',
    c: 'clike',
    cpp: 'clike',
    java: 'java',
    cs: 'clike',
    py: 'python',
    json: 'javascript',
  };

  const handleKeyDown = (evt) => {
    let value = content;
    const selStartPos = evt.currentTarget.selectionStart;
    if (evt.key === 'Tab') {
      value = `${value.substring(0, selStartPos)}   ${value.substring(selStartPos, value.length)}`;
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();

      setData(value);
    }
  };

  return (
    <div className="row-px-5 mt-3">
      <div className="col-md-12 mx-auto code-edit-container p3">
        <textarea
          className="code-input w-100"
          value={data}
        //   onKeyDown={handleKeyDown}
          onChange={(e) => setData(e.target.value)}
        />
        <pre className="code-output">
          <SyntaxHighlighter
            language={codes[fileName.split('.')[1]]}
            showInlineLineNumbers
            style={duotoneLight}
            wrapLines
            startingLineNumber={1}
          >
            {data}
          </SyntaxHighlighter>
        </pre>
      </div>
    </div>
  );
}

export default CodeEditor;
