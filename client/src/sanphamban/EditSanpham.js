
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
   
            
          return    toast.error("S??? ???nh kh??ng v?????t qu?? 5 ???nh")
         
      }

      const submitdata = async() =>{
      
      
        if(!sanpham.tensp || !sanpham.gia  ){
          console.log(sanpham)
          console.log(!sanpham.tensp)
          return  toast.error("Vui l??ng ??i???n ?????y ????? th??ng tin ")
        }

        if(!imgsave){
          return  toast.error("B???n c???n c?? s???n ph???m ch??nh")
        }
        if(!filesuploads || (filesuploads.files).length <1){
          return  toast.error("B???n c???n c?? c??c s???n ph???m minh h???a ph???")
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
          label="Th??m t??n s???n ph???m"
          placeholder="Placeholder"
          onChange={savesanpham}
          value={editsp.tensanpham}
          type="text"
          multiline
          name="tensp"
        />
         <TextField id="standard-basic" 
         label="Gi?? s???n ph???m "
         onChange={savesanpham}
         type="number"
         name="gia"
         value={editsp.giaban}
          />  
              
      </Grid>
                <Grid item lg={3}>
                    <label htmlFor=""> ???nh s???n ph???m ch??nh</label>
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
            dropzoneText={"Upload c??c ???nh kh??c c???a s???n ph???m"}
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