import { SimulationNodeDatum } from 'd3';

export interface Case extends SimulationNodeDatum {
  id: string;
  name: string;  // Add name field
  description: string;
  year: number;
  similarityScore: number;
  relatedCases: string[];
  isReference?: boolean;  // Add this field
}

export const newCase: Case = {
  id: 'NEW-2024',
  name: 'Current Case Under Analysis',
  description: 'A dispute regarding the taxability of income earned through artificial intelligence models and machine learning algorithms...',
  year: 2024,
  similarityScore: 1.0, // Reference case has max similarity
  isReference: true,
  relatedCases: ['2023-8901', '2021-9012', '2022-4567']
};

export const dummyCases: Case[] = [
  newCase,  // Add the reference case first
  {
    id: '2015-4889',
    name: 'ABC Company vs. Commissioner of Income Tax',
    description: 'The appellant, ABC Company, appeals against the decision of the Commissioner rejecting its claim for input tax deduction...',
    year: 2015,
    similarityScore: 0.85,
    relatedCases: ['2016-1234', '2019-3456']
  },
  {
    id: '2016-1234',
    name: 'XYZ Corporation Tax Interpretation Case',
    description: 'This case concerns a dispute between XYZ Corporation and the tax authorities regarding the interpretation of Section 80...',
    year: 2016,
    similarityScore: 0.75,
    relatedCases: ['2015-4889', '2017-5678']
  },
  {
    id: '2017-5678',
    name: 'Property Deduction Assessment Appeal',
    description: 'The matter relates to the assessment year 2015-16 wherein the assessee claimed deduction under section 54F...',
    year: 2017,
    similarityScore: 0.92,
    relatedCases: ['2016-1234', '2018-9012']
  },
  {
    id: '2018-9012',
    name: 'Software Royalty Classification Dispute',
    description: 'The primary issue before this court is whether the income derived from software development services constitutes royalty...',
    year: 2018,
    similarityScore: 0.68,
    relatedCases: ['2017-5678']
  },
  {
    id: '2019-3456',
    name: 'Depreciation Claim Review',
    description: 'This appeal by the revenue is directed against the order of the CIT(A) allowing the assessee\'s claim for depreciation...',
    year: 2019,
    similarityScore: 0.79,
    relatedCases: ['2015-4889']
  },
  {
    id: '2020-7123',
    name: 'Renewable Energy Tax Benefits Case',
    description: 'The petitioner challenges the constitutional validity of Section 13B of the Income Tax Act relating to deduction claims for renewable energy investments...',
    year: 2020,
    similarityScore: 0.88,
    relatedCases: ['2019-3456', '2021-9012']
  },
  {
    id: '2021-9012',
    name: 'Cryptocurrency Income Classification',
    description: 'This reference application under Section 256(1) concerns the treatment of cryptocurrency gains as business income versus capital gains...',
    year: 2021,
    similarityScore: 0.95,
    relatedCases: ['2020-7123', '2022-4567']
  },
  {
    id: '2022-4567',
    name: 'GST on Cross-Border Digital Services',
    description: 'A landmark case examining the applicability of GST on cross-border digital services and the concept of "intermediary services"...',
    year: 2022,
    similarityScore: 0.91,
    relatedCases: ['2021-9012', '2023-8901']
  },
  {
    id: '2023-8901',
    name: 'AI-Generated Content Tax Deduction',
    description: 'The tribunal examines whether AI-generated content can be classified as "original literary work" for tax deduction purposes under Section 80RRB...',
    year: 2023,
    similarityScore: 0.89,
    relatedCases: ['2022-4567', '2021-9012']
  },
  {
    id: '2019-5555',
    name: 'Software License Royalty Dispute',
    description: 'Dispute regarding the characterization of payments for software licenses as royalty under the India-US Double Taxation Avoidance Agreement...',
    year: 2019,
    similarityScore: 0.82,
    relatedCases: ['2018-9012', '2020-7123']
  },
  {
    id: '2020-6666',
    name: 'Transfer Pricing in R&D Cost Contribution',
    description: 'Assessment of transfer pricing implications in cases involving cost contribution arrangements for R&D activities...',
    year: 2020,
    similarityScore: 0.78,
    relatedCases: ['2019-5555', '2021-9012']
  },
  {
    id: '2021-7777',
    name: 'NFT Income Taxability Examination',
    description: 'Examination of the taxability of income from non-fungible tokens (NFTs) and their classification under various heads of income...',
    year: 2021,
    similarityScore: 0.93,
    relatedCases: ['2021-9012', '2022-4567']
  },
  {
    id: '2022-8888',
    name: 'CSR Expenditure Deductibility Analysis',
    description: 'Analysis of the deductibility of CSR expenditure under Section 37 in light of recent amendments and judicial precedents...',
    year: 2022,
    similarityScore: 0.86,
    relatedCases: ['2023-8901', '2021-7777']
  }
];
