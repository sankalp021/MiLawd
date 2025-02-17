import { ArrowUpRight, Calendar } from "lucide-react";

interface CardProps {
  source: string;
  title: string;
  date?: string;
  description: string;
  sentiment?: string;
  polarity?: string;
  subjectivity?: string;
}

export default function Card({
  source,
  title,
  date,
  description,
  sentiment,
  polarity = "0",
  subjectivity = "0",
}: CardProps) {
  return (
    <div className={`
      bg-white rounded-xl shadow-sm border-l-4 h-fit 
      transform transition-all duration-200 hover:scale-[1.02] hover:shadow-md
      ${sentiment === "Positive" ? "border-l-[#026953]" :
         sentiment === "Negative" ? "border-l-[#720606]" :
         sentiment === "Neutral" ? "border-l-[#F08000]" :
         "border-l-blue-500"}
    `}>
      <div className="p-4">
        <h2 className="text-lg font-medium mb-2 text-gray-800 line-clamp-2">{title}</h2>
        {date && (
          <div className="flex items-center space-x-2 mb-3">
            <Calendar className="w-4 h-4 text-gray-400" />
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        )}
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{description}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            {polarity && (
              <div className="text-sm text-gray-500">
                Relevance: {(Number(polarity) * 100).toFixed(0)}%
              </div>
            )}
          </div>
          <a href={source} target="_blank" rel="noopener noreferrer">
            <button className="group flex items-center space-x-2 bg-[#102B3F] text-white px-4 py-2 rounded-lg hover:bg-[#1a4c6e] transition-colors">
              <span>View</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
