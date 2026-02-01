import React from "react";
import { Layout, Check } from "lucide-react";
import { useResume } from "../../../context/ResumeContext";
import { templates } from "../../../data/templates";

const LayoutSelector = () => {
	const { resumeData, updateTemplate } = useResume();
	const activeTemplateId = resumeData.templateId || "modern";

	return (
		<div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-6 animate-fadeIn shadow-sm">
			<div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
				<div className="p-2 bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-md">
					<Layout size={18} />
				</div>
				<h3 className="font-semibold text-gray-700 dark:text-gray-200">
					Choose Layout
				</h3>
			</div>

			<div className="grid grid-cols-2 gap-4">
				{templates.map((template) => (
					<button
						key={template.id}
						onClick={() =>
							updateTemplate(
								template.id,
							)
						}
						className={`
              relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all text-left
              ${
			activeTemplateId === template.id
				? "border-indigo-600 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/20 shadow-sm"
				: "border-gray-200 dark:border-gray-600 hover:border-indigo-200 dark:hover:border-indigo-700 dark:hover:bg-gray-750"
		}
            `}
					>
						{/* Placeholder for real thumbnail */}
						<div
							className={`w-full aspect-[21/29] rounded-md border shadow-sm ${
								template.id ===
								"modern"
									? "bg-white"
									: "bg-gray-800"
							} flex items-center justify-center overflow-hidden`}
						>
							{/* Simple preview representation */}
							{template.id ===
							"modern" ? (
								<div className="w-full h-full p-2 flex flex-col gap-1">
									<div className="w-full h-2 bg-blue-500 rounded-sm mb-1"></div>
									<div className="w-2/3 h-1 bg-gray-200 rounded-sm"></div>
									<div className="w-full h-1 bg-gray-100 rounded-sm mt-2"></div>
									<div className="w-full h-1 bg-gray-100 rounded-sm"></div>
								</div>
							) : (
								<div className="w-full h-full flex">
									<div className="w-1/3 h-full bg-gray-700 p-1">
										<div className="w-full h-1 bg-gray-500 rounded-sm mb-1"></div>
										<div className="w-full h-1 bg-gray-500 rounded-sm"></div>
									</div>
									<div className="w-2/3 h-full bg-white p-1">
										<div className="w-full h-1 bg-gray-200 rounded-sm mb-1"></div>
										<div className="w-full h-1 bg-gray-100 rounded-sm"></div>
									</div>
								</div>
							)}
						</div>

						<div className="flex items-center justify-between w-full">
							<span
								className={`text-sm font-semibold ${
									activeTemplateId ===
									template.id
										? "text-indigo-700 dark:text-indigo-300"
										: "text-gray-700 dark:text-gray-300"
								}`}
							>
								{template.name}
							</span>
							{activeTemplateId ===
								template.id && (
								<div className="bg-indigo-600 dark:bg-indigo-400 text-white rounded-full p-0.5">
									<Check
										size={
											12
										}
										strokeWidth={
											3
										}
									/>
								</div>
							)}
						</div>
					</button>
				))}
			</div>
		</div>
	);
};

export default LayoutSelector;
