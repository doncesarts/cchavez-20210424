import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
const Header = (props) => {
  return (
    <div data-testid="app-bar" >
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar component="nav" >
          <Typography
            variant="h5"
            color="inherit"
          >
            <strong>XBT/USDT Futures Book Order</strong>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
