
export class Payment{

constructor(
    public paymentId?:number,
    public paymentOfDate?:Date,
    public startDate?:Date,
    public endDate?:Date,
    public paymentTool?:string,
    public planId?:number ,
    public userId?:number
){}

}