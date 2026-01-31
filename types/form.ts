// Type definitions for form schema and submissions

export type QuestionType = 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'section';

export interface FormQuestion {
  id: string;
  type: QuestionType;
  label: string;
  required: boolean;
  options?: string[]; // For select, checkbox, radio
  placeholder?: string;
}

export type FormSchema = FormQuestion[];

export interface FormAnswers {
  [questionId: string]: string | string[] | boolean;
}

export interface FormData {
  id: string;
  title: string;
  slug: string;
  description?: string;
  clientName?: string;
  schema: FormSchema;
  createdAt: Date;
}

export interface SubmissionData {
  id: string;
  formId: string;
  clientEmail?: string;
  answers: FormAnswers;
  submittedAt: Date;
}
