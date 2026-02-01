import React, { useState } from "react";
import {
	X,
	Trash2,
	FileText,
	FileJson,
	Github,
	AlertCircle,
} from "lucide-react";
import { useResume } from "../../context/ResumeContext";

const SettingsModal = ({ isOpen, onClose }) => {
	const { resetResume, resumeData, updateSettings } = useResume();
	const [showClearConfirm, setShowClearConfirm] = useState(false);

	if (!isOpen) return null;

	const handleClearData = () => {
		resetResume();
		setShowClearConfirm(false);
		onClose();
	};

	const currentFormat = resumeData.settings?.downloadFormat || "pdf";

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
				{/* Header */}
				<div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
					<h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
						Settings
					</h2>
					<button
						onClick={onClose}
						className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
					>
						<X size={20} />
					</button>
				</div>

				{/* Body */}
				<div className="p-6 space-y-6">
					{/* Download Format */}
					<div>
						<h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
							Download Format
						</h3>
						<div className="grid grid-cols-2 gap-3">
							<button
								onClick={() =>
									updateSettings(
										"downloadFormat",
										"pdf",
									)
								}
								className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
									currentFormat ===
									"pdf"
										? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
										: "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400"
								}`}
							>
								<FileText
									size={
										24
									}
								/>
								<span className="text-sm font-medium">
									PDF
									Document
								</span>
							</button>
							<button
								onClick={() =>
									updateSettings(
										"downloadFormat",
										"json",
									)
								}
								className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
									currentFormat ===
									"json"
										? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
										: "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400"
								}`}
							>
								<FileJson
									size={
										24
									}
								/>
								<span className="text-sm font-medium">
									JSON
									Data
								</span>
							</button>
						</div>
					</div>

					{/* Danger Zone */}
					<div className="pt-4 border-t border-gray-100 dark:border-gray-700">
						<h3 className="text-sm font-semibold text-red-600 mb-3">
							Danger Zone
						</h3>
						{showClearConfirm ? (
							<div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg flex flex-col gap-3">
								<p className="text-sm text-red-700 dark:text-red-300">
									Are you
									sure?
									This
									will
									remove
									all your
									data
									permanently.
								</p>
								<div className="flex gap-2">
									<button
										onClick={
											handleClearData
										}
										className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
									>
										Yes,
										Clear
										All
									</button>
									<button
										onClick={() =>
											setShowClearConfirm(
												false,
											)
										}
										className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded text-sm font-medium transition-colors"
									>
										Cancel
									</button>
								</div>
							</div>
						) : (
							<button
								onClick={() =>
									setShowClearConfirm(
										true,
									)
								}
								className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 hover:border-red-200 dark:hover:border-red-800 group transition-all"
							>
								<div className="flex items-center gap-3">
									<div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
										<Trash2
											size={
												18
											}
										/>
									</div>
									<div className="text-left">
										<p className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-red-700 dark:group-hover:text-red-400">
											Clear
											All
											Data
										</p>
									</div>
								</div>
							</button>
						)}
					</div>

					{/* Feedback */}
					<div className="pt-4 border-t border-gray-100 dark:border-gray-700">
						<h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
							Feedback & Support
						</h3>
						<div className="grid grid-cols-2 gap-3">
							<a
								href="https://github.com/JayNightmare/Resume-Builder/issues/new"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-300 transition-colors"
							>
								<AlertCircle
									size={
										16
									}
								/>
								Report Bug
							</a>
							<a
								href="https://github.com/JayNightmare/Resume-Builder"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-300 transition-colors"
							>
								<Github
									size={
										16
									}
								/>
								Star Repo
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SettingsModal;
