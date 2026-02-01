import { Survey, Response } from './types';

const SURVEYS_KEY = 'survey_app_surveys';
const RESPONSES_KEY = 'survey_app_responses';

export const getSurveys = (): Survey[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(SURVEYS_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const saveSurvey = (survey: Survey) => {
    const surveys = getSurveys();
    surveys.push(survey);
    localStorage.setItem(SURVEYS_KEY, JSON.stringify(surveys));
};

export const getSurvey = (id: string): Survey | undefined => {
    const surveys = getSurveys();
    return surveys.find(s => s.id === id);
};

export const saveResponse = (response: Response) => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(RESPONSES_KEY);
    const responses = stored ? JSON.parse(stored) : [];
    responses.push(response);
    localStorage.setItem(RESPONSES_KEY, JSON.stringify(responses));
};

export const getResponses = (surveyId: string): Response[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(RESPONSES_KEY);
    const responses: Response[] = stored ? JSON.parse(stored) : [];
    return responses.filter(r => r.surveyId === surveyId);
};
