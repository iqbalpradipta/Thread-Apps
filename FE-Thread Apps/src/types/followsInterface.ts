export interface IFollows {
  id?: number;
  usersFollowing: IUsersFollow;
  usersFollower: IUsersFollow;
  isFollow: boolean
}

export interface IUsersFollow {
  id?: number;
  username?: string;
  fullName?: string;
  email?: string;
  photo_profile?: string;
}
