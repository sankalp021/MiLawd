'use client';
import { useState, useRef, useEffect } from "react";
import Card from "./Card";
import Graph from "./Graph";
import { dummyCases, Case } from "../data/dummyCases";

interface CaseDisplayProps {
  searchQuery: string;
}

export default function CaseDisplay({ searchQuery }: CaseDisplayProps) {
  const [selectedNode, setSelectedNode] = useState<Case | null>(null);
  const [newCaseInput, setNewCaseInput] = useState<string>("");
  const [fetchedCases, setFetchedCases] = useState(dummyCases);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  };

  const handleNodeClick = (node: Case) => {
    setSelectedNode(node);
    const index = cardRefs.current.findIndex(ref => ref && ref.dataset.id === node.id);
    if (index !== -1 && cardRefs.current[index]) {
      const containerTop = containerRef.current!.getBoundingClientRect().top;
      const elementTop = cardRefs.current[index]!.getBoundingClientRect().top;
      const offsetPosition = elementTop - containerTop + containerRef.current!.scrollTop - (containerRef.current!.clientHeight / 2) + (cardRefs.current[index]!.clientHeight / 2);
      containerRef.current!.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const filteredCases = dummyCases.filter(
        case_ => 
          case_.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          case_.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          case_.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFetchedCases(filteredCases);
    } else {
      setFetchedCases(dummyCases);
    }
  }, [searchQuery]);

  const relatedCases = fetchedCases.filter(c => !c.isReference);

  return (
    <div className="flex flex-col w-full h-[calc(100vh-7rem)] gap-6">
      <div className="flex flex-row gap-6 flex-1 min-h-0">
        <div className="w-[70%] bg-white rounded-lg shadow-sm p-6">
          {/* Info Panel */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-8">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Cases</h3>
                <p className="text-2xl font-semibold">{relatedCases.length}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Average Similarity</h3>
                <p className="text-2xl font-semibold">
                  {(relatedCases.reduce((acc, c) => acc + c.similarityScore, 0) / relatedCases.length * 100).toFixed(0)}%
                </p>
              </div>
            </div>

            {/* Color Legend */}
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#99E1B5]" />
                <span>Older Cases</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#1A4731]" />
                <span>Recent Cases</span>
              </div>
            </div>
          </div>

          {/* Graph */}
          <Graph cases={fetchedCases} onNodeClick={handleNodeClick} />
        </div>

        <div className="w-[30%] flex flex-col bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="sticky top-0 bg-white z-10 p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Similar Cases</h2>
            <p className="text-gray-500 text-sm mt-1">
              {relatedCases.length} cases found
            </p>
          </div>
          <div className="flex flex-col gap-4 p-4 overflow-y-auto" ref={containerRef}>
            {relatedCases.map((item, index) => (
              <div 
                key={index} 
                ref={(el) => setCardRef(el, index)} 
                data-id={item.id}
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

// Add new Stat component
function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center">
      <div className="text-sm font-medium text-gray-500">{label}</div>
      <div className="text-xl font-semibold mt-1">{value}</div>
    </div>
  );
}
