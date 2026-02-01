import React, { useState } from "react";
import { User, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { useResume } from "../../../context/ResumeContext";

const PersonalInfo = () => {
	const {
		resumeData,
		updatePersonalInfo,
		addLink,
		removeLink,
		updateLink,
	} = useResume();
	const [isOpen, setIsOpen] = useState(true);

	const handleChange = (e) => {
		const { name, value } = e.target;
		updatePersonalInfo(name, value);
	};

	return (
		<div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 overflow-hidden transition-all duration-200 shadow-sm">
			<div
				className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 bg-gray-50/50 dark:bg-gray-800/50"
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className="flex items-center gap-3">
					<div className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-md">
						<User size={18} />
					</div>
					<span className="font-semibold text-gray-700 dark:text-gray-200">
						Personal Info
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
				<div className="p-5 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="space-y-1.5">
						<label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
							Full Name
						</label>
						<input
							type="text"
							name="fullName"
							value={
								resumeData
									.personalInfo
									.fullName
							}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
							placeholder="e.g. Alex Morgan"
						/>
					</div>

					<div className="space-y-1.5">
						<label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
							Job Title
						</label>
						<input
							type="text"
							name="jobTitle"
							value={
								resumeData
									.personalInfo
									.jobTitle
							}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
							placeholder="e.g. Senior Product Designer"
						/>
					</div>

					<div className="space-y-1.5">
						<label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
							Email
						</label>
						<input
							type="email"
							name="email"
							value={
								resumeData
									.personalInfo
									.email
							}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
							placeholder="e.g. axel@example.com"
						/>
					</div>

					<div className="space-y-1.5">
						<label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
							Phone
						</label>
						<input
							type="text"
							name="phone"
							value={
								resumeData
									.personalInfo
									.phone
							}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
							placeholder="e.g. +1 555-0123"
						/>
					</div>

					<div className="space-y-1.5 md:col-span-2">
						<label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
							Location
						</label>
						<input
							type="text"
							name="location"
							value={
								resumeData
									.personalInfo
									.location ||
								""
							}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
							placeholder="e.g. San Francisco, CA"
						/>
					</div>

					<div className="md:col-span-2 border-t border-gray-100 dark:border-gray-700 pt-4 mt-2">
						<div className="flex justify-between items-center mb-3">
							<label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
								Links / Websites
							</label>
							<button
								onClick={
									addLink
								}
								className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
							>
								<Plus
									size={
										14
									}
								/>{" "}
								Add Link
							</button>
						</div>

						<div className="space-y-3">
							{(
								resumeData
									.personalInfo
									.links ||
								[]
							).map((link) => (
								<div
									key={
										link.id
									}
									className="flex gap-2 items-center"
								>
									<select
										value={
											link.label
										}
										onChange={(
											e,
										) =>
											updateLink(
												link.id,
												"label",
												e
													.target
													.value,
											)
										}
										className="w-1/3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
									>
										<option value="">
											Select
											Platform
										</option>
										<option value="LinkedIn">
											LinkedIn
										</option>
										<option value="GitHub">
											GitHub
										</option>
										<option value="Twitter">
											Twitter
										</option>
										<option value="Portfolio">
											Portfolio
										</option>
										<option value="Dribbble">
											Dribbble
										</option>
										<option value="Behance">
											Behance
										</option>
										<option value="Medium">
											Medium
										</option>
										<option value="Other">
											Other
										</option>
									</select>
									<input
										type="text"
										placeholder="Username or URL"
										value={
											link.url
										} // We store the raw input in 'url' field for now, will parse in Preview
										onChange={(
											e,
										) =>
											updateLink(
												link.id,
												"url",
												e
													.target
													.value,
											)
										}
										className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
									/>
									<button
										onClick={() =>
											removeLink(
												link.id,
											)
										}
										className="text-gray-400 hover:text-red-500"
									>
										<Trash2
											size={
												16
											}
										/>
									</button>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PersonalInfo;
