export class FuzzyTime {
    private hours: number;
    private minutes: number;
    private period: string;

    constructor(date: Date = new Date()) {
        this.hours = date.getHours();
        this.minutes = date.getMinutes();
        this.period = 'am';
    }

    getHours(): number {
        let hours = this.hours;
        if (this.minutes > 32) {
            hours = hours === 23 ? 0 : hours + 1;
        }
        if (hours > 11) {
            hours = hours - 12;
            this.period = 'pm';
        }
        return hours;
    }

    getMinutes(): number {
        const roundedMinutes = Math.round(this.minutes / 5) * 5;
        return roundedMinutes === 60 ? 0 : roundedMinutes;
    }

    getPeriod(): string {
        return this.period;
    }

    isNight(): boolean {
        return this.hours >= 18 || this.hours < 6;
    }

    isDay(): boolean {
        return !this.isNight();
    }

    getFuzzyFactor(): number {
        const remainder = this.minutes % 5;
        if (remainder === 1 || remainder === 2) return 1;
        if (remainder === 3 || remainder === 4) return -1;
        return 0;
    }

    isEqual(t: FuzzyTime): boolean {
        return t.toString() === this.toString();
    }

    toString(): string {
        return `${this.pad(this.getHours())}:${this.pad(this.getMinutes())}ff${this.getFuzzyFactor()} ${this.getPeriod()}`;
    }

    to24HourString(): string {
        return `${this.pad(this.hours)}:${this.pad(this.minutes)}`;
    }

    private pad(num: number): string {
        return num < 10 ? `0${num}` : num.toString();
    }
}