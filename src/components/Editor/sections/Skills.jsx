import React, { useState } from "react";
import { PenTool, ChevronDown, ChevronUp } from "lucide-react";
import { useResume } from "../../../context/ResumeContext";

const Skills = () => {
	const { resumeData, updateSkills } = useResume();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 overflow-hidden transition-all duration-200 shadow-sm">
			<div
				className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 bg-gray-50/50 dark:bg-gray-800/50"
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className="flex items-center gap-3">
					<div className="p-2 bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400 rounded-md">
						<PenTool size={18} />
					</div>
					<span className="font-semibold text-gray-700 dark:text-gray-200">
						Skills
					</span>
				</div>
				{isOpen ? (
					<ChevronUp
						size={18}
						className="text-gray-400"
					/>
				) : (
					<ChevronDown
						size={18}
						className="text-gray-400"
					/>
				)}
			</div>

			{isOpen && (
				<div className="p-5 border-t border-gray-200 dark:border-gray-700">
					<label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 block">
						Technical Skills
					</label>
					<textarea
						className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent min-h-[100px] leading-relaxed resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
						placeholder="e.g. React, Node.js, Design Systems..."
						value={resumeData.skills}
						onChange={(e) =>
							updateSkills(
								e.target.value,
							)
						}
					/>
					<p className="text-xs text-gray-400 mt-2">
						Comma separated is recommended.
					</p>
				</div>
			)}
		</div>
	);
};

export default Skills;
