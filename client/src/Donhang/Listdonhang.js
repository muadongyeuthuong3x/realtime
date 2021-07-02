
import React  , { useContext  ,useEffect ,useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import   TrangchuAdmin from './../DasboardAdmin/Trangchuadmin'
import Grid from '@material-ui/core/Grid';
import ContextGiohang from './../context/Giohang/Giohangcontext'
import {  Modal ,Button , Table} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  imganh:{
      width:"200px",
      maxHeight:"200px"
  }
});

export default function Listdonhang() {
  const classes = useStyles();
 
  const [page, setPage] = React.useState(0);
  
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [show, setShow] = useState(false);
   
  const [id ,setid] = useState(null);

  const handleClose = () => setShow(false);


  const [message , setmessage] = useState(false)

  const context = useContext(ContextGiohang)

  const { listdonhang ,errors , successs , clearmessage  ,listdata } =context
  
  const [sp ,setsp ] =useState([false])

   const Getidmua = (id)=>{
    const datashow = listdata.filter(e=>e._id === id)
    setsp(datashow[0].cart)
    setShow(true)
   }
  
  useEffect(() => {

    listdonhang();
   
  
  }, []);
  
  useEffect(() => {

    clearmessage()

    if(errors !=null){
      return  toast.error(errors)
     }
    if(successs !=null){ 
 
     return  toast.success(successs)
 
     }
  
  }, [message]);


  const handleShow = (iddelete)=>{
      setid(iddelete)
      setShow(true)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
 

  console.log(sp )

  if (listdata === undefined ) return  ( <h3 className="no-guest">Data .....</h3>)

 
 
  return (
    <>
    <ToastContainer
position="top-right"
autoClose={1000}
closeOnClick/>
      <TrangchuAdmin/>
      <Grid container spacing={3}>
            
            <Grid item lg={1}/>
            <Grid item xs={10}>
             
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
      <TableHead>
          <TableRow>
            <TableCell style={{minWidth:"200px"}}>STT</TableCell>
            <TableCell style={{minWidth:"200px"}} >Tên người mua  </TableCell>
            <TableCell style={{minWidth:"200px"}}>Địa chỉ  </TableCell>
            <TableCell style={{minWidth:"200px"}} > Số điện thoại </TableCell>
            
            <TableCell style={{minWidth:"200px"}} >Xem thông tin hàng</TableCell>
        
         
          </TableRow>
        </TableHead>
        <TableBody>
        {listdata
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
       
            <TableRow key={row._id}>
              <TableCell>{index}</TableCell>
              <TableCell>{row.nguoimua}</TableCell>
              <TableCell>{row.sdt}</TableCell>
              <TableCell>{row.diachi}</TableCell>
    
              <TableCell>
            
<Button variant="contained" variant="primary" onClick = {() =>Getidmua(row._id)}>
Xem thông tin mua
</Button>


</TableCell>
            </TableRow>
           


          ))}
        </TableBody>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={listdata.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
       </Grid>
    </Grid>
    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin sản phẩm mua </Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>STT</th>
      <th>Tên sản phẩm</th>
      <th>Số lượng</th>
      <th> Giá </th>
      <th> Thành tiền  </th>
    </tr>
  </thead>
  <tbody>
    { sp.length  !== false &&  sp.map((e,index)=>(
       <tr>
       <td>{index}</td>
       <td>{e.tensanpham}</td>
       <td>{e.soluong}</td>
       <td>{e.giaban}</td>
       <td>{e.tongtien}</td>
     </tr>
  
    ))}
   
  
 
  </tbody>
</Table>
       
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"  >
           Xin hóa đơn 
          </Button>
        </Modal.Footer>
      </Modal>


   
     
        


    </>
  );
}
