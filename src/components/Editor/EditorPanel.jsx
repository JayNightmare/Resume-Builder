import React, { useState } from "react";
import { Layout, Palette, Image, RotateCcw } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import PersonalInfo from "./sections/PersonalInfo";
import Summary from "./sections/Summary";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Skills from "./sections/Skills";
import ThemeSelector from "./sections/ThemeSelector";
import LayoutSelector from "./sections/LayoutSelector";

const EditorPanel = () => {
	const [activeView, setActiveView] = useState("editor"); // 'editor', 'theme', 'layout'
	const { resetResume } = useResume();

	const handleReset = () => {
		if (
			window.confirm(
				"Are you sure you want to reset all data? This cannot be undone.",
			)
		) {
			resetResume();
			setActiveView("editor");
		}
	};

	const toolbarItems = [
		{
			id: "layout",
			label: "Layout",
			icon: Layout,
			action: () =>
				setActiveView((prev) =>
					prev === "layout" ? "editor" : "layout",
				),
		},
		{
			id: "theme",
			label: "Theme",
			icon: Palette,
			action: () =>
				setActiveView((prev) =>
					prev === "theme" ? "editor" : "theme",
				),
		},
		{
			id: "upload",
			label: "Upload Photo",
			icon: Image,
			action: () => alert("Photo upload coming soon!"),
		}, // Placeholder
		{
			id: "reset",
			label: "Reset",
			icon: RotateCcw,
			action: handleReset,
		},
	];

	return (
		<div className="p-6 pb-20 max-w-2xl mx-auto space-y-6">
			<div className="space-y-1">
				<h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
					Editor
				</h2>
				<p className="text-sm text-gray-500 dark:text-gray-400">
					Fill in the details below to generate
					your professional CV.
				</p>
			</div>

			{/* Toolbar */}
			<div className="flex gap-4 mb-6">
				{toolbarItems.map((item) => (
					<button
						key={item.id}
						onClick={item.action}
						className={`
                flex-1 flex flex-col items-center justify-center p-3 border rounded-lg transition-all gap-2 group
                ${
			activeView === item.id
				? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
				: "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
		}
            `}
					>
						<div
							className={`
                 w-8 h-8 flex items-center justify-center rounded-md transition-colors
                 ${
				activeView === item.id
					? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
					: "bg-gray-100 text-gray-500 group-hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:group-hover:bg-gray-700"
			}
             `}
						>
							<item.icon size={18} />
						</div>
						<span
							className={`text-xs font-medium ${
								activeView ===
								item.id
									? "text-blue-700 dark:text-blue-400"
									: "text-gray-600 dark:text-gray-400"
							}`}
						>
							{item.label}
						</span>
					</button>
				))}
			</div>

			<div className="space-y-4">
				{activeView === "editor" && (
					<div className="space-y-4 animate-fadeIn">
						<PersonalInfo />
						<Summary />
						<Experience />
						<Education />
						<Skills />
					</div>
				)}

				{activeView === "theme" && <ThemeSelector />}

				{activeView === "layout" && <LayoutSelector />}
			</div>
		</div>
	);
};

export default EditorPanel;
