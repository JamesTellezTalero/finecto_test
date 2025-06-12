/**
 * Tipo para las opciones de generación de cadenas.
 */
export type StringOptions = {
    letters?: boolean;
    numbers?: boolean;
    specialChars?: boolean;
};

/**
 * Utilidades para manipulación y generación de cadenas de texto.
 * @class StringUtils
 */
export class StringUtils {
    private static readonly LETTER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    private static readonly NUMBER_CHARS = "0123456789";
    private static readonly SPECIAL_CHARS = "!@#$%^&*()_+[]{}|;:,.<>?";
    private static readonly MAX_SAFE_LENGTH = Number.MAX_SAFE_INTEGER;
    private static readonly MIN_LENGTH = 1;
    private static readonly DEFAULT_LENGTH = 10;

    /**
     * Mapeo de tipos de caracteres a sus conjuntos.
     */
    private static readonly CHAR_TYPE_MAP = {
        letters: StringUtils.LETTER_CHARS,
        numbers: StringUtils.NUMBER_CHARS,
        specialChars: StringUtils.SPECIAL_CHARS
    } as const;

    /**
     * Validadores de entrada con sus mensajes de error.
     */
    private static readonly VALIDATORS = {
        isNumber: (value: unknown): value is number => 
            typeof value === 'number',
        isInteger: (value: number): boolean => 
            Number.isInteger(value),
        isInRange: (value: number): boolean => 
            value >= StringUtils.MIN_LENGTH && value <= StringUtils.MAX_SAFE_LENGTH,
        hasValidOptions: (options: StringOptions): boolean => 
            Object.values(options).some(Boolean),
        areValidBooleans: (options: StringOptions): boolean =>
            Object.entries(options).every(([_, value]) => 
                value === undefined || typeof value === 'boolean'
            )
    } as const;

    /**
     * Mensajes de error para validaciones.
     */
    private static readonly ERROR_MESSAGES = {
        NOT_A_NUMBER: "La longitud debe ser un número.",
        NOT_AN_INTEGER: "La longitud debe ser un número entero.",
        OUT_OF_RANGE: `La longitud debe estar entre ${StringUtils.MIN_LENGTH} y ${StringUtils.MAX_SAFE_LENGTH}.`,
        NO_CHAR_TYPES: "Debe seleccionar al menos un tipo de carácter.",
        INVALID_OPTION: (key: string) => `La opción '${key}' debe ser un booleano.`
    } as const;

    /**
     * Genera una cadena aleatoria con las opciones especificadas.
     * Implementa validaciones robustas y manejo de casos edge.
     *
     * @param length - Longitud de la cadena a generar.
     * @param options - Opciones para definir los tipos de caracteres a incluir.
     * @throws {Error} Si la longitud es inválida o las opciones son incorrectas.
     * @returns Cadena aleatoria generada según las opciones.
     *
     * @example
     * // Genera una cadena de 10 caracteres con letras y números
     * StringUtils.generateRandomString(10, { letters: true, numbers: true });
     */
    static generateRandomString(
        length: number = this.DEFAULT_LENGTH,
        options: StringOptions = {}
    ): string {
        // Validar entrada
        this.validateInput(length, options);

        // Construir conjunto de caracteres y generar cadena
        return this.generateString(
            length,
            this.buildCharacterSet(options)
        );
    }

    /**
     * Valida los parámetros de entrada.
     * @private
     */
    private static validateInput(length: unknown, options: StringOptions): void {
        // Validar longitud
        if (!this.VALIDATORS.isNumber(length)) {
            throw new Error(this.ERROR_MESSAGES.NOT_A_NUMBER);
        }

        if (!this.VALIDATORS.isInteger(length)) {
            throw new Error(this.ERROR_MESSAGES.NOT_AN_INTEGER);
        }

        if (!this.VALIDATORS.isInRange(length)) {
            throw new Error(this.ERROR_MESSAGES.OUT_OF_RANGE);
        }

        // Validar opciones
        if (!this.VALIDATORS.areValidBooleans(options)) {
            const invalidKey = Object.entries(options)
                .find(([_, value]) => value !== undefined && typeof value !== 'boolean')?.[0];
            throw new Error(this.ERROR_MESSAGES.INVALID_OPTION(invalidKey!));
        }

        if (!this.VALIDATORS.hasValidOptions(options)) {
            throw new Error(this.ERROR_MESSAGES.NO_CHAR_TYPES);
        }
    }

    /**
     * Construye el conjunto de caracteres basado en las opciones.
     * @private
     */
    private static buildCharacterSet(options: StringOptions): string {
        return Object.entries(this.CHAR_TYPE_MAP)
            .filter(([key]) => options[key as keyof StringOptions])
            .map(([_, chars]) => chars)
            .join('');
    }

    /**
     * Genera la cadena aleatoria usando crypto.
     * @private
     */
    private static generateString(length: number, possibleChars: string): string {
        const randomValues = new Uint32Array(length);
        crypto.getRandomValues(randomValues);

        return Array.from(randomValues)
            .map(value => possibleChars[value % possibleChars.length])
            .join('');
    }

    /**
     * Verifica si una cadena contiene al menos un carácter de cada tipo seleccionado.
     * @private
     */
    private static validateCharacterDistribution(
        str: string,
        options: {
            letters?: boolean;
            numbers?: boolean;
            specialChars?: boolean;
        }
    ): boolean {
        if (options.letters && !/[A-Za-z]/.test(str)) return false;
        if (options.numbers && !/[0-9]/.test(str)) return false;
        if (options.specialChars && !/[!@#$%^&*()_+\[\]{}|;:,.<>?]/.test(str)) return false;
        return true;
    }
}
