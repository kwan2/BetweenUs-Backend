import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';

@Entity('Users')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'email', nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, name: 'password', nullable: false })
  password: string;

  // @BeforeInsert()
  // async hashPassword() {
  //   if (this.password) {
  //     this.password = await bcrypt.hash(this.password, 10);
  //   }
  // }

  @Column({ type: 'varchar', length: 255, name: 'name', nullable: false })
  name: string;

  @Column({
    type: 'varchar',
    length: 1000,
    name: 'description',
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'varchar',
    length: 1000,
    name: 'profile_path',
    nullable: true,
  })
  profilePath?: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'major',
    nullable: true,
  })
  major?: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'institution',
    nullable: true,
  })
  institution?: string;

  @Column({
    type: 'int',
    name: 'age',
    nullable: true,
  })
  age?: number;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'sex',
    nullable: true,
  })
  sex?: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'refreshToken',
    nullable: true,
  })
  @Exclude()
  refreshToken?: string;
}
