
export function checkValidation(token, status){
    //console.log(token, status)
    if(token === null){
        alert("token not provided");
        return 1
     }
     else{
         if(status === "inactive"){
             alert("User Status is inactive");
             return 2
         }
         
     }
     return null;
}


