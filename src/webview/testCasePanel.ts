import * as vscode from "vscode";
import { getUri } from "../utilities/getUri";
import { CodeForIBMi } from "@halcyontech/vscode-ibmi-types";
import { Tools } from "@halcyontech/vscode-ibmi-types/api/Tools";

const ext = vscode.extensions.getExtension<CodeForIBMi>(
  "halcyontechltd.code-for-ibmi"
);

export class TestCasePanel {
  public static currentPanel: TestCasePanel | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];
  public testcases: Tools.DB2Row[];
  

  private constructor(
    panel: vscode.WebviewPanel,
    extensionUri: vscode.Uri,
    testcase: Tools.DB2Row[]
  ) {
    this.testcases = testcase;
    this._panel = panel;
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    this._panel.webview.html = this._getWebviewContent(
      this._panel.webview,
      extensionUri,
      this.testcases
    );
  }

  public static render(
    extensionUri: vscode.Uri,
    testcase: Tools.DB2Row[],
    item: string
  ) {
    const panel = vscode.window.createWebviewPanel(
      "testCasesPanel",
      `TestCase_${item}`,
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
      }
    );

    TestCasePanel.currentPanel = new TestCasePanel(
      panel,
      extensionUri,
      testcase
    );
  }

  public dispose() {
    TestCasePanel.currentPanel = undefined;

    this._panel.dispose();

    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  private _getWebviewContent(
    webview: vscode.Webview,
    extensionUri: vscode.Uri,
    testCase: Tools.DB2Row[]
  ) {
    const toolkitUri = getUri(webview, extensionUri, [
      "node_modules",
      "@vscode",
      "webview-ui-toolkit",
      "dist",
      "toolkit.js",
    ]);
    const mainUri = getUri(webview, extensionUri, [
      "src",
      "webview-ui",
      "main.js",
    ]);
    return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="module" src="${toolkitUri}"></script>
        <script type="module" src="${mainUri}"></script>
        <style>
              html,
    body {
      width: 100%;
      height: 100%;
      font-family: "Open Sans", sans-serif;
      padding: 0;
      margin: 0;
    }

    #context-menu {
      position: fixed;
      z-index: 10000;
      width: 150px;
      background: #1b1a1a;
      border-radius: 5px;
      transform: scale(0);
      transform-origin: top left;
    }

    #context-menu.visible {
      transform: scale(1);
      transition: transform 200ms ease-in-out;
    }

    #context-menu .item {
      padding: 8px 10px;
      font-size: 15px;
      color: #eee;
      cursor: pointer;
      border-radius: inherit;
    }

    #context-menu .item:hover {
      background: #343434;
    }
        </style>
      </head>
      <body>
      <vscode-data-grid id="basic-grid" grid-template-columns="15% 15% 15% 15% 15% 15%" aria-label="With Custom Column Widths"></vscode-data-grid>
      <div id="context-menu">
      <div class="item" id = "" onClick="testFunction()">Edit</div>
      <div class="item" id = "">Copy</div>
      <div class="item" id = "">Delete</div>
      <div class="item" id = "">Create Expected Result</div>
      <div class="item" id = "">Execute</div>
    </div>
      </body>
       <script>
         document.getElementById('basic-grid').rowsData = ${JSON.stringify(testCase)};
         document.getElementById('basic-grid').columnDefinitions = [
           {title: 'Test Case Name', columnDataKey: 'UTC_CTCD'},
           {title: 'Object Name', columnDataKey: 'UTC_JOBJ'},
           {title: 'Object Type', columnDataKey: 'UTC_CTYPE'},
           {title: 'Procedure Name', columnDataKey: 'UTC_CPRCNM'},
           {title: 'Base Result Execution Date', columnDataKey: 'UTC_TCRTT'},
           {title: 'Result Count', columnDataKey: 'RESULT_COUNT'}];
       </script>
    </html>
    `;
  }
}
