
import './App.css';
import { BrowserRouter as Router , Route , Switch   } from 'react-router-dom'
import TrangChuAdmin from './DasboardAdmin/Trangchuadmin'
import ThemHang from './ThemHang/Hang'
import ListHang from'./ThemHang/ListHang'
import 'bootstrap/dist/css/bootstrap.min.css';
import HangcontextProvider from './context/Hang/State'
import  SanPhamcontextProvider   from './context/sanpham/State'
import   Themsanpham  from './sanphamban/Themsanpham'
import  ListSanPham   from './sanphamban/ListSanPham'
import EditSanPham from './sanphamban/EditSanpham'
import Dangki from './Dangki/Dangki'
import Dangnhap from './Dangnhap/Dangnhap'
import UsercontextProvider from './context/Taikhoanuser/User'
import Listchat from './Listuserchat/Userchat'
import Trangchu from './Trangchu/Trangchu'
import Giohang  from './Giohang/Giohang'
import  ShowSPcontextProvider from './context/showsanpham/State'
import ShowSP from './ShowSanPham/ShowSP'
import NotFound from './NotFound'
import GiohangProvider  from './context/Giohang/State'
import Listdonhang from './Donhang/Listdonhang'

function App() {

  const data = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))  : null  ;
  const rolequyen = data!=null ?  data.role : null
  
  return (
  <UsercontextProvider> 
 <HangcontextProvider>  
 <SanPhamcontextProvider>
 <ShowSPcontextProvider>
   <GiohangProvider >  
   <Router>
     <Switch>
       <Route path="/admin" exact component={TrangChuAdmin} />
       <Route path="/themhang"  exact component={ rolequyen===1 ?ThemHang : NotFound } />
       <Route path="/listhang" exact  component={ rolequyen===1 ? ListHang : NotFound } />
       <Route path="/themsanpham" exact  component={rolequyen===1 ?Themsanpham : NotFound } />
       <Route path="/listsanpham" exact component={rolequyen===1 ?ListSanPham : NotFound } />
       <Route path="/suasanpham/:id" exact component={rolequyen===1 ?EditSanPham : NotFound } />
       <Route path="/dangkitaikhoan" exact component={Dangki} />
       <Route path="/dangnhap"  exact component={Dangnhap} />
       <Route path="/danhsachchat" exact  component={Listchat} />
       <Route path="/trangchu"  exact component={Trangchu} />
       <Route path="/giohang" exact component={Giohang} />
       <Route path="/"  exact component={NotFound} />
       <Route path="/ShowSanPham/:id"  exact component={ShowSP} />
       <Route path="/danhsachdonhang"  exact component={Listdonhang} />
     </Switch>
   </Router>
   </GiohangProvider >
   </ShowSPcontextProvider>
   </SanPhamcontextProvider>
   </HangcontextProvider>
   </UsercontextProvider>
  );

}

export default App;
