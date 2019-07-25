export class Flight {
     destination: string;
     departureDate: Date;
     returnDate: Date;
     rain: boolean;
     weathers: any[];
     temperature: number;
     from: string;
     price: number;
     link: string;
    constructor(  destination: string,
                  departureDate: Date,
                  returnDate: Date,
                  rain: boolean,
                  weathers: any[],
                  temperatyre: number,
                  from: string,
                  price: number,
                  link: string
      ) {
        this.destination = destination;
        this.departureDate = departureDate;
        this.returnDate = returnDate;
        this.rain = rain;
        this.weathers = weathers;
        this.temperature = temperatyre;
        this.from = from;
        this.price = price;
        this.link = link;
      }
}
