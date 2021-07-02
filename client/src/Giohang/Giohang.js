import React  ,{useState , useContext ,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {Modal ,Button} from 'react-bootstrap'
import Contextgiohang  from  '../context/Giohang/Giohangcontext'

 function Giohang (props) {

    const [ms ,setms]  =useState(false)
    const context = useContext(Contextgiohang)
    const [message , setmessage] = useState(false)  
    const [show, setShow] = useState(false);
    
    const {apisavegiohang ,errors , successs  , clearmessage ,shows} = context

    useEffect(()=>{

      clearmessage()


      if(errors !=null){
         return  toast.error(errors)
        }
       if(successs !=null){ 
    
        return    toast.success(successs)
    
        }
    },[message])

       const cart =   localStorage.getItem("giohang") ? JSON.parse(localStorage.getItem("giohang")):[]

      const total = cart.reduce((pre,item)=>{
          return pre + (item.number)*(item.giaban)
      },0)
       
     

      const [donhang, setdonhang] = useState({
        nguoimua:null,
        sdt:null,
        diachi:null
      });
    
      const Muasanpham = ()=>{
        const data = JSON.parse(localStorage.getItem("user"));
        if(data){
          setShow(true)
        }else{
        return   toast.error("Bạn cần đang nhập trước khi mua hàng");
        }
      }

      const  handleClose = ()=>{
        setShow(false);
      }

       const addsp   = (id) =>{
        cart.map(e=>{
            if(e._id === id){
                e.number +=1
            
            }
            localStorage.setItem("giohang" ,JSON.stringify(cart ))
          return   setms(!ms)

        })
       }
      
       const ttSubmit  = async()=>{
         
    await apisavegiohang(donhang).then(res=>{
         console.log( res.data.message)
    }).catch(err=>{

    })
    setmessage(!message)

    

       }
      const deletesanpham   = (id) =>{
        cart.map(e=>{
            if(e._id === id){
              (  e.number >1 )?(e.number -=1):(e.number=1)
            
            }
            localStorage.setItem("giohang" ,JSON.stringify(cart ))
          return   setms(!ms)

        })
    }

    const layData = (e)=>{
      setdonhang({...donhang , [e.target.name] : (e.target.value) })
    }

       useEffect(()=>{

      
      },[ms])
     
     
   if(cart.length <1 )  return  ( <h3 className="no-guest">Chưa có sản phẩm để mua </h3>)

  return (
 
    <div className="container">
                        <ToastContainer
position="top-right"
autoClose={1000}
closeOnClick/>
         { cart.map(e =>( 
    <div className="row" key={e._id}>
  
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-2 cartitem" >
              <img src={"http://localhost:8000/images/"+e.anhsanphamchinh}  />

                </div>
                
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-2 " >
             
                 {e.tensanpham}
             </div>

             <div className="col-xs-12 col-sm-12 col-md-12 col-lg-2 " >
             
             {e.giaban} VNĐ
             </div>
      

             <div className="col-xs-12 col-sm-12 col-md-12 col-lg-2 " >
             
             { e.giaban * e.number} VNĐ

             </div>


             <div className="col-xs-12 col-sm-12 col-md-12 col-lg-2 " >
             
              <button onClick={()=>addsp(e._id)}>+</button> <input value={e.number}  type="text"/>   <button onClick={()=>deletesanpham(e._id)}>-</button>

             </div>
                </div>
         ))}

         <div className="tongtientra">
            <span> Tổng tiền : {total} VNĐ</span>
            <button  type="button" className="btn btn-primary" onClick={Muasanpham}> Mua </button>
         </div>

         
         <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin giao hàng </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <label htmlFor="">Họ Tên người nhận </label>

        <input type="text" style={{  width:"100%"}}   name="nguoimua" onChange={layData} /> 

        <label htmlFor="">Địa chỉ nhận hàng </label>

          <input type="text" style={{  width:"100%"}}   name="diachi" onChange={layData} />
          <div className="sdt">
            <label htmlFor="">Số điện thoại của bạn</label>
          <input type="text" style={{  width:"100%"}}      name="sdt"        onChange={layData}/>
          </div>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={ttSubmit} >
            Send 
          </Button>
        </Modal.Footer>
      </Modal>

                </div>

  )

   
}



export default Giohang