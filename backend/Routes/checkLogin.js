const check=async(req,res)=>{
    const user = req.user.email
    return   res.status(200).json({ message: "User is logged in",user });

}
export default check