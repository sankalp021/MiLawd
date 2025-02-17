interface TableProps {
  onNodeClick: (node: any) => void;
  fetchedCases: any[];
}

export default function Table({ onNodeClick, fetchedCases }: TableProps) {
  return (
    <div className="w-full p-4">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-[#102B3F] text-white">
            <th className="p-2">Case ID</th>
            <th className="p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {fetchedCases.map((item, index) => (
            <tr 
              key={index} 
              className="border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => onNodeClick({ id: item[0] })}
            >
              <td className="p-2">{item[0]}</td>
              <td className="p-2">{item[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
