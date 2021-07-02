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
import ContextSanPham from './../context/sanpham/Sanphamcontext'
import {  Modal ,Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@material-ui/core/TextField';
import  {NavLink} from 'react-router-dom'
import  { Select ,NativeSelect } from '@material-ui/core';
import ContextHang from './../context/Hang/HangCtext'
import './listsanpham.css'
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

export default function StickyHeadTable() {
  const classes = useStyles();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [page, setPage] = React.useState(0);
  
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const contexthang = useContext(ContextHang)
  const [show, setShow] = useState(false);
   
  const [id ,setid] = useState(null);
  const handleClose = () => setShow(false);
  const [hang ,sethang ]  = useState(false)

  const [message , setmessage] = useState(false)

  const context = useContext(ContextSanPham)

  const { listsanpham ,errors , listdata ,deletadata ,successs , clearmessage  } =context
  const {  listHang  ,listdatahang } =  contexthang

  const handleChangevalue = (event) => {
    const id = event.target.value;
    sethang({ id })
    
   
  }
  
  useEffect(() => {

    listsanpham();
    listHang()
  
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

  const deleteDataSanPham= async() =>{
    await deletadata(id)
    setShow(false);
    setmessage(!message)

  }
   
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

  if (listdata === undefined) return  ( <h3 className="no-guest">Data .....</h3>)
  
  return (
    <>
    <ToastContainer
position="top-right"
autoClose={1000}
closeOnClick/>
      <TrangchuAdmin/>
     
      <Grid container >
      <Grid item lg={3}/> 
     
      <Grid item lg={6}> 
      <form className="Search" noValidate autoComplete="off">  
      <TextField id="standard-basic" label="Tìm kiếm tên sản phẩm" />
 
  
    
     <NativeSelect
          onChange={handleChangevalue}
          name="idhang"
          className="selecthang"
        >
          {
            listdatahang.map(e=>(
              <option value={e._id} key ={e._id}>{e.hangsp }</option>
            ))
          }
         
        
        </NativeSelect>

        <Button className="buttonsearch" >Tìm kiếm</Button>

        </form>
<br />
        </Grid>

<Grid item lg={3}/> 


            <Grid item lg={1}/>
            <Grid item lg={10}>
             
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
      <TableHead>
          <TableRow>
            <TableCell style={{minWidth:"200px"}}>STT</TableCell>
            <TableCell style={{minWidth:"200px"}} >Tên sản phẩm </TableCell>
            <TableCell style={{minWidth:"200px"}}>Giá </TableCell>
            <TableCell style={{minWidth:"200px"}} >Ảnh sản phẩm chính</TableCell>
            
            <TableCell style={{minWidth:"200px"}} >Xóa</TableCell>
            <TableCell style={{minWidth:"200px"}} >Sửa</TableCell>
         
          </TableRow>
        </TableHead>
        <TableBody>
        {listdata
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
       
            <TableRow key={row._id}>
              <TableCell>{index}</TableCell>
              <TableCell>{row.tensanpham}</TableCell>
              <TableCell>{row.giaban}</TableCell>
              <TableCell><img src={"http://localhost:8000/images/"+row.anhsanphamchinh} alt="" className={classes.imganh}/></TableCell>
              <TableCell><Button variant="contained" variant="primary" onClick={()=>handleShow(row._id)} >
              Xóa
</Button>
              </TableCell>
              <TableCell>
              <NavLink
  to={`/suasanpham/${row._id}`}
  activeStyle={{
    fontWeight: "bold",
    color: "red"
  }}
><Button variant="contained" variant="primary" >
Sửa
</Button>
</NavLink>

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
          <Button variant="primary" onClick={deleteDataSanPham}>Đồng ý</Button>
        </Modal.Footer>
      </Modal>
   

   
     
        


    </>
  );
}
