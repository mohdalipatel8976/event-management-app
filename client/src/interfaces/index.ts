export interface UserType {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string
}

export interface EventType {

  _id: string;
  name: string;
  description: string;
  organizer: string;
  date: string;
  location: string;
  guests: string[];
  address: string;
  city: string;
  pincode: string;
  media: string[];
  time: string;
  ticketTypes: {
    [x: string]: number;
    name: string;
    price: number;
    limit: number;
  }[];


}

export interface BookingType {
  _id: string;
  user: UserType;
  event: EventType;
  ticketType: string;
  quantity: number;
  totalAmount: number;
  paymentId ?: string;
  status ?: string;
  createdAt: string;
}
 