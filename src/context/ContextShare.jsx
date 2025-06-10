


import React, { createContext, useState } from 'react'

export const userProfileContex = createContext("")
export const searchkeyContex = createContext("")
export const adminProfileContex = createContext("")
export const wishlistContext = createContext("");


function ContextShare({children}) {
const [userProfile, setuserProfile] = useState({})
const [searchkey,setsearchkey] = useState("")
const [adminProfile, setadminProfile] = useState({})
const [wishlist, setWishlist] = useState([]);
 



  return (
   
     <wishlistContext.Provider value={{wishlist,setWishlist}}>
        <userProfileContex.Provider value={{userProfile,setuserProfile}}>
            <searchkeyContex.Provider value={{searchkey,setsearchkey}}>
           <adminProfileContex.Provider value={{adminProfile,setadminProfile}}>   {children}</adminProfileContex.Provider>
              </searchkeyContex.Provider>
        </userProfileContex.Provider>
     </wishlistContext.Provider>

  )
}

export default ContextShare
