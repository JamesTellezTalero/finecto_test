// class-mapper-utils.spec.ts
import { ClassMapperUtils } from "../class_mapper.utils";
import { plainToInstance } from "class-transformer";
import "reflect-metadata";
import { Expose } from "class-transformer";

class UserWithExpose {
    @Expose()
    id: number;

    @Expose()
    name: string;
}

class UserWithoutExpose {
    id: number;
    name: string;
}

describe("ClassMapperUtils", () => {
    describe("toSingleInstance", () => {
        it("no debería funcionar con clase SIN @Expose", () => {
            const raw = { id: 1, name: "Ana" };
            const result = ClassMapperUtils.toSingleInstance(
                raw,
                UserWithoutExpose
            );

            expect(result).toBeInstanceOf(UserWithoutExpose);
            expect(result.id).toBeUndefined();
            expect(result.name).toBeUndefined();
        });

        it("debería funcionar con clase CON @Expose", () => {
            const raw = { id: 2, name: "Luis" };
            const result = ClassMapperUtils.toSingleInstance(
                raw,
                UserWithExpose
            );

            expect(result).toBeInstanceOf(UserWithExpose);
            expect(result.id).toBe(2);
            expect(result.name).toBe("Luis");
        });

        it("debería ignorar propiedades no expuestas si se usa excludeExtraneousValues", () => {
            const raw = { id: 3, name: "Marta", extra: "debería ignorarse" };
            const result = ClassMapperUtils.toSingleInstance(
                raw,
                UserWithExpose
            );

            expect(result).toBeInstanceOf(UserWithExpose);
            expect(result.id).toBe(3);
            expect(result.name).toBe("Marta");
            expect((result as any).extra).toBeUndefined();
        });
    });
});
