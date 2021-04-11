import { MuiThemeProvider } from "@material-ui/core";
import theme from "./css/theme";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
    </MuiThemeProvider>
  );
}

export default App;
