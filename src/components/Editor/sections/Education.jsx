import React, { useState } from "react";
import {
	GraduationCap,
	ChevronDown,
	ChevronUp,
	Plus,
	Trash2,
} from "lucide-react";
import { useResume } from "../../../context/ResumeContext";

const Education = () => {
	const { resumeData, addEducation, removeEducation, updateEducation } =
		useResume();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 overflow-hidden transition-all duration-200 shadow-sm">
			<div
				className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 bg-gray-50/50 dark:bg-gray-800/50"
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className="flex items-center gap-3">
					<div className="p-2 bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 rounded-md">
						<GraduationCap size={18} />
					</div>
					<span className="font-semibold text-gray-700 dark:text-gray-200">
						Education
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
				<div className="p-5 border-t border-gray-200 dark:border-gray-700 space-y-6">
					{resumeData.education.map(
						(edu, index) => (
							<div
								key={edu.id}
								className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/30 dark:bg-gray-800/50 relative group"
							>
								<button
									onClick={(
										e,
									) => {
										e.stopPropagation();
										removeEducation(
											edu.id,
										);
									}}
									className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
									title="Remove"
								>
									<Trash2
										size={
											16
										}
									/>
								</button>

								<h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
									School{" "}
									{index +
										1}
								</h4>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-1.5">
										<label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
											Degree
										</label>
										<input
											type="text"
											value={
												edu.degree
											}
											onChange={(
												e,
											) =>
												updateEducation(
													edu.id,
													"degree",
													e
														.target
														.value,
												)
											}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
										/>
									</div>
									<div className="space-y-1.5">
										<label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
											School
										</label>
										<input
											type="text"
											value={
												edu.school
											}
											onChange={(
												e,
											) =>
												updateEducation(
													edu.id,
													"school",
													e
														.target
														.value,
												)
											}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
										/>
									</div>
									<div className="space-y-1.5">
										<label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
											Start
											Date
										</label>
										<input
											type="text"
											value={
												edu.startDate
											}
											onChange={(
												e,
											) =>
												updateEducation(
													edu.id,
													"startDate",
													e
														.target
														.value,
												)
											}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
										/>
									</div>
									<div className="space-y-1.5">
										<label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
											End
											Date
										</label>
										<input
											type="text"
											value={
												edu.endDate
											}
											onChange={(
												e,
											) =>
												updateEducation(
													edu.id,
													"endDate",
													e
														.target
														.value,
												)
											}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
										/>
									</div>
									<div className="space-y-1.5 md:col-span-2">
										<label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
											Location
										</label>
										<input
											type="text"
											value={
												edu.location
											}
											onChange={(
												e,
											) =>
												updateEducation(
													edu.id,
													"location",
													e
														.target
														.value,
												)
											}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
										/>
									</div>
								</div>
							</div>
						),
					)}

					<button
						onClick={addEducation}
						className="w-full py-3 flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors font-semibold text-sm"
					>
						<Plus size={18} />
						Add Education
					</button>
				</div>
			)}
		</div>
	);
};

export default Education;
