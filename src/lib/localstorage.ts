class LocalStorage {
    setItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }
    getItem(key: string) {
        return JSON.parse(localStorage.getItem(key) || "{}");
    }
}


export default new LocalStorage();