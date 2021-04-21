import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { Mapping } from "./components/Mapping";
import theme from "./css/theme";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <Mapping></Mapping>
    </MuiThemeProvider>
  );
}

export default App;
