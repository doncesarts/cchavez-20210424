import React from 'react';
import { makeStyles , withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
});


const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const OrderBookTable = (props) => {

  const classes = useStyles();

  const { title, orders, variant } = props;
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
      color: variant==="bid" ? theme.palette.success.main: theme.palette.error.main,
    },
  }))(TableCell);

  return (
    <TableContainer component={Paper}>
      <div>{title}</div>
      <Table className={classes.table} size="small" aria-label={title}
         data-testid={`table-${title}`}
      >
      <TableHead>
          <StyledTableRow>
            <StyledTableCell align="left">PRICE</StyledTableCell>
            <StyledTableCell align="left">SIZE</StyledTableCell>
            <StyledTableCell align="left">TOTAL</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {orders.map(([price, size, total]) => (
            <StyledTableRow key={price}>
              <StyledTableCell component="th" scope="row">
                {price}
              </StyledTableCell>
              <StyledTableCell align="left">{size}</StyledTableCell>
              <StyledTableCell align="left">{total}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>        
 
  );
};
export default OrderBookTable;
