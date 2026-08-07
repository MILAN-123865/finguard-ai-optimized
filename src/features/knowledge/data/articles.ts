import { bankingArticles } from './bankingArticles';
import { paymentsArticles } from './paymentsArticles';
import { socialArticles } from './socialArticles';
import { mobileArticles } from './mobileArticles';
import { identityArticles } from './identityArticles';
import { financialArticles } from './financialArticles';
import { employmentArticles } from './employmentArticles';
import { investmentArticles } from './investmentArticles';
import { fraudArticles } from './fraudArticles';

export interface FAQ {
  question: string;
  answer: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author?: string;
  severity?: 'Low' | 'Medium' | 'High' | 'Critical';
  difficultyLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
  tags?: string[];
  heroImage: string;
  description: string;
  howItWorks: string[];
  warningSigns: string[];
  preventionTips: string[];
  realExample: {
    title: string;
    description: string;
  };
  faqs: FAQ[];
  relatedIds: string[];
  isTrending?: boolean;
  content?: string;
}

export const articles: Article[] = [
  ...bankingArticles,
  ...paymentsArticles,
  ...socialArticles,
  ...mobileArticles,
  ...identityArticles,
  ...financialArticles,
  ...employmentArticles,
  ...investmentArticles,
  ...fraudArticles
];
