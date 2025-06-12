/**
 * Utilidades para operaciones comunes con arreglos.
 */
export class ArrUtils {
    /**
     * Verifica si un arreglo de números contiene solo valores únicos.
     * @param arr Arreglo de números a evaluar.
     * @returns `true` si todos los números son únicos; `false` si hay duplicados.
     */
    static hasUniqueNumbers(arr: number[]): boolean {
        return new Set(arr).size === arr.length;
    }

    /**
     * Verifica si un arreglo de cadenas de texto contiene solo valores únicos.
     * @param arr Arreglo de strings a evaluar.
     * @returns `true` si todos los strings son únicos; `false` si hay duplicados.
     */
    static hasUniqueStrings(arr: string[]): boolean {
        return new Set(arr).size === arr.length;
    }

    static dividirEnGrupos(array: number[], tamanoGrupo: number): [][] {
        const grupos = [];
        for (let i = 0; i < array.length; i += tamanoGrupo) {
            const grupoActual = array.slice(i, i + tamanoGrupo);
            grupos.push(grupoActual);
        }
        return grupos;
    }
}
