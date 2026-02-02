import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import ResumeDocument from "./ResumeDocument";

const PreviewPanel = React.forwardRef((props, ref) => {
	const [zoom, setZoom] = useState(0.8); // Default scale

	const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 1.5));
	const handleZoomOut = () =>
		setZoom((prev) => Math.max(prev - 0.1, 0.4));

	return (
		<div className="flex flex-col items-center gap-6 relative w-full">
			{/* Zoom Controls floating */}
			<div className="fixed bottom-8 right-8 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col p-1 z-10 transition-colors duration-200">
				<button
					onClick={handleZoomIn}
					className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300 transition-colors"
				>
					<Plus size={20} />
				</button>
				<button
					onClick={handleZoomOut}
					className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300 transition-colors"
				>
					<Minus size={20} />
				</button>
			</div>

			{/* Document Container */}
			<div
				className="transform origin-top transition-transform duration-200"
				style={{ transform: `scale(${zoom})` }}
			>
				<ResumeDocument ref={ref} />
			</div>
		</div>
	);
});

export default PreviewPanel;
