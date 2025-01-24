const check=async(req,res)=>{
    return   res.status(200).json({ message: "User is logged in" });

}
export default check