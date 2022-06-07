export type Flight = {
    id: string;
    id_DESC: 'You can write description for your model'
    id_EXAMPLE: 'cy.lee'
    age: number;
    age_DESC: 'You can write description for your model'
    age_EXAMPLE: 30
}

export type Passenger = {
  name: string;
  age: number;
}

export interface PostFlightBody {
    passengers: Passenger[];
    flightTime: string;
}