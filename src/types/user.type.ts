export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    profilePic: string;
  }
  
  export interface Auth {
    user: User;
    accessToken: string;
    refreshToken: string;
  }
  