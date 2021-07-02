import React  ,{useState , useContext ,useEffect} from 'react';
import ContextSanPham from '../context/sanpham/Sanphamcontext'
import { ToastContainer, toast } from 'react-toastify';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { NavLink } from 'react-router-dom';
 function Trangchu (props) {

    const context = useContext(ContextSanPham)

    const { listsanpham ,errors , listdata  ,successs , clearmessage  } =context
    
   const [sl ,setsl] = useState(0)
    const [ms ,setms]  =useState(false)
    useEffect(() => {
  
      listsanpham();
     
    
    }, []);
    
    useEffect(() => {
  
      clearmessage()
  
      if(errors !=null){
        return  toast.error(errors)
       }
      if(successs !=null){ 
   
       return  toast.success(successs)
   
       }
    
    }, []);

    let chek = (cartmua , id ) => {
        var index = -1;
            for (var i = 0; i <cartmua.length; i++) {
                if (cartmua[i]._id === id) {
                    index = i;
                    break;
                }
            }
        
        return index;
    }


  
    const addSanpham = (id)=>{
    setms(!ms)
       const  cartmua =   localStorage.getItem("giohang") ? JSON.parse(localStorage.getItem("giohang")) :[]
     
       if(cartmua.length ===0){
           listdata.map(e=>{
               if(e._id === id ){
                cartmua.push({...e ,number:1})
                localStorage.setItem("giohang" ,JSON.stringify(cartmua ))
                return    toast.success("Thêm giỏ hàng thành công")
               }
           })
       }
         
       else if (cartmua.length > 0) {
       
      const boolean = chek(cartmua ,id)


        if(boolean === -1 ){
            listdata.map(e=>{
                if(e._id === id ){
                 cartmua.push({...e ,number:1});
               localStorage.setItem("giohang" ,JSON.stringify(cartmua ));
               return    toast.success("Thêm giỏ hàng thành công")
                }
                
            })    }else{
            cartmua.map(e=>{
                if(e._id === id ){
                    e.number += 1
                     localStorage.setItem("giohang" ,JSON.stringify(cartmua ))
          
                     return    toast.success("Thêm giỏ hàng thành công")
                }
            })
        

        }

     
        }
    }

    const total = ()=>{
        const  cartmua =   localStorage.getItem("giohang") ? JSON.parse(localStorage.getItem("giohang")) :[]
        var tong = 0;
        if(cartmua.length >0){
            cartmua.map(e=>{

                tong = tong + e.number
            })
            setsl(tong)
        }

    }

    useEffect(()=>{

       total()
      },[ms])
     
    
     
       

   
    if (listdata === undefined) return  ( <h3 className="no-guest">Data .....</h3>)

    return (
    <>
      <ToastContainer
position="top-right"
autoClose={1000}
closeOnClick/>
     <div className="khoimenu">
     <NavLink to="/giohang">

         <div className="total" >  
        <ShoppingCartIcon/> 
        <div>{sl}</div>
     </div>
     </NavLink>
     </div>
     <div className="khoittsp">
     <div className="container">
            <div className="row">

            {listdata.map( (row, index) => ( 
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 " key={row._id}>
   <div className="khoisanpham">
      <img  src={"http://localhost:8000/images/"+row.anhsanphamchinh} />
      <div className="ttsp">
          <div className="tensp">  {row.tensanpham} <span className="giasp"> {row.giaban} VNĐ </span>   </div>
          
          </div>
         <div className="btn-group" role="group" aria-label="Basic example">

         <NavLink to={ `/ShowSanPham/${row._id}` } activeStyle={{ fontWeight: "bold", color: "red"}}> 
          <button  type="button" className="btn btn-primary">Xem thông tin </button>   </NavLink>
            <button type="button" className="btn btn-success" onClick = {()=>addSanpham(row._id)}>Mua sản phẩm </button>
         </div>
    
   </div>
</div>
            ))}


                   </div>
                   </div>
     </div>

    </>
    )
}



export default Trangchu