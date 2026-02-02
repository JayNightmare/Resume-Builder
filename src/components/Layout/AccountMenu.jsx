import React, { useState, useRef, useEffect } from "react";
import { Settings, Moon, Sun, Menu } from "lucide-react";
import useTheme from "../../hooks/useTheme";
import { useUpdates } from "../../hooks/useUpdates";
import SettingsModal from "./SettingsModal";

const AccountMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [showSettings, setShowSettings] = useState(false); // State for modal
	const menuRef = useRef(null);
	const { theme, toggleTheme } = useTheme();
	const { hasNewUpdate } = useUpdates();

	const toggleMenu = () => setIsOpen(!isOpen);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener(
				"mousedown",
				handleClickOutside,
			);
		};
	}, []);

	return (
		<>
			<div className="relative" ref={menuRef}>
				<button
					onClick={toggleMenu}
					className="flex items-center gap-2 focus:outline-none p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
				>
					<div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 shadow-sm relative">
						<Menu size={18} />
						{hasNewUpdate && (
							<span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white dark:border-gray-800 rounded-full animate-pulse"></span>
						)}
					</div>
				</button>

				{isOpen && (
					<div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-40 transform origin-top-right transition-all">
						<div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
							<p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
								Menu
							</p>
						</div>

						<div className="py-1">
							<button
								onClick={() => {
									setShowSettings(
										true,
									);
									setIsOpen(
										false,
									);
								}}
								className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between group"
							>
								<div className="flex items-center gap-2">
									<Settings
										size={
											16
										}
									/>
									Settings
								</div>
								{hasNewUpdate && (
									<span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
										New
									</span>
								)}
							</button>
							<button
								onClick={
									toggleTheme
								}
								className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
							>
								{theme ===
								"dark" ? (
									<Sun
										size={
											16
										}
									/>
								) : (
									<Moon
										size={
											16
										}
									/>
								)}
								{theme ===
								"dark"
									? "Light Mode"
									: "Dark Mode"}
							</button>
						</div>
					</div>
				)}
			</div>

			{/* Settings Modal */}
			<SettingsModal
				isOpen={showSettings}
				onClose={() => setShowSettings(false)}
			/>
		</>
	);
};

export default AccountMenu;
