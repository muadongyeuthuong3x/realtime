import  {CREATEHANG,LISTHANG ,DELETE,EDITHANG,UPDATEHANG,ERROR , SUCCESS ,CLEAR }   from '../contants/type'

export const HangReducer = (state , action)=>{
  const {type  , payload} = action
  
 switch (type) {
    case CREATEHANG:
          
     return {
         ...state,
         data:payload
     }

     case LISTHANG:
          
        return {
            ...state,
            listdata:payload
        }
    
        case DELETE:
          
            state.listdata.forEach((data,index) => {
                if(data._id === payload){
                    state.listdata.splice(index,1)
                   
                }
            });
       
            return {
                ...state
            }

            case EDITHANG:
                return {
                    ...state,
                    dataedit:payload
                }
           
               case UPDATEHANG:{
                   return {
                    ...state,
                    data:payload
                   }
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

