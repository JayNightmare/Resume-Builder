import React, { useState } from "react";
import { PenTool, ChevronDown, ChevronUp, X, Plus } from "lucide-react";
import { useResume } from "../../../context/ResumeContext";

const Skills = () => {
	const { resumeData, updateSkills } = useResume();
	const [isOpen, setIsOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");

	// Ensure skills is always an array
	const skillsList = Array.isArray(resumeData.skills)
		? resumeData.skills
		: typeof resumeData.skills === "string"
			? resumeData.skills
					.split(",")
					.map((s) => s.trim())
					.filter(Boolean)
			: [];

	const handleAddSkill = () => {
		if (inputValue.trim()) {
			const newSkills = [...skillsList, inputValue.trim()];
			updateSkills(newSkills);
			setInputValue("");
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleAddSkill();
		}
	};

	const removeSkill = (indexToRemove) => {
		const newSkills = skillsList.filter(
			(_, index) => index !== indexToRemove,
		);
		updateSkills(newSkills);
	};

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
					<div className="mb-4">
						<label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 block">
							Add Skills
						</label>
						<div className="flex gap-2">
							<input
								type="text"
								className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400"
								placeholder="Type a skill and press Enter..."
								value={
									inputValue
								}
								onChange={(e) =>
									setInputValue(
										e
											.target
											.value,
									)
								}
								onKeyDown={
									handleKeyDown
								}
							/>
							<button
								onClick={
									handleAddSkill
								}
								className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
								disabled={
									!inputValue.trim()
								}
							>
								<Plus
									size={
										18
									}
								/>
							</button>
						</div>
					</div>

					<div className="flex flex-wrap gap-2">
						{skillsList.map(
							(skill, index) => (
								<div
									key={
										index
									}
									className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-full text-sm group border border-gray-200 dark:border-gray-600"
								>
									<span>
										{
											skill
										}
									</span>
									<button
										onClick={() =>
											removeSkill(
												index,
											)
										}
										className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none p-0.5"
									>
										<X
											size={
												14
											}
										/>
									</button>
								</div>
							),
						)}
						{skillsList.length === 0 && (
							<p className="text-sm text-gray-400 italic">
								No skills added
								yet.
							</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Skills;
