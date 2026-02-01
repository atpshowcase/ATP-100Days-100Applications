export interface Question {
    id: string;
    text: string;
    type: 'text' | 'choice' | 'rating';
    options?: string[]; // For choice questions
}

export interface Survey {
    id: string;
    title: string;
    description: string;
    questions: Question[];
    createdAt: number;
}

export interface Response {
    surveyId: string;
    answers: { [questionId: string]: string | number };
    submittedAt: number;
}
