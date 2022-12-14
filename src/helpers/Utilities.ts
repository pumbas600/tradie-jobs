import { ThemeTypings } from '@chakra-ui/react';

export function capitalise(str: string): string {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}

/**
 * Generates a random integer between 0 and the upper limit (inclusive).
 *
 * @param upperLimit The upper limit for the random integer
 */
export function randint(upperLimit: number): number {
    return Math.floor(Math.random() * (upperLimit + 1));
}

/**
 * Generates a random integer between the lower limit and the upper limit (inclusive).
 *
 * @param lowerLimit The lower limit for the random integer
 * @param upperLimit The upper limit for the random integer
 */
export function randBetween(lowerLimit: number, upperLimit: number): number {
    return randint(upperLimit - lowerLimit) + lowerLimit;
}

// From https://stackoverflow.com/a/56264925/12643981
export function randomEnum<T extends {}>(anEnum: T): T[keyof T] {
    const enumValues = allValues(anEnum);
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
}

export function allValues<T extends {}>(anEnum: T): T[keyof T][] {
    return Object.values(anEnum) as unknown as T[keyof T][];
}

export function asCssVar(colour: ThemeTypings['colors']): string {
    const modified = colour.replaceAll('.', '-');
    return `var(--chakra-colors-${modified})`;
}

export function darken(colour: ThemeTypings['colors'], amount = 100): ThemeTypings['colors'] {
    const split = colour.split('.', 2);
    if (split.length !== 2) return colour;

    const shade = Number.parseInt(split[1]);
    if (isNaN(shade)) return colour;

    // Increase the shade by a specific amount
    return `${split[0]}.${shade + amount}`;
}
