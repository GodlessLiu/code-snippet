class LocalStorage {
    setItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }
    getItem(key: string) {
        return localStorage.getItem(key);
    }
}


export default new LocalStorage();