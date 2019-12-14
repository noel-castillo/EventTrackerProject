import { Photoshoot } from './photoshoot';
export class User {

     // F I E L D S
     email: string;
     username: string;
     password: string;
     enabled: boolean;
     photoshoots: Photoshoot[];


     // C O N S T R U C T O R
     constructor(email?: string, username?: string, password?: string, enabled?: boolean, photoshoots?: Photoshoot[]) {
       this.email = email;
       this.username = username;
       this.password = password;
       this.enabled = enabled;
       this.photoshoots = photoshoots;
     }
}
