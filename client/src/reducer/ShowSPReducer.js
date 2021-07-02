import  {GETSANPHAM,ERROR , SUCCESS ,CLEAR }   from '../contants/type'

export const ShowSPReducer = (state , action)=>{
  const {type  , payload ,comments } = action
  
 switch (type) {
    case GETSANPHAM:
          
     return {
         ...state,
         data:payload,
         comments: comments
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

