
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
const theme = responsiveFontSizes(createTheme({
  typography: {
   "fontFamily": `"Outfit", "Roboto", "Helvetica", "Arial", sans-serif`,
   "fontSize": 14,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500
  }
}));

export default theme