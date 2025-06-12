/**
 * Utilidades para manipulación y formateo de fechas.
 */
export class DateUtils {
    /**
     * Obtiene la fecha anterior con la hora en 00:00:00.000 (inicio del día).
     * @returns Fecha anterior con hora cero.
     */
    static getZeroHourForCurrentDate(): Date {
        const newDate = new Date();
        newDate.setHours(0, 0, 0, 0);
        newDate.setDate(newDate.getDate() - 3);
        return newDate;
    }

    /**
     * Obtiene la fecha anterior con la hora en 23:59:59.999 (fin del día).
     * @returns Fecha anterior con hora final del día.
     */
    static getLastHourForCurrentDate(): Date {
        const newDate = new Date();
        newDate.setHours(23, 59, 59, 999);
        newDate.setDate(newDate.getDate() - 1);
        return newDate;
    }

    /**
     * Obtiene la fecha correspondiente a una cantidad específica de días atrás desde hoy.
     * @param days Número de días hacia atrás desde hoy.
     * @returns Fecha con la cantidad de días restados.
     */
    static getDaysAgo(days: number): Date {
        const today = new Date();
        today.setDate(today.getDate() - days);
        return today;
    }

    /**
     * Formatea una fecha en formato corto para Colombia (es-CO),
     * incluyendo día, mes, año, hora y minutos en formato 12 horas.
     * @param date Fecha a formatear.
     * @returns Cadena con la fecha formateada.
     */
    static formatShortDate(date: Date): string {
        return new Intl.DateTimeFormat("es-CO", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        }).format(date);
    }

    /**
     * Formatea una fecha en formato largo para Colombia (es-CO),
     * incluyendo día de la semana, día, mes, año, hora, minutos y segundos en formato 12 horas.
     * @param date Fecha a formatear.
     * @returns Cadena con la fecha formateada en formato largo.
     */
    static formatLongDate(date: Date): string {
        return new Intl.DateTimeFormat("es-CO", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        }).format(date);
    }

    /**
     * Formatea una fecha en un string compatible con PostgreSQL para la zona horaria de Bogotá,
     * con formato "YYYY-MM-DD HH:mm:ss".
     * @param date Fecha a formatear.
     * @returns Fecha en formato string compatible con PostgreSQL.
     */
    static formatDateForPostgresBogota(date: Date): string {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const hh = String(date.getHours()).padStart(2, "0");
        const mi = String(date.getMinutes()).padStart(2, "0");
        const ss = String(date.getSeconds()).padStart(2, "0");

        return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
    }

    /**
     * Formatea una fecha en un string compatible con PostgreSQL para la zona horaria de Bogotá,
     * con formato "YYYY-MM-DD HH:mm:ss".
     * @param date Fecha a formatear.
     * @returns Fecha en formato string compatible con PostgreSQL.
     */
    static bogotaFormatDate(date: Date, days: number = 0): string {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate() - days).padStart(2, "0");

        return `${yyyy}-${mm}-${dd}`;
    }
}
