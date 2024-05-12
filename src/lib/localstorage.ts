class LocalStorage {
    setItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }
    getItem(key: string) {
        return localStorage.getItem(key);
    }
    getItemWithDefault(key: string, defaultValue: string) {
        return localStorage.getItem(key) || defaultValue;
    }
    runFnWithLocalStorage(key: string, value: string, fn: (value: string) => void) {
        fn(value)
        this.setItem(key, value)
    }
}


export const Localstorage = new LocalStorage();

