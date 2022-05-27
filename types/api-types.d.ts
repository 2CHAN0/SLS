export interface Flight {
    id: string;
    pk: string;
    sk: string;
    origin: string;
    destination: string;
    departureDate: number;
    passengers: Passenger[];
}
export type Passenger = {
  name: string;
  age: number;
}

export interface PostFlightBody {
    passengers: Passenger[];
    flightTime: string;
}