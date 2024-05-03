export interface Reservation {
  id?: number;
  checkindate: Date;
  checkoutdate: Date;
  //optional operator for testing without logging in
  guestname?: string;
  guestemail?: string;
  listingId: number;
  //optional operator for testing without logging in
  userId?: string | number;
  reasonCancel?: string;
  token?: string | number;
}
