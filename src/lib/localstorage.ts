class LocalStorage {
    setItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }
    getItem(key: string, parse: boolean = true) {
        return parse ? JSON.parse(localStorage.getItem(key) || "{}") : localStorage.getItem(key);
    }
}


export default new LocalStorage();