import { ArrowUpRight, Calendar, Scale, Percent, BookOpen } from "lucide-react";

interface CardProps {
  source: string;
  title: string; // this will be the name
  caseId: string; // add this prop
  date?: string;
  description: string;
  sentiment?: string;
  polarity?: string;
  subjectivity?: string;
  isReference?: boolean;
}

export default function Card({
  source,
  title, // this will be the name
  caseId, // add this prop
  date,
  description,
  sentiment,
  polarity = "0",
  subjectivity = "0",
  isReference = false,
}: CardProps) {
  return (
    <div 
      className={`
        bg-white rounded-lg border h-fit 
        transform transition-all duration-200
        ${isReference 
          ? "border-orange-500 bg-orange-50/50" 
          : "border-gray-100 hover:border-gray-200"
        }
      `}
    >
      <div className="p-5 space-y-4">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {isReference && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 mb-2">
                Current Case
              </span>
            )}
            <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-1">
              <Scale className="w-3.5 h-3.5" />
              <span>Case {caseId}</span>
            </div>
            <h2 className="text-base font-medium text-gray-900 line-clamp-2">
              {title}
            </h2>
          </div>
          
          {!isReference && (
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-full">
                <Percent className="w-3.5 h-3.5 text-green-600" />
                <span className="text-sm font-medium text-green-600">
                  {(Number(polarity) * 100).toFixed(0)}%
                </span>
              </div>
              {date && (
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Calendar className="w-3.5 h-3.5" />
                  {date}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Description Section */}
        <div className="text-sm text-gray-600 line-clamp-2">
          {description}
        </div>

        {/* Footer Section - Updated button styling */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              Tax Law
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              Section 80
            </span>
          </div>
          
          <button 
            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 rounded hover:bg-gray-50"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Read</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
