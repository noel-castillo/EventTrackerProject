import { Photoshoot } from './photoshoot';
export class Photoshootimage {

  id: number;
  url: string;
  photoshoot: Photoshoot;


  // C O N S T R U C T O R
  constructor(id?: number, url?: string, photoshoot?: Photoshoot) {
    this.id = id;
    this.url = url;
    this.photoshoot = photoshoot;
  }
}
