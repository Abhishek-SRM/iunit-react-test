import * as vscode from "vscode";
import { Tools } from "@halcyontech/vscode-ibmi-types/api/Tools";
import { CodeForIBMi } from "@halcyontech/vscode-ibmi-types";
import { TestCasePanel } from "./webview/testCasePanel";
import { stringify } from "querystring";


const ext = vscode.extensions.getExtension<CodeForIBMi>(
  "halcyontechltd.code-for-ibmi"
);

let results: Tools.DB2Row[];
let statement: string;
export class ObjectExplorer {
  private readonly _emitter: vscode.EventEmitter<RepositoryExplorer | undefined | null | void>;
  readonly onDidChangeTreeData: vscode.Event< RepositoryExplorer | undefined | null | void>;

  constructor(context: vscode.ExtensionContext) {
    this._emitter = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._emitter.event;
    this.refresh();
    vscode.commands.registerCommand(`iunit.getTestcases`, (item) => this.getTestCases(item, context));
    vscode.commands.registerCommand(`iunit.refreshRepository`, () => { this.refresh(); });
  }

  async getTestCases(item: vscode.TreeItem, context: vscode.ExtensionContext,) {
    if (ext?.exports.instance.connection) {
      statement = `select RPO_IREPID from arcad_iun.aarirpof1 where rpo_crepnm = 'AbhiRepo'`;
      const content = ext?.exports.instance.getContent();
      if (statement && content) {
        const repid = await content.runSQL(statement);
        statement = `Select UTC_CTCD,UTC_JOBJ,UTC_CTYPE,UTC_CPRCNM,UTC_TCRTT , (SELECT COUNT(UTR_ITCID) FROM arcad_iun.AARIUTRF1 WHERE UTR_IREPID= ${repid[0].RPO_IREPID} AND UTR_ITCID = UTC_ITCID AND UTR_CPF <> 'B') AS RESULT_COUNT  from arcad_iun.aariutcf1 where utc_irepid = '${repid[0].RPO_IREPID}'`;
        if (statement) {
          results = await content.runSQL(statement);
        }
        if (results.length === 0) {
          vscode.window.showErrorMessage("No Test Cases Found");
        } else {
          console.log(JSON.stringify(results));
          TestCasePanel.render(context.extensionUri, results, String(item.label)
          );
        }
      }
    } else {
      vscode.window.showErrorMessage("Connection Error");
    }
  }

  refresh() {
    this._emitter.fire(null);
  }

  getTreeItem(element: RepositoryExplorer): vscode.TreeItem {
    return element;
  }
  async getChildren(element?: RepositoryExplorer): Promise<RepositoryExplorer[] | undefined> {
    if (element === undefined) {
      return [new ServerItem(vscode.TreeItemCollapsibleState.Collapsed)];
    }
    if (element.contextValue === "server-item") {
      if (ext?.isActive && ext.exports.instance.connection) {
        statement = "select RPO_CREPNM from Arcad_iun.aarirpof1";
        const content = ext?.exports.instance.getContent();
        if (statement && content) {
          results = await content.runSQL(statement);
        }
        return results.map(
          (result) =>
            new RepositoryItem(
              String(result.RPO_CREPNM),
              vscode.TreeItemCollapsibleState.Collapsed
            )
        );
      }
    } else if (element.contextValue === "iunittest-item") {
      return [
        new TestCases(vscode.TreeItemCollapsibleState.None),
        new TestSuits(vscode.TreeItemCollapsibleState.None),
      ];
    } else {
      return [
        new Objects(vscode.TreeItemCollapsibleState.None),
        new Sources(vscode.TreeItemCollapsibleState.None),
        new IunitTests(vscode.TreeItemCollapsibleState.Collapsed),
      ];
    }
    vscode.window.showErrorMessage(
      "Please Connect to the iUnit Server and Refresh"
    );
  }
  getParent(element: RepositoryExplorer): vscode.TreeItem {
    return element;
  }

}

export class RepositoryExplorer extends vscode.TreeItem {
  constructor(
    public label?: string,
    public readonly collapsibleState?: vscode.TreeItemCollapsibleState
  ) {
    super(label || "", collapsibleState);
  }
}

class ServerItem extends RepositoryExplorer {
  constructor(
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    const startIconThemeColor = new vscode.ThemeColor(
      "debugIcon.startForeground"
    );
    super("Server", collapsibleState);
    this.contextValue = "server-item";
    this.iconPath =  new vscode.ThemeIcon('server');
  }
}
class Objects extends RepositoryExplorer {
  constructor(
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super("Objects", collapsibleState);
    this.contextValue = "object-item";
    this.iconPath = new vscode.ThemeIcon("bracket-dot");
  }
}
class Sources extends RepositoryExplorer {
  constructor(
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super("Sources", collapsibleState);
    this.contextValue = "sources-item";
    this.iconPath = new vscode.ThemeIcon("file-binary");
  }
}
class IunitTests extends RepositoryExplorer {
  constructor(
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super("iUnit Tests", collapsibleState);
    this.contextValue = "iunittest-item";
    this.iconPath = new vscode.ThemeIcon("beaker");
  }
}
class TestCases extends RepositoryExplorer {
  constructor(
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super("Test Cases", collapsibleState);
    this.contextValue = "iunit-testcases";
    this.iconPath = new vscode.ThemeIcon("symbol-method");
  }
}
class TestSuits extends RepositoryExplorer {
  constructor(
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super("Test Suits", collapsibleState);
    this.contextValue = "iunittest-testsuits";
    this.iconPath = new vscode.ThemeIcon("package");
  }
}

class RepositoryItem extends RepositoryExplorer {
  constructor(
    readonly name: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(name, collapsibleState);
    const startIconThemeColor = new vscode.ThemeColor("button.foreground");
    this.contextValue = "command-gettestcase";
    this.iconPath =  new vscode.ThemeIcon('database');
    this.command = {
      command: `iunit.gettestcases`,
      title: `Test Cases`,
    };
  }
}
