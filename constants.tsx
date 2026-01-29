
import React from 'react';
import { Question, QuestionType } from './types';

export const COLORS = {
  TEAL: '#4c9fa9',
  NAVY: '#34286e',
  PURPLE: '#5e4394',
  LIGHT: '#f8fafc'
};

export const ILAC_LOGO = (
  <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" stroke="url(#logoGrad)" strokeWidth="8" />
    <path d="M30 70 L50 30 L70 70" stroke={COLORS.NAVY} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M40 55 H60" stroke={COLORS.TEAL} strokeWidth="6" strokeLinecap="round" />
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={COLORS.TEAL} />
        <stop offset="100%" stopColor={COLORS.NAVY} />
      </linearGradient>
    </defs>
  </svg>
);

export const QUESTIONS: Question[] = [
  // A1
  { id: 1, type: QuestionType.MULTIPLE_CHOICE, level: 'A1', text: 'I ___ from Argentina. And you?', options: ['am', 'is', 'are', 'be'], correctAnswer: 'am' },
  { id: 2, type: QuestionType.MULTIPLE_CHOICE, level: 'A1', text: '___ you a pilot?', options: ['Do', 'Are', 'Is', 'Have'], correctAnswer: 'Are' },
  { id: 3, type: QuestionType.MULTIPLE_CHOICE, level: 'A1', text: 'Where ___ your brother work?', options: ['do', 'is', 'does', 'are'], correctAnswer: 'does' },
  // A2
  { id: 4, type: QuestionType.MULTIPLE_CHOICE, level: 'A2', text: 'Last week, we ___ to the flight simulator.', options: ['go', 'goes', 'went', 'gone'], correctAnswer: 'went' },
  { id: 5, type: QuestionType.MULTIPLE_CHOICE, level: 'A2', text: 'This aircraft is ___ than the old model.', options: ['big', 'bigger', 'more big', 'biggest'], correctAnswer: 'bigger' },
  { id: 6, type: QuestionType.WRITING, level: 'A2', text: 'Describe your typical day in 2 sentences.' },
  // B1
  { id: 7, type: QuestionType.READING, level: 'B1', context: 'Weather conditions are critical for safe takeoffs. Pilots must check visibility and wind speed before taxiing.', text: 'What is essential for a safe takeoff according to the text?', options: ['The time of day', 'Weather conditions', 'Passenger count', 'The type of fuel'], correctAnswer: 'Weather conditions' },
  { id: 8, type: QuestionType.MULTIPLE_CHOICE, level: 'B1', text: 'I have been studying aviation ___ three years.', options: ['since', 'for', 'during', 'from'], correctAnswer: 'for' },
  { id: 9, type: QuestionType.MULTIPLE_CHOICE, level: 'B1', text: 'If it rains, the flight ___ delayed.', options: ['is', 'will be', 'would be', 'was'], correctAnswer: 'will be' },
  { id: 10, type: QuestionType.SPEAKING, level: 'B1', text: 'Read aloud: "The captain requested permission to land due to low fuel levels."' },
  // B2
  { id: 11, type: QuestionType.MULTIPLE_CHOICE, level: 'B2', text: 'The crew ___ the safety checks by the time we boarded.', options: ['finished', 'had finished', 'have finished', 'were finishing'], correctAnswer: 'had finished' },
  { id: 12, type: QuestionType.MULTIPLE_CHOICE, level: 'B2', text: 'You ___ smoke during the flight. It is strictly prohibited.', options: ['mustn\'t', 'shouldn\'t', 'don\'t have to', 'might not'], correctAnswer: 'mustn\'t' },
  { id: 13, type: QuestionType.WRITING, level: 'B2', text: 'Why do you think English is the official language of aviation? (3-4 sentences)' },
  { id: 14, type: QuestionType.MULTIPLE_CHOICE, level: 'B2', text: 'I don\'t mind ___ late if the job gets done.', options: ['work', 'working', 'to work', 'worked'], correctAnswer: 'working' },
  // C1
  { id: 15, type: QuestionType.READING, level: 'C1', context: 'The rapid advancement of autonomous flight technology poses significant ethical dilemmas regarding accountability in the event of system failure.', text: 'What is a primary concern about autonomous flight?', options: ['Cost of technology', 'Fuel efficiency', 'Accountability in failures', 'Speed of travel'], correctAnswer: 'Accountability in failures' },
  { id: 16, type: QuestionType.MULTIPLE_CHOICE, level: 'C1', text: 'Only after the storm had passed ___ the airport to reopen.', options: ['did the authorities allow', 'the authorities allowed', 'was allowed', 'had allowed'], correctAnswer: 'did the authorities allow' },
  { id: 17, type: QuestionType.SPEAKING, level: 'C1', text: 'Explain briefly: "How does technology impact modern flight safety?"' },
  { id: 18, type: QuestionType.MULTIPLE_CHOICE, level: 'C1', text: 'I wish I ___ more attention to the technical manual earlier.', options: ['paid', 'had paid', 'would pay', 'have paid'], correctAnswer: 'had paid' },
  // C2 / Mixed
  { id: 19, type: QuestionType.WRITING, level: 'C1/C2', text: 'Compare the advantages and disadvantages of commercial vs. private aviation.' },
  { id: 20, type: QuestionType.MULTIPLE_CHOICE, level: 'C2', text: 'The success of the mission was ___ on the precision of the navigation.', options: ['contingent', 'relative', 'bound', 'liable'], correctAnswer: 'contingent' }
];
