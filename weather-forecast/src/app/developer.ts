export interface DEVELOPER {
    id: number;
    firstName: string;
    secondName: string;
    photoURL: string;
    git: string;
    features: string[];
    aboutAuthor: string;
    alt: string;
  }
  export const DEVELOPERS: DEVELOPER[] = [
    {
      id: 1,
      firstName: 'Alexander',
      secondName: 'Malchevsky',
      photoURL: 'https://avatars.githubusercontent.com/u/91604689?v=4',
      git: 'https://github.com/malickalex1975',
      features: [],
      alt: '',
      aboutAuthor:
        'Hello! A little about myself, I have three passions: traveling, cars and programming. The third passion is the strongest. I love coding, and no matter what project it is, the final task for Angular or some ordinary one, no matter what language it is, Java Script or Python, I just love it and give it my all.',
    },
]