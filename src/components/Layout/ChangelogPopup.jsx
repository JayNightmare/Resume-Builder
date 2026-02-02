import React, { useEffect, useState } from "react";

import { X } from "lucide-react";

const renderMarkdown = (text) => {
	if (!text) return null;
	return text.split("\n").map((line, i) => {
		// Headers
		if (line.startsWith("### ")) {
			return (
				<h3
					key={i}
					className="text-lg font-bold text-gray-800 dark:text-gray-100 mt-6 mb-3"
				>
					{line.replace("### ", "")}
				</h3>
			);
		}
		if (line.startsWith("## ")) {
			return (
				<h2
					key={i}
					className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2"
				>
					{line.replace("## ", "")}
				</h2>
			);
		}
		if (line.startsWith("# ")) {
			return (
				<h1
					key={i}
					className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
				>
					{line.replace("# ", "")}
				</h1>
			);
		}

		// List items
		if (line.trim().startsWith("- ")) {
			const content = line.trim().replace("- ", "");
			// Handle bold text in list items
			const parts = content.split(/(\*\*.*?\*\*)/g);
			return (
				<li
					key={i}
					className="ml-4 list-disc text-gray-600 dark:text-gray-300 mb-1"
				>
					{parts.map((part, j) => {
						if (
							part.startsWith("**") &&
							part.endsWith("**")
						) {
							return (
								<strong
									key={j}
									className="font-semibold text-gray-800 dark:text-gray-200"
								>
									{part.slice(
										2,
										-2,
									)}
								</strong>
							);
						}
						return part;
					})}
				</li>
			);
		}

		// Empty lines
		if (!line.trim()) {
			return <div key={i} className="h-2" />;
		}

		// Regular paragraphs
		return (
			<p
				key={i}
				className="text-gray-600 dark:text-gray-300 mb-2 leading-relaxed"
			>
				{line}
			</p>
		);
	});
};

const ChangelogPopup = ({ isOpen, onClose }) => {
	const [versions, setVersions] = useState([]);
	const [selectedVersionIndex, setSelectedVersionIndex] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (isOpen) {
			setLoading(true);
			fetch("/CHANGELOG.md")
				.then((res) => res.text())
				.then((text) => {
					// Parse the markdown
					// We assume the file starts with a Title # Changelog
					// and then has versions marked by ##
					const lines = text.split("\n");
					const parsedVersions = [];
					let currentVersion = null;

					lines.forEach((line) => {
						if (line.startsWith("## ")) {
							if (currentVersion) {
								parsedVersions.push(
									currentVersion,
								);
							}
							currentVersion = {
								title: line
									.replace(
										"## ",
										"",
									)
									.trim(),
								content:
									line +
									"\n", // Keep the header in content for markdown rendering consistency
							};
						} else if (currentVersion) {
							currentVersion.content +=
								line + "\n";
						}
					});
					if (currentVersion) {
						parsedVersions.push(
							currentVersion,
						);
					}

					setVersions(parsedVersions);
					setLoading(false);
				})
				.catch((err) => {
					console.error(
						"Failed to load changelog",
						err,
					);
					setLoading(false);
				});
		}
	}, [isOpen]);

	if (!isOpen) return null;

	const selectedVersion = versions[selectedVersionIndex];

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity duration-300 animate-in fade-in">
			<div className="bg-white dark:bg-gray-800 w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
				{/* Header */}
				<div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 shrink-0">
					<h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
						🚀 Changelog
					</h2>
					<button
						onClick={onClose}
						className="p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
					>
						<X size={20} />
					</button>
				</div>

				{/* Body */}
				<div className="flex flex-1 overflow-hidden">
					{loading ? (
						<div className="w-full flex justify-center py-20">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
						</div>
					) : (
						<>
							{/* Sidebar - Version List */}
							<div className="w-1/3 border-r border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20 overflow-y-auto custom-scrollbar p-2 space-y-2">
								{versions.length ===
								0 ? (
									<div className="p-4 text-sm text-gray-500 text-center">
										No
										versions
										found.
									</div>
								) : (
									versions.map(
										(
											v,
											index,
										) => (
											<button
												key={
													index
												}
												onClick={() =>
													setSelectedVersionIndex(
														index,
													)
												}
												className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
													selectedVersionIndex ===
													index
														? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400 ring-1 ring-black/5 dark:ring-white/10"
														: "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
												}`}
											>
												{
													v.title
												}
												{index ===
													0 && (
													<span className="ml-2 px-1.5 py-0.5 text-[10px] bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
														Latest
													</span>
												)}
											</button>
										),
									)
								)}
							</div>

							{/* Main Content - Selected Version */}
							<div className="w-2/3 p-6 overflow-y-auto custom-scrollbar bg-white dark:bg-gray-800">
								{selectedVersion ? (
									<div className="dark:text-white text-black">
										{renderMarkdown(
											selectedVersion.content,
										)}
									</div>
								) : (
									<div className="flex flex-col items-center justify-center h-full text-gray-400">
										<p>
											Select
											a
											version
											to
											view
											details
										</p>
									</div>
								)}
							</div>
						</>
					)}
				</div>

				{/* Footer */}
				<div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-right shrink-0">
					<button
						onClick={onClose}
						className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChangelogPopup;
