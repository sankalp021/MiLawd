'use client';
import { useState, useEffect, useRef } from 'react';
import Graph from './Graph';
import Card from './Card';
import { dummyCases, Case } from '../data/dummyCases';

interface CaseDisplayProps {
  searchQuery: string;
}

interface StatItemProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon?: React.ReactNode;
}

function StatItem({ label, value, subValue, icon }: StatItemProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-2">
      {icon && <div className="text-gray-400">{icon}</div>}
      <div>
        <div className="text-sm font-medium text-gray-500">{label}</div>
        <div className="text-lg font-semibold text-gray-900">{value}</div>
        {subValue && (
          <div className="text-xs text-gray-500 mt-0.5">{subValue}</div>
        )}
      </div>
    </div>
  );
}

export default function CaseDisplay({ searchQuery }: CaseDisplayProps) {
  const [cases, setCases] = useState<Case[]>(dummyCases);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Filter cases when searchQuery changes and clear selection.
  useEffect(() => {
    if (searchQuery) {
      const filtered = dummyCases.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCases(filtered);
      console.log('[Search] Filtered cases:', filtered.map(c => c.id));
    } else {
      setCases(dummyCases);
      console.log('[Search] Reset cases to dummyCases');
    }
    setSelectedCase(null);
  }, [searchQuery]);

  // Updated scrolling logic with better handling
  useEffect(() => {
    if (selectedCase) {
      console.log('[Scroll] Attempting to scroll to:', selectedCase.id);
      
      // Give time for DOM to update
      setTimeout(() => {
        // Handle mobile scroll (horizontal)
        const mobileContainer = document.querySelector('.mobile-cards-container');
        const mobileCard = mobileContainer?.querySelector(`[data-case-id="${selectedCase.id}"]`);
        
        // Handle desktop scroll (vertical)
        const desktopContainer = document.querySelector('.desktop-cards-container');
        const desktopCard = desktopContainer?.querySelector(`[data-case-id="${selectedCase.id}"]`);

        if (window.innerWidth < 768 && mobileCard) {
          mobileCard.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest'
          });
          console.log('[Scroll] Scrolled mobile card into view');
        } else if (desktopCard) {
          desktopCard.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
          console.log('[Scroll] Scrolled desktop card into view');
        } else {
          console.error('[Scroll] No card element found');
        }
      }, 100);
    }
  }, [selectedCase]);

  // Display only non-reference cases
  const relatedCases = cases.filter(c => !c.isReference);

  // When a node in the graph is clicked, update the selection.
  const onGraphNodeClick = (node: Case) => {
    if (!node.isReference) {
      console.log('[Graph] Node clicked:', node.id);
      setSelectedCase(node);
    }
  };

  const stats = {
    totalCases: relatedCases.length,
    recentCases: relatedCases.filter(c => c.year >= 2020).length,
    avgSimilarity: (relatedCases.reduce((acc, c) => acc + c.similarityScore, 0) / relatedCases.length * 100).toFixed(0),
    highestSimilarity: (Math.max(...relatedCases.map(c => c.similarityScore)) * 100).toFixed(0),
    yearRange: {
      start: Math.min(...relatedCases.map(c => c.year)),
      end: Math.max(...relatedCases.map(c => c.year))
    },
    mostRelevantCase: relatedCases.reduce((prev, curr) => 
      prev.similarityScore > curr.similarityScore ? prev : curr
    )
  };

  return (
    <div className="flex flex-col w-full h-full md:h-[calc(100vh-4.5rem)] gap-2">
      <div className="flex flex-col md:flex-row gap-2 flex-1 min-h-0">
        <div className="w-full md:w-[72%] flex flex-col gap-2">
          {/* Stats Panel - Single column on mobile */}
          <div className="bg-white rounded-lg shadow-sm p-2">
            <div className="bg-gray-50 rounded-lg p-1 overflow-x-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-1 md:gap-0 md:divide-x divide-gray-200">
                <StatItem
                  label="Total Cases"
                  value={stats.totalCases}
                  subValue={`${stats.recentCases} from last 3 years`}
                />
                <StatItem
                  label="Similarity Score"
                  value={`${stats.avgSimilarity}%`}
                  subValue={`Highest: ${stats.highestSimilarity}%`}
                />
                <StatItem
                  label="Year Range"
                  value={`${stats.yearRange.start} - ${stats.yearRange.end}`}
                  subValue={`${stats.yearRange.end - stats.yearRange.start + 1} years span`}
                />
                <StatItem
                  label="Most Relevant"
                  value={stats.mostRelevantCase.name.substring(0, 20) + "..."}
                  subValue={`${(stats.mostRelevantCase.similarityScore * 100).toFixed(0)}% similar`}
                />
              </div>
            </div>
          </div>

          {/* Mobile-only: Horizontal scrolling cards */}
          <div className="md:hidden bg-white rounded-lg shadow-sm p-2">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-gray-800">Similar Cases</h2>
              <p className="text-xs text-gray-500">{relatedCases.length} found</p>
            </div>
            <div 
              className="mobile-cards-container flex overflow-x-auto gap-4 pb-3"
              ref={listContainerRef}
            >
              {relatedCases.map((item) => (
                <div
                  key={item.id}
                  data-case-id={item.id}
                  onClick={() => setSelectedCase(item)}
                  className={`flex-none w-[95%] snap-center ${
                    selectedCase?.id === item.id ? 'scale-[1.02] shadow-md' : ''
                  }`}
                >
                  <Card 
                    source={item.description}
                    title={item.name}
                    caseId={item.id}
                    date={`Year: ${item.year}`}
                    polarity={item.similarityScore} // Pass the raw similarityScore directly
                    {...item}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Graph Container - Improved mobile layout */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-2 flex-1">
            <div className="relative h-[60vh] md:h-full">
              {/* Updated Year Range Legend with mobile-first styling */}
              <div className="absolute top-2 right-2 z-10 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1.5 shadow-sm border border-gray-100">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#99E1B5]" />
                    <span className="text-[10px] md:text-xs font-medium text-gray-600">Older Cases</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#1A4731]" />
                    <span className="text-[10px] md:text-xs font-medium text-gray-600">Newer Cases</span>
                  </div>
                </div>
              </div>

              <div className="w-full h-full">
                <Graph cases={cases} onNodeClick={onGraphNodeClick} />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop-only: Right sidebar with vertical cards */}
        <div className="hidden md:flex w-[28%] flex-col bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="sticky top-0 bg-white z-10 p-2 border-b">
            <h2 className="text-sm font-semibold text-gray-800">Similar Cases</h2>
            <p className="text-xs text-gray-500">{relatedCases.length} cases found</p>
          </div>
          <div className="desktop-cards-container flex flex-col gap-3 p-3 overflow-y-auto">
            {relatedCases.map((item) => (
              <div
                key={item.id}
                data-case-id={item.id}
                onClick={() => setSelectedCase(item)}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedCase?.id === item.id ? 'scale-[1.02] shadow-md' : ''
                }`}
              >
                <Card 
                  source={item.description}
                  title={item.name}
                  caseId={item.id}
                  date={`Year: ${item.year}`}
                  polarity={item.similarityScore} // Pass the raw similarityScore directly
                  {...item}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
