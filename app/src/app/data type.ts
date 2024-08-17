export interface signup{
    name:string,
    email:string,
    password:string
}

export interface login{
    email:string,
    psw:string
}
export interface product{
      productId: any
      length: any
      Name: string,
      productprice:string ,
      productcategory:string ,
      color: string,
      productimageURL: string,
      productdescription: string,
      id:any
      quantity:undefined | number
      
}

export interface cart{
    length: any
      Name: string,
      productprice:string ,
      productcategory:string ,
      color: string,
      productimageURL: string,
      productdescription: string,
      id:any
      quantity:undefined | number,
      productId:any,
      userId:any
}

