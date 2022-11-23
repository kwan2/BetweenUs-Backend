import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('USER')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'user_id' })
  userId: number;

  @Column({ type: 'varchar', length: 255, name: 'id', nullable: false })
  id: string;

  @Column({ type: 'varchar', length: 255, name: 'password', nullable: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  @Column({ type: 'varchar', length: 255, name: 'user_name', nullable: false })
  userName: string;

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
}
