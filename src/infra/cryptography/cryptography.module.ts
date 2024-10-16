import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer';
import { Module } from "@nestjs/common";
import { BcryptHasher } from './bcrypt-hasher';
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator';
import { Encrypter } from '@/domain/forum/application/cryptography/encrypter';
import { JwtEncrypter } from './jwt-encrypter';


Module({
  providers: [
    { provide:HashComparer, useClass: BcryptHasher},
    { provide: HashGenerator, useClass: BcryptHasher},
    { provide: Encrypter, useClass: JwtEncrypter}
  ],
  exports: [
    Encrypter,
    HashGenerator,
    HashComparer
  ]
})
export class CryptographyModule{}