import React, { useState } from "react";
import { Palette, ChevronDown, ChevronUp } from "lucide-react";
import { useResume } from "../../../context/ResumeContext";

const presetColors = [
	"#2563eb", // Blue
	"#9333ea", // Purple
	"#16a34a", // Green
	"#ea580c", // Orange
	"#0d9488", // Teal
	"#db2777", // Pink
	"#4b5563", // Gray
	"#dc2626", // Red
];

const ColorControl = ({ label, value, onChange, presets = [] }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
					{label}
				</label>
				<div className="flex items-center gap-2">
					<div className="relative overflow-hidden w-8 h-8 rounded-full border border-gray-200 shadow-sm">
						<input
							type="color"
							value={value}
							onChange={(e) =>
								onChange(
									e.target
										.value,
								)
							}
							className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] p-0 m-0 border-0 cursor-pointer"
						/>
					</div>
					<span className="text-xs font-mono text-gray-500 uppercase">
						{value}
					</span>
				</div>
			</div>

			{/* Presets (Accordion style) */}
			{presets.length > 0 && (
				<div className="border border-gray-100 dark:border-gray-700 rounded-md overflow-hidden">
					<button
						onClick={() =>
							setIsOpen(!isOpen)
						}
						className="w-full flex items-center justify-between p-2 text-xs text-gray-500 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
					>
						<span>Preset Colors</span>
						{isOpen ? (
							<ChevronUp size={14} />
						) : (
							<ChevronDown
								size={14}
							/>
						)}
					</button>

					{isOpen && (
						<div className="p-2 bg-white dark:bg-gray-800 grid grid-cols-8 gap-1">
							{presets.map(
								(color) => (
									<button
										key={
											color
										}
										onClick={() =>
											onChange(
												color,
											)
										}
										className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-600 transition hover:scale-110"
										style={{
											backgroundColor:
												color,
										}}
										title={
											color
										}
									/>
								),
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

const BorderWidthControl = ({ label, value, onChange }) => {
	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
					{label}
				</label>
				<span className="text-xs font-mono text-gray-500">
					{value}px
				</span>
			</div>
			<input
				type="range"
				min="1"
				max="10"
				value={value}
				onChange={(e) =>
					onChange(Number(e.target.value))
				}
				className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
			/>
		</div>
	);
};

const ThemeSelector = () => {
	const { resumeData, updateTheme } = useResume();
	const theme = resumeData.theme || {};
	const activeTemplateId = resumeData.templateId;

	// Helper to update specific color field
	const handleColorChange = (field, value) => {
		updateTheme(field, value);
	};

	return (
		<div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-6 animate-fadeIn shadow-sm leading-relaxed">
			<div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
				<div className="p-2 bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400 rounded-md">
					<Palette size={18} />
				</div>
				<h3 className="font-semibold text-gray-700 dark:text-gray-200">
					Theme Colors
				</h3>
			</div>

			<div className="space-y-6">
				<ColorControl
					label="Accent Color"
					value={theme.accent || "#2563eb"}
					onChange={(val) =>
						handleColorChange("accent", val)
					}
					presets={presetColors}
				/>

				<div className="h-px bg-gray-100 dark:bg-gray-700 my-4" />

				<ColorControl
					label="Background Color"
					value={theme.background || "#ffffff"}
					onChange={(val) =>
						handleColorChange(
							"background",
							val,
						)
					}
					presets={[
						"#ffffff",
						"#f8fafc",
						"#f3f4f6",
						"#fffbeb",
						"#1f2937", // Dark mode resume!
						"#000000",
					]}
				/>

				<div className="h-px bg-gray-100 dark:bg-gray-700 my-4" />

				<ColorControl
					label="Text Color"
					value={theme.text || "#1f2937"}
					onChange={(val) =>
						handleColorChange("text", val)
					}
					presets={[
						"#1f2937",
						"#374151",
						"#000000",
						"#ffffff",
						"#e2e8f0",
					]}
				/>

				{/*
				Sidebar Color (Layouts)
				Hide if the modern templete is selected
				*/}
				{activeTemplateId === "sidebar" && (
					<>
						<div className="h-px bg-gray-100 dark:bg-gray-700 my-4" />

						<ColorControl
							label="Sidebar Color (Layouts)"
							value={
								theme.sidebar ||
								"#1f2937"
							}
							onChange={(val) =>
								handleColorChange(
									"sidebar",
									val,
								)
							}
							presets={[
								"#1f2937",
								"#111827",
								"#000000",
								"#2563eb",
								"#ffffff",
							]}
						/>

						<div className="h-px bg-gray-100 dark:bg-gray-700 my-4" />

						<ColorControl
							label="Sidebar Border Color (Layouts)"
							value={
								theme.sidebarBorder ||
								"#1f2937"
							}
							onChange={(val) =>
								handleColorChange(
									"sidebarBorder",
									val,
								)
							}
							presets={[
								"#1f2937",
								"#111827",
								"#000000",
								"#2563eb",
								"#ffffff",
							]}
						/>

						<div className="h-px bg-gray-100 dark:bg-gray-700 my-4" />

						<BorderWidthControl
							label="Sidebar Border Width (Layouts)"
							value={
								theme.sidebarBorderWidth ||
								"1px"
							}
							onChange={(val) =>
								handleColorChange(
									"sidebarBorderWidth",
									val,
								)
							}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default ThemeSelector;
