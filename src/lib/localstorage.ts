export function getItemWithDefault(key: string, defaultValue: string) {
    return localStorage.getItem(key) || defaultValue;
}



