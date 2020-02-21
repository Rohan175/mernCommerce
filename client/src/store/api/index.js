const baseUrl = 'http://localhost:9100/api'
let authToken;

const getToken= () => {
  if(!authToken){
    authToken = localStorage.getItem("auth")
  }
  return authToken
}

const fetchWrapper = async (url,method="GET",body=null,param="",headers={}) =>{

  const mHeaders = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...headers
  });

  const obj = {
    method,
    headers: mHeaders,
  }

  if(body){
    obj["body"] =JSON.stringify(body)
  }
  const result = await fetch(`${baseUrl}/${url}/${param}`,obj).then(res => res.json());
  return result
}

const fetchSecured = (url,method="GET",body="",param="") =>{
  return fetchWrapper(url,method,body,param,{
      Authorization: `Bearer ${getToken()}`
    }
  )
}

const API = {
  products: {
    async getAll () {
      return await fetchSecured("products")
    }
  },
  cart : {
    async getCart(){
      return await fetchSecured("cart")
    },
    async addItem(productId,qty,price,name){
      return await fetchSecured("cart/add","POST",{productId,qty,price,name})
    },
    async subItem(productId,qty,price,name){
      return await fetchSecured("cart/sub","POST",{productId,qty,price,name})
    }
  },
  user : {
    login(username,password){
      return fetchWrapper("auth/login","POST",
        {username,password}
      )
    },
    signup(username,mobileNumber,password){
      return fetchWrapper("users","POST",
        {username,mobileNumber,password}
      )
    }
  }
}

export default API
