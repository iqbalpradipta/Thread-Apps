export interface IFollows {
  id?: number;
  usersFollowing: IUsersFollow;
}

export interface IUsersFollow {
  id?: number;
  username?: string;
  fullName?: string;
  email?: string;
  photo_profile?: string;
}
