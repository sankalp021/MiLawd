'use client';
import { useState, useRef } from "react";
import Card from "./Card";
import Graph from "./Graph";
import { dummyCases, Case } from "../data/dummyCases";

export default function CaseDisplay() {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCaseInput(e.target.value);
  };

  const handleSearch = () => {
    const filteredCases = dummyCases.filter(
      case_ => case_.description.toLowerCase().includes(newCaseInput.toLowerCase())
    );
    setFetchedCases(filteredCases);
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-7rem)] gap-6">
      <div className="w-full flex justify-center p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center w-full max-w-lg">
          <input
            type="text"
            placeholder="Enter your case details"
            value={newCaseInput}
            onChange={handleInputChange}
            className="border p-2 text-black rounded-l w-full"
          />
          <button
            onClick={handleSearch}
            className="bg-[#102B3F] text-white py-2 px-4 rounded-r"
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex flex-row gap-6 flex-1 min-h-0">
        <div className="w-[70%] bg-white rounded-lg shadow-sm p-4 flex">
          <Graph cases={fetchedCases} onNodeClick={handleNodeClick} />
        </div>

        <div className="w-[30%] flex flex-col bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="sticky top-0 bg-white z-10">
            <p className="text-2xl text-black">Relevant Cases</p>
            <p className="text-gray-500 mb-4">
              Click on a case for more details
            </p>
          </div>
          <div className="flex flex-col gap-6 pb-6 pr-2 overflow-y-auto" ref={containerRef}>
            {fetchedCases.map((item, index) => (
              <div 
                key={index} 
                ref={(el) => setCardRef(el, index)} 
                data-id={item.id}
              >
                <Card
                  source="#"
                  title={"Case " + item.id}
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
