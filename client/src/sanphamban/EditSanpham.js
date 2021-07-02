
import React ,{useState , useContext , useEffect} from 'react';
import   TrangchuAdmin from './../DasboardAdmin/Trangchuadmin'
import { Button, Grid } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {DropzoneArea} from 'material-ui-dropzone'
import ContextSanpham from './../context/sanpham/Sanphamcontext'
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    boottom:{
        marginBottom:"100px"
    },
    imghien:{
      minWidth:"200px",
       height:"200px",
       background:"red"
    }
  }));
  
function Editsanphams() {
  
    const classes = useStyles();
  
    const [sanpham ,setsanpham] = useState({
      tensp:null,
      gia:null
    })
      
    const context = useContext(ContextSanpham)
    const { id } = useParams();
    
  const { editsp ,errors , successs  ,editsanpham , clearmessage} =context
  
    const [filesuploads ,setfilesupload] = useState([null])
    const [imghien,setimghien] = useState(null)
    const [imgsave,setimgsave] = useState(null)
    const [message,setmessage] = useState(false)
   const  handleChange = (files) =>{
     
        setfilesupload({files:files})
      }
       
     const previewimg  = (event)=>{
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload = () =>{
        if(reader.readyState === 2){
          const linkimg = reader.result
          setimghien(linkimg)
          setimgsave(event.target.files[0])
        }
      }
    
     }
   
      useEffect(()=>{
     
        editsanpham(id)
      },[])
       
     useEffect(()=>{

      clearmessage()
  
      if(errors !=null){
         return  toast.error(errors)
        }
       if(successs !=null){ 
    
        return    toast.success(successs)
    
        }
    },[message])
    
   

     const savesanpham =  (e)=>{
      var target = e.target;
      var name = target.name;
      var value =  target.value;
    
       setsanpham({ ...sanpham   , [name]: value})
     }

      const Limitsoluongfile = (event)=>{
   
            
          return    toast.error("Số ảnh không vượt quá 5 ảnh")
         
      }

      const submitdata = async() =>{
      
      
        if(!sanpham.tensp || !sanpham.gia  ){
          console.log(sanpham)
          console.log(!sanpham.tensp)
          return  toast.error("Vui lòng điền đẩy đủ thông tin ")
        }

        if(!imgsave){
          return  toast.error("Bạn cần có sản phẩm chính")
        }
        if(!filesuploads || (filesuploads.files).length <1){
          return  toast.error("Bạn cần có các sản phẩm minh họa phụ")
        }
        


        const formData = new FormData();
        formData.append('tensanpham', sanpham.tensp);
        formData.append('giasanpham', sanpham.gia);
      
        for (let i = 0; i < filesuploads.files.length; i++) {
          formData.append('filesupload', filesuploads.files[i])                    
      }
     
         formData.append('filesupload', imgsave);
       
      
         
        setmessage(!message)
     
      }
      if (editsp === null) return  ( <h3 className="no-guest">Data .....</h3>)
      const data = editsp.cacanhkhac ?editsp.cacanhkhac :null

      
     
    return (
        <>
   
        <TrangchuAdmin/>
        <ToastContainer
position="top-right"
autoClose={1000}
closeOnClick/>

    

        <Grid container spacing={3} className={classes.boottom} >
            
        <Grid item lg={3}/>
            <Grid item lg={3}>

            <TextField
          id="standard-textarea"
          label="Thêm tên sản phẩm"
          placeholder="Placeholder"
          onChange={savesanpham}
          value={editsp.tensanpham}
          type="text"
          multiline
          name="tensp"
        />
         <TextField id="standard-basic" 
         label="Giá sản phẩm "
         onChange={savesanpham}
         type="number"
         name="gia"
         value={editsp.giaban}
          />  
              
      </Grid>
                <Grid item lg={3}>
                    <label htmlFor=""> Ảnh sản phẩm chính</label>
               <input type="file"  name="Upload" accept="jpeg, .jpg, .png" onChange={previewimg}/>
               <div className="anhsp">
                 <img src={`http://localhost:8000/images/`+editsp.anhsanphamchinh}  className={classes.imghien} /> 
               </div>
                    </Grid>
                    
                </Grid>

                <Grid container  >
                <Grid item lg={1}/>
                <Grid item lg={10}>
              
              
              <DropzoneArea
            onChange={handleChange}
            filesLimit={5}
            dropzoneText={"Upload các ảnh khác của sản phẩm"}
            showAlerts={false}
            
            getFileLimitExceedMessage={Limitsoluongfile}
           
            />
    
    <Button variant="contained" color="primary" onClick={submitdata}> Send </Button>
                    </Grid>
                      
                 
                    </Grid>
        </>
    );
}

export default Editsanphams