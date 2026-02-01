import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Printer } from "lucide-react";
import EditorPanel from "../Editor/EditorPanel";
import PreviewPanel from "../Preview/PreviewPanel";
import AccountMenu from "./AccountMenu";
import { useResume } from "../../context/ResumeContext";

// Icons need additional install if not present: npm install lucide-react

const SplitScreen = () => {
	const { resumeData } = useResume();
	const componentRef = useRef();

	const handlePrint = useReactToPrint({
		contentRef: componentRef,
		documentTitle: "Resume",
	});

	const handleDownload = () => {
		const format = resumeData.settings?.downloadFormat || "pdf";

		if (format === "json") {
			const dataStr = JSON.stringify(resumeData, null, 2);
			const blob = new Blob([dataStr], {
				type: "application/json",
			});
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = `resume-${
				resumeData.personalInfo.fullName
					.replace(/\s+/g, "-")
					.toLowerCase() || "draft"
			}.json`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
		} else {
			handlePrint();
		}
	};

	return (
		<div className="flex flex-col h-screen">
			{/* Header */}
			<header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between z-10 transition-colors duration-200">
				<div className="flex items-center gap-2">
					<div className="bg-blue-600 text-white p-2 rounded">
						<span className="font-bold text-lg">
							RB
						</span>
					</div>
					<div>
						<h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
							Resume Builder
						</h1>
						<p className="text-xs text-gray-500 dark:text-gray-400">
							Last saved just now
						</p>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<button
						onClick={handleDownload}
						className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm font-medium shadow-sm"
					>
						<Printer size={18} />
						Download
					</button>

					<AccountMenu />
				</div>
			</header>

			{/* Main Content: Split View */}
			<div className="flex-1 flex overflow-hidden">
				{/* Left: Editor (Scrollable) */}
				<div className="w-1/2 lg:w-5/12 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-y-auto transition-colors duration-200">
					<EditorPanel />
				</div>

				{/* Right: Preview (Scrollable background) */}
				<div className="w-1/2 lg:w-7/12 bg-gray-100 dark:bg-gray-900/50 overflow-y-auto p-8 flex justify-center items-start transition-colors duration-200">
					<PreviewPanel ref={componentRef} />
				</div>
			</div>
		</div>
	);
};

export default SplitScreen;
