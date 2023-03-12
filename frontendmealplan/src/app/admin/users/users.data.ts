import { InMemoryDbService } from 'angular-in-memory-web-api';
export class UsersData implements InMemoryDbService {
  createDb() {
    const users = [
        {
            id: 1,
            username: "pretty",
            password: "pretty123",
            profile: {
                name: "Ashley",
                surname: "Ahlberg",
                birthday: new Date(1981,2,29),
                gender: "female",
                image: "assets/images/profile/ashley.jpg"
            },
            work: {
                company: "Google",
                position: "Product designer",
                salary: 5000
            },
            contacts:{
                email: "ashley@gmail.com",
                phone: "(202) 756-9756",
                address: "Washington"
            },
            social: {
                facebook:"",
                twitter:"",
                google:""
            },
            settings:{
                isActive: true,
                isDeleted: false,
                registrationDate: "2012-10-13T12:20:40.511Z",
                joinedDate: "2017-04-21T18:25:43.511Z"
            }
        },
        {
            id: 2,
            username: "bruno.V",
            password: "bruno123",
            profile: {
                name: "Bruno",
                surname: "Vespa",
                birthday: new Date(1992,11,20),
                gender: "male",
                image: "assets/images/profile/bruno.jpg"
            },
            work: {
                company: "Dell EMC",
                position: "Sale manager",
                salary: 17000
            },
            contacts:{
                email: "bruno@dell.com",
                phone: "(415) 231-0332",
                address: "San Francisco"
            },
            social: {
                facebook:"",
                twitter:"",
                google:""
            },
            settings:{
                isActive: false,
                isDeleted: false,
                registrationDate: "2011-01-05T08:45:23.511Z",
                joinedDate: "2017-05-20T18:25:43.511Z"
            }
        },
        {
            id: 3,
            username: "andy.79",
            password: "andy123",
            profile: {
                name: "Andy",
                surname: "Warhol",
                birthday: new Date(1979,10,21),
                gender: "male",
                image: "assets/images/avatars/avatar-3.png"
            },
            work: {
                company: "Adecco",
                position: "Product manager",
                salary: 13000
            },
            contacts:{
                email: "andy@adecco.com",
                phone: "(212) 457-2308",
                address: "New York"
            },
            social: {
                facebook:"",
                twitter:"",
                google:""
            },
            settings:{
                isActive: true,
                isDeleted: false,
                registrationDate: "2014-11-01T19:35:43.511Z",
                joinedDate: "2017-06-28T15:25:43.511Z"
            } 
        },
        {
            id: 4,
            username: "julia.a",
            password: "julia123",
            profile: {
                name: "Julia",
                surname: "Aniston",
                birthday: new Date(1982,6,18),
                gender: "female",
                image: "assets/images/profile/julia.jpg"
            },
            work: {
                company: "Apple",
                position: "Sales manager",
                salary: 18000
            },
            contacts:{
                email: "julia@apple.com",
                phone: "(224) 267-1346",
                address: "Illinois, Chicago"
            },
            social: {
                facebook:"",
                twitter:"",
                google:""
            },
            settings:{
                isActive: true,
                isDeleted: false,
                registrationDate: "2015-12-06T11:10:20.511Z",
                joinedDate: "2017-06-29T15:15:40.511Z"
            } 
        },
        {
            id: 5,
            username: "lusia.m",
            password: "lusia123",
            profile: {
                name: "Lusia",
                surname: "Manuel",
                birthday: new Date(1992,12,2),
                gender: "female",
                image: "assets/images/avatars/avatar-7.png"
            },
            work: {
                company: "Alphabet",
                position: "Office manager",
                salary: 10000
            },
            contacts:{
                email: "lusia@alphabet.com",
                phone: "(224) 267-1346",
                address: "California, Los Angeles"
            },
            social: {
                facebook:"",
                twitter:"",
                google:""
            },
            settings:{
                isActive: true,
                isDeleted: true,
                registrationDate: "2014-01-10T10:20:20.511Z",
                joinedDate: "2017-06-28T12:20:40.511Z"
            } 
        },
        {
            id: 6,
            username: "adam.82",
            password: "adam123",
            profile: {
                name: "Adam",
                surname: "Sandler",
                birthday: new Date(1987,12,24),
                gender: "male",
                image: "assets/images/profile/adam.jpg"
            },
            work: {
                company: "General Electric",
                position: "Product manager",
                salary: 21000
            },
            contacts:{
                email: "adam@gen-el.com",
                phone: "(224) 267-1346",
                address: "Texas, Houston"
            },
            social: {
                facebook:"",
                twitter:"",
                google:""
            },
            settings:{
                isActive: false,
                isDeleted: false,
                registrationDate: "2016-11-16T12:20:20.511Z",
                joinedDate: "2017-06-27T14:20:40.511Z"
            }
        },
        {
            id: 7,
            username: "tereza.s",
            password: "tereza123",
            profile: {
                name: "Tereza",
                surname: "Stiles",
                birthday: new Date(1979,7,9),
                gender: "female",
                image: "assets/images/profile/tereza.jpg"
            },
            work: {
                company: "Southwest Airlines",
                position: "Sale manager",
                salary: 31000
            },
            contacts:{
                email: "tereza@airlines.com",
                phone: "(214) 617-2614",
                address: "Texas, Dallas"
            },
            social: {
                facebook:"",
                twitter:"",
                google:""
            },
            settings:{
                isActive: true,
                isDeleted: false,
                registrationDate: "2010-10-12T16:20:20.511Z",
                joinedDate: "2017-06-29T15:20:40.511Z"
            }
        },
        {
            id: 8,
            username: "michael.b",
            password: "michael123",
            profile: {
                name: "Michael",
                surname: "Blair",
                birthday: new Date(1978,11,15),
                gender: "male",
                image: "assets/images/profile/michael.jpg"
            },
            work: {
                company: "Microsoft",
                position: "Software developer",
                salary: 50000
            },
            contacts:{
                email: "michael@microsoft.com",
                phone: "(267) 388-1637",
                address: "Pennsylvania, Philadelphia"
            },
            social: {
                facebook:"",
                twitter:"",
                google:""
            },
            settings:{
                isActive: true,
                isDeleted: false,
                registrationDate: "2009-08-12T16:20:20.511Z",
                joinedDate: "2017-06-30T11:30:40.511Z"
            }
        },
        {
            id: 9,
            username: "michelle.81",
            password: "michelle123",
            profile: {
                name: "Michelle",
                surname: "Ormond",
                birthday: new Date(1981,11,18),
                gender: "female",
                image: "assets/images/avatars/avatar-5.png"
            },
            work: {
                company: "Starbucks",
                position: "Sale manager",
                salary: 15000
            },
            contacts:{
                email: "michelle@starbucks.com",
                phone: "(267) 388-1637",
                address: "Washington, Seattle"
            },
            social: {
                facebook:"",
                twitter:"",
                google:""
            },
            settings:{
                isActive: false,
                isDeleted: true,
                registrationDate: "2012-11-10T18:20:20.511Z",
                joinedDate: "2015-03-29T17:20:40.511Z"
            }
        }
       
    ];
    return {users};
  }
}