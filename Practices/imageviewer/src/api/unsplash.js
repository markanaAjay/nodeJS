import axios from "axios";

export default axios.create({
    baseURL: "https://api.unsplash.com",
    headers: {
        Authorization: "Client-ID P_OMtEuKiUr-wqib6iJUTI-s9DdbvXc7eBOR62hpZ-s"
        
    }
});