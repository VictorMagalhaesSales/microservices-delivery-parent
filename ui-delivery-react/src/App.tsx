import { MuiThemeProvider } from "@material-ui/core";
import { Mapping } from "./components/Mapping";
import theme from "./css/theme";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Mapping></Mapping>
    </MuiThemeProvider>
  );
}

export default App;
