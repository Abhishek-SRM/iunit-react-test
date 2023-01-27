import * as React from "react";
import { messageHandler } from "@estruyf/vscode/dist/client";
import "./styles.css";
import BasicTable from "./Components/BasicTable";
import BasicModal from "./Components/Modal";
import {
  AppBar,
  Toolbar,
  ThemeProvider,
} from "@mui/material";
import navbar from "./Components/Navbar";

// eslint-disable-next-line @typescript-eslint/naming-convention
const data = [
  {
    UTC_CTCD: "TEST01_*MAIN",
    UTC_JOBJ: "ADDNUM",
    UTC_CTYPE: "*PGM",
    UTC_CPRCNM: "*MAIN",
    UTC_TCRTT: "2022-12-19-14.35.42.000289",
    RESULT_COUNT: 0,
  },
  {
    UTC_CTCD: "T1_PRC_M",
    UTC_JOBJ: "SR1",
    UTC_CTYPE: "*SRVPGM",
    UTC_CPRCNM: "PRC_M",
    UTC_TCRTT: "2023-01-27-14.27.21.000280",
    RESULT_COUNT: 0,
  },
  {
    UTC_CTCD: "T1_PRC_D",
    UTC_JOBJ: "SR1",
    UTC_CTYPE: "*SRVPGM",
    UTC_CPRCNM: "PRC_D",
    UTC_TCRTT: "2023-01-27-14.27.24.000204",
    RESULT_COUNT: 0,
  },
  {
    UTC_CTCD: "T3_*MAIN",
    UTC_JOBJ: "IUNTST05",
    UTC_CTYPE: "*PGM",
    UTC_CPRCNM: "*MAIN",
    UTC_TCRTT: "2023-01-27-14.27.51.000394",
    RESULT_COUNT: 0,
  },
  {
    UTC_CTCD: "t5_MOD1",
    UTC_JOBJ: "SRVC1",
    UTC_CTYPE: "*SRVPGM",
    UTC_CPRCNM: "MOD1",
    UTC_TCRTT: "2023-01-27-14.28.39.000700",
    RESULT_COUNT: 0,
  },
  {
    UTC_CTCD: "t5_PRC_ADD",
    UTC_JOBJ: "SRVC1",
    UTC_CTYPE: "*SRVPGM",
    UTC_CPRCNM: "PRC_ADD",
    UTC_TCRTT: "2023-01-27-14.28.41.000991",
    RESULT_COUNT: 0,
  },
  {
    UTC_CTCD: "t5_PRC_MUL",
    UTC_JOBJ: "SRVC1",
    UTC_CTYPE: "*SRVPGM",
    UTC_CPRCNM: "PRC_MUL",
    UTC_TCRTT: "2023-01-27-14.28.44.000799",
    RESULT_COUNT: 0,
  },
  {
    UTC_CTCD: "t4_PRC_M",
    UTC_JOBJ: "S2",
    UTC_CTYPE: "*SRVPGM",
    UTC_CPRCNM: "PRC_M",
    UTC_TCRTT: "2023-01-27-14.29.12.000906",
    RESULT_COUNT: 0,
  },
  {
    UTC_CTCD: "t4_PRC_D",
    UTC_JOBJ: "S2",
    UTC_CTYPE: "*SRVPGM",
    UTC_CPRCNM: "PRC_D",
    UTC_TCRTT: "2023-01-27-14.29.15.000698",
    RESULT_COUNT: 0,
  },
];
export interface IAppProps {}

export const App: React.FunctionComponent<
  IAppProps
> = ({}: React.PropsWithChildren<IAppProps>) => {
  const [message, setMessage] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const sendMessage = () => {
    messageHandler.send("POST_DATA", { msg: "Hello from the webview" });
  };

  const requestData = () => {
    messageHandler.request<string>("GET_DATA").then((msg) => {
      setMessage(msg);
    });
  };

  const requestWithErrorData = () => {
    messageHandler
      .request<string>("GET_DATA_ERROR")
      .then((msg) => {
        setMessage(msg);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <div className="app">
      Navmjgkjgkghkghi
      <AppBar position="static" color="primary">
        <Toolbar variant="dense">
          <BasicModal></BasicModal>
        </Toolbar>
      </AppBar>
      <BasicTable></BasicTable>
    </div>
  );
};
