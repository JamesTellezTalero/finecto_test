/**
 * Base contract for all application use cases.
 *
 * This generic interface defines use cases that take an input (`TInput`)
 * and return an output (`TOutput`) asynchronously.
 *
 * It is recommended that all use cases implement this interface to maintain
 * a consistent and predictable structure across the application.
 *
 * @template TInput - The type of the input parameter required by the use case.
 * @template TOutput - The type of the result returned by the use case.
 *
 * @example
 * interface CreateUserInput {
 *   name: string;
 *   email: string;
 * }
 *
 * interface CreateUserOutput {
 *   id: number;
 *   uuid: string;
 * }
 *
 * class CreateUserUseCase implements IUseCase<CreateUserInput, CreateUserOutput> {
 *   async execute(input: CreateUserInput): Promise<CreateUserOutput> {
 *     // user creation logic
 *   }
 * }
 */
export interface IUseCase<TInput, TOutput> {
    /**
     * Executes the use case logic.
     *
     * @param input - Data required to execute the use case.
     * @returns A promise resolving to the result of the use case.
     */
    execute(input: TInput): Promise<TOutput>;
}
