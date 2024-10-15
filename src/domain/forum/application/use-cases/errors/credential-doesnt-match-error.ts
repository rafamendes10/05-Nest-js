import { UseCaseError } from "@/core/errors/use-case-error";

export class CredentialDoesntMatchError extends Error implements UseCaseError{
  constructor() {
    super(`Wrong creadentials Error`)
  }
}