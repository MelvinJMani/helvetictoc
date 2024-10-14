export const HOURS = [
  'twelve', 'one', 'two', 'three', 'four', 'five', 'six',
  'seven', 'eight', 'nine', 'ten', 'eleven'
];

export const MINUTES: {
  [key: number]: string
} = {
  5: 'five past',
  10: 'ten past',
  15: 'quarter past',
  20: 'twenty past',
  25: 'twenty-five past',
  30: 'half past',
  35: 'twenty-five to',
  40: 'twenty to',
  45: 'quarter to',
  50: 'ten to',
  55: 'five to'
};

export const PREPOSITIONS: {
  [key: number]: string[]
} = {
  '-1': ['almost', 'nearly'],
  '0': ['exactly', 'precisely', 'now', ''],
  '1': ['about', 'around', 'just after', 'right after', 'shortly after']
};

const roundAbout = 'It’s ’round about<br>midnight.';

export const SPECIAL_CASES: {
  [key: string]: string
} = {
  '23:58': roundAbout,
  '23:59': roundAbout,
  '00:00': 'It’s<br> midnight.',
  '00:01': roundAbout,
  '00:02': roundAbout,
  '12:00': 'It’s<br> noon.'
};

export const onTheHourTemplate = "It’s {{ p }}<br>{{ h }} o’clock.";
export const template = "It’s {{ p }}<br>{{ m }}<br>{{ h }}.";