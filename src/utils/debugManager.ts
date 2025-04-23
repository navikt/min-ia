export enum DebugKeys {
	VIS_SE_SAMARBEID_KNAPP = 'visSeSamarbeidsknapp',
};

class DebugManager {
	private static instance: DebugManager;
	private storageKey = 'debugManagerData';

	private constructor() {}

	static getInstance(): DebugManager {
		if (!DebugManager.instance) {
			DebugManager.instance = new DebugManager();
		}
		return DebugManager.instance;
	}

	private getStorageData(): Record<string, string> {
		const data = localStorage.getItem(this.storageKey);
		return data ? JSON.parse(data) : {};
	}

	private setStorageData(data: Record<string, string>): void {
		localStorage.setItem(this.storageKey, JSON.stringify(data));
		window.location.reload();
	}

	setItem(key: string, value: string): void {
		const data = this.getStorageData();
		data[key] = value;
		this.setStorageData(data);
	}

	setItemBoolean(key: string, value: boolean): void {
		this.setItem(key, value ? 'true' : 'false');
	}

	getItem(key: string): string | null {
		const data = this.getStorageData();
		return data[key] || null;
	}

	getItemBoolean(key: string): boolean {
		const value = this.getItem(key);
		return value === 'true';
	}

	removeItem(key: string): void {
		const data = this.getStorageData();
		delete data[key];
		this.setStorageData(data);
	}

	clear(): void {
		this.setStorageData({});
	}
}

export default DebugManager;