import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from 'react-i18next';

/**
 *  The header displays a app bar 
 * @author christopher chavez
 */
const Header = () => {
  const { t } = useTranslation();
  return (
    <div data-testid="app-bar">
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar component="nav">
          <Typography variant="h5" color="inherit">
            <strong>{t('Header_Title')}</strong>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
