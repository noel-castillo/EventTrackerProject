export class Address {

  // F I E L D S
  id: number;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;


  // C O N S T R U C T O R
  constructor(id?: number, street?: string, city?: string, state?: string, zip?: string, phone?: string) {
    this.id = id;
    this.street = street;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.phone = phone;
  }
}
