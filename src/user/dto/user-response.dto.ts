import { UserEntity } from '../entity/user.entity';

export class RegisterUserRO {
  userId: number;
  id: string;
  userName: string;
  description: string;
  profilePath: string;
  major: string;
  institution: string;
  age: number;
  sex: string;

  constructor(user: UserEntity) {
    this.userId = user.userId;
    this.id = user.id;
    this.userName = user.userName;
    this.description = user.description;
    this.profilePath = user.profilePath;
    this.major = user.major;
    this.institution = user.institution;
    this.age = user.age;
    this.sex = user.sex;
  }
}
