export class Photoshoot {
  id: number;
  length: number;
  name: string;
  description: string;


  // C O N S T R U C T O R
  constructor(id?: number, length?: number, name?: string, description?: string) {
    this.id = id;
    this.length = length;
    this.name = name;
    this.description = description;
  }
}
