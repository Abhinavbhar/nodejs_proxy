import Ip from "../Db/ipAddress.js";


const ip = async (ipAddress) => {
  try {
      const existingUser = await Ip.findOne({ipAddress})

    if (!existingUser) {
    
      console.log(" a blocked ip came",ipAddress)
      return false
     // console.log(`New user with IP ${ipaddress} added to the database.`);
    } else {
     // console.log(`IP ${ipaddress} already exists in the database. No changes made.`);
     return true
    }

    
  } catch (error) {
    console.error("Error while checking or adding IP address:", error);
  }
};

export default ip