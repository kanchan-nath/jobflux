// const asyncHandler = ()=>{
//     return (req, res, next) =>{
//         Promise.resolve(asyncHandler(req,res,next)).catch((error)=> next(error))
//     }
// }

//Another Method

// const asyncHandler = ()=>{}
const asyncHandler = (fn) =>  async ()=>{
    try{
        await fn(req, resizeBy, next)
    }catch(error){
        res.status(error.code || 500).json({
        success: false,
        message: error.message
        })
    }
}


export { asyncHandler }