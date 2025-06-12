import { plainToInstance } from "class-transformer";

/**
 * Utilidades para convertir objetos planos (raw) en instancias de clases usando `class-transformer`.
 */
export class ClassMapperUtils {
    /**
     * Convierte un objeto plano en una instancia de clase tipada.
     *
     * @template Input - Tipo del objeto plano de entrada.
     * @template Output - Clase a la que se desea transformar el objeto.
     *
     * @param input - Objeto plano que se desea transformar.
     * @param outputClass - Constructor de la clase destino.
     *
     * @returns Una instancia de la clase especificada con los valores del objeto plano.
     *
     * @example
     * class UserDto {
     *   id: number;
     *   name: string;
     * }
     *
     * const user = ClassMapperUtils.toSingleInstance({ id: 1, name: 'Ana' }, UserDto);
     * //* user instanceof UserDto === true
     */
    static toSingleInstance<Input, Output>(
        input: Input,
        outputClass: new (...args: any[]) => Output
    ): Output {
        return plainToInstance(outputClass, input, {
            excludeExtraneousValues: true
        });
    }

    /**
     * Convierte un arreglo de objetos planos en un arreglo de instancias de clase.
     *
     * @template Input - Tipo del objeto plano dentro del arreglo.
     * @template Output - Clase a la que se desea transformar cada objeto.
     *
     * @param input - Arreglo de objetos planos.
     * @param outputClass - Constructor de la clase destino.
     *
     * @returns Un arreglo de instancias de la clase especificada.
     *
     * @example
     * const users = ClassMapperUtils.toMultipleInstances([{ id: 1, name: 'Ana' }], UserDto);
     * //* users[0] instanceof UserDto === true
     */
    static toMultipleInstances<Input, Output>(
        input: Input[],
        outputClass: new (...args: any[]) => Output
    ): Output[] {
        return plainToInstance(outputClass, input, {
            excludeExtraneousValues: true
        });
    }
}
