export interface RentAgreement{
    id:string,
    carId:string,
    userId:number,
    rentDuration:number,
    totalRentAmount:number,
    rentDate:string,
    returnDate:string
    requestForReturn:Boolean

}