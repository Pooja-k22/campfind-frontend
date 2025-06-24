import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

// register api
export const registerApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody)
}

// login 
export const loginApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody)
}

// google login
export const googleLoginApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/google-login`,reqBody)
}





// ----------------------------------------user--------------------------------

// add spot 
export const addCampSpotApi=async(reqBody,reqHeader)=>{
    return await commonApi('POST' ,`${serverUrl}/add-camp`, reqBody,reqHeader)
}

// get home camp spot
export const getHomeCampSpotApi = async()=>{
    return await commonApi('GET',`${serverUrl}/all-home-camp`)
}

// get all camp
export const getAllCampApi = async(searchkey,reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/all-camp?search=${searchkey}`,"",reqHeader)
}

// api to view a camp
export const viewACampApi=async(id)=>{
    return await commonApi('GET' ,`${serverUrl}/view-camp/${id}`)
}

// post booking api
export const addbookingApi = async(reqBody,reqHeader)=>{
        return await commonApi('POST',`${serverUrl}/booking`,reqBody,reqHeader)
}

// get user booking api 
export const getUserBookingApi=async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/user-bookings`,"",reqHeader)
}

// get host reservation list
export const getReservationApi = async(reqHeader)=>{
    return await commonApi("GET",`${serverUrl}/reservation`,"",reqHeader)
}

// wishlist 
export const WishlistApi=async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/wishlist`,reqBody,reqHeader)
}

// get wishlist in wishlist page
export const getWishlistApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/get-wishlist`,"",reqHeader)
}




// get all host camp
export const gethostCampApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/host-camp`,"",reqHeader)
}

// delete camp 
export const deleteCampApi= async(id)=>{
    return await commonApi("DELETE",`${serverUrl}/delete-camp/${id}`)
}

// edit user profile 
export const updateProfileApi= async(reqBody,reqHeader)=>{
return await commonApi("PUT",`${serverUrl}/userProfile-edit`,reqBody,reqHeader)
}

// check capacity
export const checkCapacityApi = async(campId,date,guests)=>{
    return await commonApi('GET',`${serverUrl}/check-capacity?campId=${campId}&date=${date}&guests=${guests}`)
}

// add review
export const addReviewApi = async(reqBody,reqHeader)=>{
    return await commonApi('POST', `${serverUrl}/add-review`,reqBody,reqHeader)
}

// get review
export const getReviewApi = async(campId)=>{
    return await commonApi('GET', `${serverUrl}/get-review/${campId}`)
}

// add blog
export const addBlogApi = async(reqBody,reqHeader)=>{
       return await commonApi('POST', `${serverUrl}/add-blog`,reqBody,reqHeader)
 
}

// get blog
export const getBlogsApi = async()=>{
       return await commonApi('GET', `${serverUrl}/get-blog`)
 
}


// ------------------------------------------ADMIN--------------------------------------------------------------

// get camp list in adminside

 export const getAllCampAminApi= async(reqHeader)=>{
    return await commonApi('GET', `${serverUrl}/admin-camp`,"",reqHeader)
 }

//  api to approve camp
export const approveCampApi = async(reqBody)=>{
    return await commonApi('PUT',`${serverUrl}/approve-camp`,reqBody)
}

// get all user api
export const getAllUserApi = async()=>{
    return await commonApi('GET', `${serverUrl}/get-users`)
}

// admin profile edit
export const adminProfileUpdateApi = async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/admin-profile-edit`,reqBody,reqHeader)
}

// get all bookings
export const getAllBookingsApi=async()=>{
    return await commonApi('GET',`${serverUrl}/bookings`)
}