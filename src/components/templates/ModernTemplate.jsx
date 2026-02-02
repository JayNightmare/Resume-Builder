import React from "react";
import {
	Mail,
	Phone,
	MapPin,
	Linkedin,
	Github,
	Twitter,
	Globe,
	Link as LinkIcon,
} from "lucide-react";

const ModernTemplate = ({ data, isFirstPage = true }) => {
	const { personalInfo, summary, experience, education, skills, theme } =
		data;

	const accentColor = theme?.accent || "#2563eb";
	const backgroundColor = theme?.background || "#ffffff";
	const textColor = theme?.text || "#1f2937";

	const getLinkInfo = (link) => {
		const { label, url } = link;
		let icon = (
			<Globe
				size={14}
				style={{ color: accentColor }}
				className="shrink-0"
			/>
		);
		let display = url;
		let href = url.startsWith("http") ? url : `https://${url}`;

		if (label === "LinkedIn") {
			icon = (
				<Linkedin
					size={14}
					style={{ color: accentColor }}
					className="shrink-0"
				/>
			);
			display = url.replace(
				/^(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\//,
				"",
			);
			href = `https://linkedin.com/in/${display}`;
		} else if (label === "GitHub") {
			icon = (
				<Github
					size={14}
					style={{ color: accentColor }}
					className="shrink-0"
				/>
			);
			display = url.replace(
				/^(?:https?:\/\/)?(?:www\.)?github\.com\//,
				"",
			);
			href = `https://github.com/${display}`;
		} else if (label === "Twitter") {
			icon = (
				<Twitter
					size={14}
					style={{ color: accentColor }}
					className="shrink-0"
				/>
			);
			display = url.replace(
				/^(?:https?:\/\/)?(?:www\.)?twitter\.com\//,
				"",
			);
			display = display.replace(/^@/, "");
			href = `https://twitter.com/${display}`;
		} else if (label === "Portfolio") {
			icon = (
				<Globe
					size={14}
					style={{ color: accentColor }}
					className="shrink-0"
				/>
			);
			display = url.replace(
				/^(?:https?:\/\/)?(?:www\.)?/,
				"",
			);
		} else if (label === "Dribbble") {
			icon = (
				<Globe
					size={14}
					style={{ color: accentColor }}
					className="shrink-0"
				/>
			);
			display = url.replace(
				/^(?:https?:\/\/)?(?:www\.)?dribbble\.com\//,
				"",
			);
			href = `https://dribbble.com/${display}`;
		} else if (label === "Behance") {
			icon = (
				<Globe
					size={14}
					style={{ color: accentColor }}
					className="shrink-0"
				/>
			);
			display = url.replace(
				/^(?:https?:\/\/)?(?:www\.)?behance\.net\//,
				"",
			);
			href = `https://behance.net/${display}`;
		} else if (label === "Medium") {
			icon = (
				<Globe
					size={14}
					style={{ color: accentColor }}
					className="shrink-0"
				/>
			);
			display = url.replace(
				/^(?:https?:\/\/)?(?:www\.)?medium\.com\/@?/,
				"",
			);
			href = `https://medium.com/@${display}`;
		} else {
			icon = (
				<LinkIcon
					size={14}
					style={{ color: accentColor }}
					className="shrink-0"
				/>
			);
		}

		return { icon, display, href };
	};

	return (
		<div
			className="p-12 leading-relaxed relative break-words h-full"
			style={{
				backgroundColor: backgroundColor,
				color: textColor,
			}}
		>
			{/* Header */}
			{isFirstPage && (
				<div
					className="mb-10 border-b-2 pb-6"
					style={{ borderColor: accentColor }}
					data-section="header"
				>
					<h1
						className="text-5xl font-bold uppercase tracking-tight mb-2 break-words"
						style={{ color: textColor }}
					>
						{personalInfo.fullName}
					</h1>
					<p
						className="text-xl font-bold tracking-wider uppercase mb-6 break-words"
						style={{ color: accentColor }}
					>
						{personalInfo.jobTitle}
					</p>

					{/* Header Contact Grid */}
					<div
						className="relative top-0 right-0 text-right grid gap-x-6 gap-y-1 max-w-[50%]"
						style={{
							gridTemplateRows:
								"repeat(3, min-content)",
							gridAutoFlow: "column",
							justifyContent: "left",
							justifyItems: "left",
						}}
					>
						{/* Standard Contact Items */}
						{personalInfo.email && (
							<div
								className="flex items-center justify-end gap-2 text-sm font-medium"
								style={{
									color: textColor,
									opacity: 0.7,
								}}
							>
								<Mail
									size={
										14
									}
									style={{
										color: accentColor,
									}}
									className="shrink-0"
								/>
								<span className="break-all">
									{
										personalInfo.email
									}
								</span>
							</div>
						)}
						{personalInfo.phone && (
							<div
								className="flex items-center justify-end gap-2 text-sm font-medium"
								style={{
									color: textColor,
									opacity: 0.7,
								}}
							>
								<Phone
									size={
										14
									}
									style={{
										color: accentColor,
									}}
									className="shrink-0"
								/>
								<span>
									{
										personalInfo.phone
									}
								</span>
							</div>
						)}
						{personalInfo.location && (
							<div
								className="flex items-center justify-end gap-2 text-sm font-medium"
								style={{
									color: textColor,
									opacity: 0.7,
								}}
							>
								<MapPin
									size={
										14
									}
									style={{
										color: accentColor,
									}}
									className="shrink-0"
								/>
								<span>
									{
										personalInfo.location
									}
								</span>
							</div>
						)}

						{/* Dynamic Links */}
						{(personalInfo.links || []).map(
							(link) => {
								const {
									icon,
									display,
									href,
								} =
									getLinkInfo(
										link,
									);
								return (
									<div
										key={
											link.id
										}
										className="flex items-center justify-end gap-2 text-sm font-medium"
										style={{
											color: textColor,
											opacity: 0.7,
										}}
									>
										{
											icon
										}
										<a
											href={
												href
											}
											target="_blank"
											rel="noreferrer"
											className="hover:underline"
										>
											{
												display
											}
										</a>
									</div>
								);
							},
						)}
					</div>
				</div>
			)}

			{/* Sections */}
			<div className="space-y-8">
				{/* Summary */}
				{summary && (
					<div data-section="summary">
						<h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 mb-3">
							Professional Summary
						</h3>
						<p className="text-sm text-gray-600 leading-6 text-justify break-words whitespace-pre-wrap">
							{summary}
						</p>
					</div>
				)}

				{/* Experience */}
				{experience && experience.length > 0 && (
					<div className="experience-section">
						<h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 mb-4">
							Work Experience
						</h3>
						<div className="space-y-6">
							{experience.map(
								(
									exp,
									index,
								) => (
									<div
										key={
											exp.id
										}
										data-section="experience"
										data-index={
											index
										}
									>
										<div className="flex justify-between items-baseline mb-1">
											<h4 className="font-bold text-gray-800 break-words">
												{
													exp.role
												}
											</h4>
											<span
												className="text-xs font-bold shrink-0 ml-2"
												style={{
													color: accentColor,
												}}
											>
												{
													exp.startDate
												}{" "}
												-{" "}
												{
													exp.endDate
												}
											</span>
										</div>
										<div className="text-xs text-gray-500 italic mb-2 break-words">
											{
												exp.company
											}{" "}
											•{" "}
											{
												exp.location
											}
										</div>
										<p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap break-words">
											{
												exp.description
											}
										</p>
									</div>
								),
							)}
						</div>
					</div>
				)}

				{/* Education */}
				{education && education.length > 0 && (
					<div className="education-section">
						<h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 mb-4">
							Education
						</h3>
						<div className="space-y-4">
							{education.map(
								(
									edu,
									index,
								) => (
									<div
										key={
											edu.id
										}
										data-section="education"
										data-index={
											index
										}
									>
										<div className="flex justify-between items-baseline mb-1">
											<h4 className="font-bold text-gray-800 break-words">
												{
													edu.degree
												}
											</h4>
											<span
												className="text-xs font-bold shrink-0 ml-2"
												style={{
													color: accentColor,
												}}
											>
												{
													edu.startDate
												}{" "}
												-{" "}
												{
													edu.endDate
												}
											</span>
										</div>
										<div className="text-xs text-gray-500 font-medium break-words">
											{
												edu.school
											}

											,{" "}
											{
												edu.location
											}
										</div>
									</div>
								),
							)}
						</div>
					</div>
				)}

				{/* Skills */}
				{/* Skills */}
				{(Array.isArray(skills)
					? skills.length > 0
					: skills) && (
					<div data-section="skills">
						<h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 mb-3">
							Skills
						</h3>
						<div className="flex flex-wrap gap-2">
							{(Array.isArray(skills)
								? skills
								: skills
										.split(
											",",
										)
										.map(
											(
												s,
											) =>
												s.trim(),
										)
										.filter(
											Boolean,
										)
							).map(
								(
									skill,
									index,
								) => (
									<span
										key={
											index
										}
										className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium print:bg-gray-100 break-words max-w-full"
									>
										{
											skill
										}
									</span>
								),
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ModernTemplate;
