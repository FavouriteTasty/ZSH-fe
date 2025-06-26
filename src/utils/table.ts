export type ColumnName<T extends string> = `${Uppercase<T>}`;

export const generateColumns = <T extends Record<string, unknown>>(
    keys: (keyof T)[],
    sortableKeys?: (keyof T)[],
    excludeKeys?: (keyof T)[],
) => {
    return keys
        .filter((key) => !excludeKeys?.includes(key))
        .map((key) => ({
            name: key.toString().toUpperCase() as ColumnName<string>,
            uid: key,
            sortable: sortableKeys?.includes(key) || false,
        }));
};
