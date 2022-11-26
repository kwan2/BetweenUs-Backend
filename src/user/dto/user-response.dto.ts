import { UserEntity } from '../entity/user.entity';

export class RegisterUserRO {
  email: string;
  name: string;
  description: string;
  profilePath: string;
  major: string;
  institution: string;
  age: number;
  sex: string;

  constructor(user: UserEntity) {
    this.email = user.email;
    this.name = user.name;
    this.description = user.description;
    this.profilePath = user.profilePath;
    this.major = user.major;
    this.institution = user.institution;
    this.age = user.age;
    this.sex = user.sex;
  }
}
