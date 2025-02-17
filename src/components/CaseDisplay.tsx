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

  // When selectedCase changes, attempt to scroll its card into view.
  useEffect(() => {
    console.log('[SelectedCase] Changed selection:', selectedCase);
    if (selectedCase && listContainerRef.current) {
      requestAnimationFrame(() => {
        const cardEl = listContainerRef.current!.querySelector(
          `[data-case-id="${selectedCase.id}"]`
        ) as HTMLElement;
        if (cardEl) {
          console.log('[Scroll] Found card for:', selectedCase.id);
          cardEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
          setTimeout(() => {
            console.log('[Scroll] Finished scrolling to:', selectedCase.id);
          }, 600);
        } else {
          console.error('[Scroll] Card element not found for:', selectedCase.id);
        }
      });
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
    <div className="flex flex-col w-full h-[calc(100vh-7rem)] gap-4">
      <div className="flex flex-row gap-4 flex-1 min-h-0">
        <div className="w-[70%] bg-white rounded-lg shadow-sm p-4 relative">
          {/* Stats Panel - Simplified and centered */}
          <div className="bg-gray-50 rounded-lg p-2 mb-3">
            <div className="grid grid-cols-4 divide-x divide-gray-200">
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

          {/* Graph container with legend overlay */}
          <div className="h-[calc(100%-60px)] relative">
            {/* Year Range Legend - Floating over graph */}
            <div className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-gray-100">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#99E1B5]" />
                  <span className="text-xs font-medium text-gray-600">2015-2019</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#1A4731]" />
                  <span className="text-xs font-medium text-gray-600">2020-2024</span>
                </div>
              </div>
            </div>

            <Graph cases={cases} onNodeClick={onGraphNodeClick} />
          </div>
        </div>

        <div className="w-[30%] flex flex-col bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="sticky top-0 bg-white z-10 p-3 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Similar Cases</h2>
            <p className="text-gray-500 text-sm">{relatedCases.length} cases found</p>
          </div>
          {/* Cards container with data-case-id attribute on each card */}
          <div className="flex flex-col gap-3 p-3 overflow-y-auto" ref={listContainerRef}>
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
                  source="#"
                  title={item.name}
                  caseId={item.id}
                  date={`Year: ${item.year}`}
                  description={item.description}
                  sentiment=""
                  polarity={item.similarityScore.toString()}
                  subjectivity=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
