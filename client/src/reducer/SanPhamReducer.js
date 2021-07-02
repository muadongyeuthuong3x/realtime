import  { CREATESANPHAM , LISTSANPHAM, DELETESANPHAM ,EDITSANPHAM,   ERROR , SUCCESS ,CLEAR }   from '../contants/type'

export const SanPhamReducer = (state , action)=>{
  const {type  , payload} = action
 
 switch (type) {

    case LISTSANPHAM:
          
        return {
            ...state,
            listdata:payload
        }

        case EDITSANPHAM:
            return {
                ...state,
                dataedit:payload
            }
       

        case DELETESANPHAM:
          
            state.listdata.forEach((data,index) => {
                if(data._id === payload){
                    state.listdata.splice(index,1)
                   
                }
            });
       
            return {
                ...state

            }

    case SUCCESS:
          
        return {
            ...state,
            success:payload,
            error:null
        }
    case ERROR:
          
            return {
                ...state,
                error:payload,
                success:null
            }
    case CLEAR:{
        return {
            ...state,
            error:payload,
            success:payload
        }
    }


     default:
        return state
 }
}

