import { FuzzyTime } from './fuzzyTime';
import {
    HOURS,
    MINUTES,
    PREPOSITIONS,
    SPECIAL_CASES,
    onTheHourTemplate,
    template
} from './timeInWords';
import { TimeOfDay } from './enums';

export class Clock {
    private time: FuzzyTime;
    private content!: string;

    constructor(date: Date = new Date()) {
        this.time = new FuzzyTime(date);
        this.refreshContent();
    }

    private getMinutesInWords(): string {
        return MINUTES[this.time.getMinutes()];
    }

    private getHoursInWords(): string {
        return HOURS[this.time.getHours()];
    }

    private getPreposition(): string {
        const fuzzyFactor = this.time.getFuzzyFactor();
        const prepositions = PREPOSITIONS[fuzzyFactor];
        return fuzzyFactor === 0 ? this.pickOne(['', ...prepositions]) : this.pickOne(prepositions);
    }

    private pickOne(elements: string[]): string {
        const index = Math.floor(Math.random() * elements.length);
        return elements[index];
    }

    private refreshContent(date: Date = new Date()): void {
        this.time = new FuzzyTime(date);
        const specialCase = SPECIAL_CASES[this.time.to24HourString()];

        if (specialCase) {
            this.content = specialCase;
        } else {
            const currentTemplate = this.time.getMinutes() ? template : onTheHourTemplate;
            this.content = currentTemplate.replace(/\{\{\s*(\w+)\s*\}\}/g, (_match, token) => {
                switch (token) {
                    case 'p':
                        return this.getPreposition();
                    case 'm':
                        return this.getMinutesInWords();
                    case 'h':
                        return this.getHoursInWords();
                    default:
                        return '';
                }
            });
        }
    }

    getContent(): string {
        return this.content;
    }

    refresh(date: Date = new Date()): void {
        this.refreshContent(date);
    }

    getTimeOfDay = (): TimeOfDay => {
        const currentHour = new Date().getHours();

        if (currentHour >= 5 && currentHour < 6) {
            return TimeOfDay.EARLY_MORNING; // 5 AM to 6 AM
        } else if (currentHour >= 6 && currentHour < 9) {
            return TimeOfDay.MORNING; // 6 AM to 9 AM
        } else if (currentHour >= 9 && currentHour < 18) {
            return TimeOfDay.DAY; // 9 AM to 6 PM
        } else if (currentHour >= 18 && currentHour < 19) {
            return TimeOfDay.EVENING; // 6 PM to 7 PM
        } else {
            return TimeOfDay.NIGHT; // 7 PM to 5 AM
        }
    };
      
}