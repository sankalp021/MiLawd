import { SimulationNodeDatum } from 'd3';

export interface Case extends SimulationNodeDatum {
  id: string;
  description: string;
  year: number;
  similarityScore: number;
  relatedCases: string[];
}

export const dummyCases: Case[] = [
  {
    id: '2015-4889',
    description: 'The appellant, ABC Company, appeals against the decision of the Commissioner rejecting its claim for input tax deduction...',
    year: 2015,
    similarityScore: 0.85,
    relatedCases: ['2016-1234', '2019-3456']
  },
  {
    id: '2016-1234',
    description: 'This case concerns a dispute between XYZ Corporation and the tax authorities regarding the interpretation of Section 80...',
    year: 2016,
    similarityScore: 0.75,
    relatedCases: ['2015-4889', '2017-5678']
  },
  {
    id: '2017-5678',
    description: 'The matter relates to the assessment year 2015-16 wherein the assessee claimed deduction under section 54F...',
    year: 2017,
    similarityScore: 0.92,
    relatedCases: ['2016-1234', '2018-9012']
  },
  {
    id: '2018-9012',
    description: 'The primary issue before this court is whether the income derived from software development services constitutes royalty...',
    year: 2018,
    similarityScore: 0.68,
    relatedCases: ['2017-5678']
  },
  {
    id: '2019-3456',
    description: 'This appeal by the revenue is directed against the order of the CIT(A) allowing the assessee\'s claim for depreciation...',
    year: 2019,
    similarityScore: 0.79,
    relatedCases: ['2015-4889']
  },
  {
    id: '2020-7123',
    description: 'The petitioner challenges the constitutional validity of Section 13B of the Income Tax Act relating to deduction claims for renewable energy investments...',
    year: 2020,
    similarityScore: 0.88,
    relatedCases: ['2019-3456', '2021-9012']
  },
  {
    id: '2021-9012',
    description: 'This reference application under Section 256(1) concerns the treatment of cryptocurrency gains as business income versus capital gains...',
    year: 2021,
    similarityScore: 0.95,
    relatedCases: ['2020-7123', '2022-4567']
  },
  {
    id: '2022-4567',
    description: 'A landmark case examining the applicability of GST on cross-border digital services and the concept of "intermediary services"...',
    year: 2022,
    similarityScore: 0.91,
    relatedCases: ['2021-9012', '2023-8901']
  },
  {
    id: '2023-8901',
    description: 'The tribunal examines whether AI-generated content can be classified as "original literary work" for tax deduction purposes under Section 80RRB...',
    year: 2023,
    similarityScore: 0.89,
    relatedCases: ['2022-4567', '2021-9012']
  },
  {
    id: '2019-5555',
    description: 'Dispute regarding the characterization of payments for software licenses as royalty under the India-US Double Taxation Avoidance Agreement...',
    year: 2019,
    similarityScore: 0.82,
    relatedCases: ['2018-9012', '2020-7123']
  },
  {
    id: '2020-6666',
    description: 'Assessment of transfer pricing implications in cases involving cost contribution arrangements for R&D activities...',
    year: 2020,
    similarityScore: 0.78,
    relatedCases: ['2019-5555', '2021-9012']
  },
  {
    id: '2021-7777',
    description: 'Examination of the taxability of income from non-fungible tokens (NFTs) and their classification under various heads of income...',
    year: 2021,
    similarityScore: 0.93,
    relatedCases: ['2021-9012', '2022-4567']
  },
  {
    id: '2022-8888',
    description: 'Analysis of the deductibility of CSR expenditure under Section 37 in light of recent amendments and judicial precedents...',
    year: 2022,
    similarityScore: 0.86,
    relatedCases: ['2023-8901', '2021-7777']
  }
];
