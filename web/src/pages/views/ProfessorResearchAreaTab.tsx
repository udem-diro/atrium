import { FaGraduationCap } from "react-icons/fa";

function ProfessorResearchAreaTab() {
  return (
    <div className="flex flex-col justify-center gap-2 p-6 md:p-8 lg:p-12 border border-gray-400 rounded-lg shadow-md">
      <div className="flex gap-2 items-center mb-2">
        <FaGraduationCap className="text-2xl" />
        <h3 className="font-semibold ">Research areas and expertise</h3>
      </div>
      <div>
        <div>
          <ul className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4 text-sm lg:text-lg text-start">
            <li className="bg-light-gray py-1 px-2 lg:py-2 lg:px-4 rounded-lg flex items-center">
              Artificial Intelligence
            </li>
            <li className="bg-light-gray py-1 px-2 lg:py-2 lg:px-4 rounded-lg flex items-center">
              Machine Learning
            </li>
            <li className="bg-light-gray py-1 px-2 lg:py-2 lg:px-4 rounded-lg flex items-center">
              Data Science
            </li>
            <li className="bg-light-gray py-1 px-2 lg:py-2 lg:px-4 rounded-lg flex items-center">
              Ethics in Technology
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default ProfessorResearchAreaTab;
