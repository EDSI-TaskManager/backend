import { BeforeInsert, Column, PrimaryGeneratedColumn } from 'typeorm';
import { hashSync } from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class User {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  @Exclude({ toPlainOnly: true })
  password: string;

  role: string;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
