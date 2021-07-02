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
import ContextHang from './../context/Hang/HangCtext'
import {  Modal ,Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function ListHang() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [id, setid] = useState(false);
   
  const [value1 , setValue] = useState({
    hang:null
  })
  const handleClose = () => setShow(false);

  const  handleClose1 = () => setShow1(false);

  const handleShow = (event) =>{
    setShow(true);
    setid(event)
  } 


  
  const [message , setmessage] = useState(false)

  const context = useContext(ContextHang)

  const { listHang ,errors , listdatahang ,deletadata ,successs , clearmessage ,editHang , dataedit ,updateHang } =context
  
  const handleShow1 =async (event) =>{
    setShow1(true);

    await editHang(event)
    setid(event)
  
 
  } 

  
  const OnChangeValue1 =(event)=>{
   
    setValue( {hang:event.target.value });
   }

 

  const updatehangsp = async() =>{
    await updateHang(id,value1)
    setShow1(false)
  }

  
  useEffect(() => {
    listHang();
  
  }, []);
  
  useEffect(() => {

    clearmessage()

    if(errors !=null){
      return  toast.error(errors)
     }
    if(successs !=null){ 
 
     return  toast.success(successs)
 
     }
  
  }, [message , show1]);

  const deleteDataHang = async() =>{
    await deletadata(id)
    setShow(false);
    setmessage(!message)

  }
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (listdatahang === undefined) return  ( <h3 className="no-guest">Data .....</h3>)
  
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
            <TableCell style={{minWidth:"200px"}} >Name</TableCell>
            <TableCell style={{minWidth:"200px"}}>Xóa</TableCell>
            <TableCell style={{minWidth:"200px"}} >Sửa</TableCell>
         
          </TableRow>
        </TableHead>
        <TableBody>
        {listdatahang
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
       
            <TableRow key={row._id}>
              <TableCell>{index}</TableCell>
              <TableCell>{row.hangsp}</TableCell>
              <TableCell><Button variant="contained" variant="primary" onClick={()=>handleShow(row._id)} >
              Xóa
</Button>
              </TableCell>
              <TableCell><Button variant="contained" variant="primary" onClick={()=>handleShow1(row._id)}>
  Sửa
</Button></TableCell>
            </TableRow>
           


          ))}
        </TableBody>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={listdatahang.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
       </Grid>
    </Grid>
  

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xóa Hãng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Bạn chắc chắn xóa chứ ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteDataHang}>Đồng ý</Button>
        </Modal.Footer>
      </Modal>
   

   
      <Modal
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sửa Hãng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <TextField
          id="standard-textarea"
          label="Sửa hãng sản phẩm"
          placeholder="Placeholder"
          value={ value1.hang !=null? value1.hang : dataedit}
          type="text"
          name="hang"
          onChange={OnChangeValue1}
        />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={updatehangsp}>Đồng ý</Button>
        </Modal.Footer>
      </Modal>



    </>
  );
}
