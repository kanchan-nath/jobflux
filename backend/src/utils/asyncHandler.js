    const asyncHandler = ()=>{
        return (req, res, next) =>{
            Promise.resolve(asyncHandler(req,res,next)).catch((error)=> next(error))
        }
    }

    //Another Method

    // const asyncHandler = ()=>{}
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(error.statusCode || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }


    export { asyncHandler }