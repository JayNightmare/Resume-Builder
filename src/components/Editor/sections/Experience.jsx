import React, { useState } from "react";
import { Briefcase, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { useResume } from "../../../context/ResumeContext";

const Experience = () => {
	const {
		resumeData,
		addExperience,
		removeExperience,
		updateExperience,
	} = useResume();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 overflow-hidden transition-all duration-200 shadow-sm">
			<div
				className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 bg-gray-50/50 dark:bg-gray-800/50"
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className="flex items-center gap-3">
					<div className="p-2 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-md">
						<Briefcase size={18} />
					</div>
					<span className="font-semibold text-gray-700 dark:text-gray-200">
						Work Experience
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
					{resumeData.experience.map(
						(exp, index) => (
							<div
								key={exp.id}
								className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/30 dark:bg-gray-800/50 relative group"
							>
								<button
									onClick={(
										e,
									) => {
										e.stopPropagation();
										removeExperience(
											exp.id,
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
									Position{" "}
									{index +
										1}
								</h4>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-1.5">
										<label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
											Job
											Title
										</label>
										<input
											type="text"
											value={
												exp.role
											}
											onChange={(
												e,
											) =>
												updateExperience(
													exp.id,
													"role",
													e
														.target
														.value,
												)
											}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
										/>
									</div>
									<div className="space-y-1.5">
										<label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
											Company
										</label>
										<input
											type="text"
											value={
												exp.company
											}
											onChange={(
												e,
											) =>
												updateExperience(
													exp.id,
													"company",
													e
														.target
														.value,
												)
											}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
												exp.startDate
											}
											onChange={(
												e,
											) =>
												updateExperience(
													exp.id,
													"startDate",
													e
														.target
														.value,
												)
											}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
												exp.endDate
											}
											onChange={(
												e,
											) =>
												updateExperience(
													exp.id,
													"endDate",
													e
														.target
														.value,
												)
											}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
										/>
									</div>
									<div className="space-y-1.5 md:col-span-2">
										<label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
											Location
										</label>
										<input
											type="text"
											value={
												exp.location
											}
											onChange={(
												e,
											) =>
												updateExperience(
													exp.id,
													"location",
													e
														.target
														.value,
												)
											}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
										/>
									</div>
									<div className="space-y-1.5 md:col-span-2">
										<label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
											Description
										</label>
										<textarea
											value={
												exp.description
											}
											onChange={(
												e,
											) =>
												updateExperience(
													exp.id,
													"description",
													e
														.target
														.value,
												)
											}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[100px] resize-y bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
										/>
									</div>
								</div>
							</div>
						),
					)}

					<button
						onClick={addExperience}
						className="w-full py-3 flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors font-semibold text-sm"
					>
						<Plus size={18} />
						Add Position
					</button>
				</div>
			)}
		</div>
	);
};

export default Experience;
