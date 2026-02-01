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
import { getContrastColor } from "../../utils/colors";

const SidebarTemplate = ({ data, isFirstPage = true }) => {
	const { personalInfo, summary, experience, education, skills, theme } =
		data;

	const accentColor = theme?.accent || "#2563eb";
	const sidebarColor = theme?.sidebar || "#1f2937";
	const backgroundColor = theme?.background || "#ffffff";
	const textColor = theme?.text || "#1f2937";
	const sidebarBorder = theme?.sidebarBorder || "#1f2937";
	const sidebarBorderWidth = theme?.sidebarBorderWidth || "1px";

	const sidebarText = getContrastColor(sidebarColor);
	const sidebarTextMuted =
		sidebarText === "#ffffff"
			? "rgba(255, 255, 255, 0.8)"
			: "rgba(0, 0, 0, 0.6)";

	const getLinkInfo = (link) => {
		const { label, url } = link;
		let icon = <Globe size={14} className="shrink-0" />;
		let display = url;
		let href = url.startsWith("http") ? url : `https://${url}`;

		if (label === "LinkedIn") {
			icon = <Linkedin size={14} className="shrink-0" />;
			display = url.replace(
				/^(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\//,
				"",
			);
			href = `https://linkedin.com/in/${display}`;
		} else if (label === "GitHub") {
			icon = <Github size={14} className="shrink-0" />;
			display = url.replace(
				/^(?:https?:\/\/)?(?:www\.)?github\.com\//,
				"",
			);
			href = `https://github.com/${display}`;
		} else if (label === "Twitter") {
			icon = <Twitter size={14} className="shrink-0" />;
			display = url.replace(
				/^(?:https?:\/\/)?(?:www\.)?twitter\.com\//,
				"",
			);
			display = display.replace(/^@/, "");
			href = `https://twitter.com/${display}`;
		} else if (label === "Portfolio") {
			icon = <Globe size={14} className="shrink-0" />;
			display = url.replace(
				/^(?:https?:\/\/)?(?:www\.)?/,
				"",
			);
		} else if (label === "Dribbble") {
			icon = <Globe size={14} className="shrink-0" />;
			display = url.replace(
				/^(?:https?:\/\/)?(?:www\.)?dribbble\.com\//,
				"",
			);
			href = `https://dribbble.com/${display}`;
		} else if (label === "Behance") {
			icon = <Globe size={14} className="shrink-0" />;
			display = url.replace(
				/^(?:https?:\/\/)?(?:www\.)?behance\.net\//,
				"",
			);
			href = `https://behance.net/${display}`;
		} else if (label === "Medium") {
			icon = <Globe size={14} className="shrink-0" />;
			display = url.replace(
				/^(?:https?:\/\/)?(?:www\.)?medium\.com\/@?/,
				"",
			);
			href = `https://medium.com/@${display}`;
		} else {
			icon = <LinkIcon size={14} className="shrink-0" />;
		}

		return { icon, display, href };
	};

	return (
		<div
			className="flex h-full min-h-[297mm]"
			style={{
				color: textColor,
				backgroundColor: backgroundColor,
				maxHeight: "297mm",
				maxWidth: "210mm",
			}}
		>
			{/* Left Sidebar */}
			<div
				className="w-1/3 p-8 flex flex-col gap-8"
				style={{
					backgroundColor: sidebarColor,
					color: sidebarText,
					borderColor: sidebarBorder,
					borderStyle: "solid",
					borderRightWidth: sidebarBorderWidth,
				}}
				data-section="sidebar"
			>
				{isFirstPage && (
					<>
						{/* Header Info */}
						<div className="space-y-4">
							<h1
								className="text-3xl font-bold uppercase tracking-wider break-words"
								style={{
									color: sidebarText,
								}}
							>
								{
									personalInfo.fullName
								}
							</h1>
							<p
								className="text-lg font-medium uppercase tracking-wide opacity-90 break-words"
								style={{
									color: accentColor,
								}}
							>
								{
									personalInfo.jobTitle
								}
							</p>
						</div>

						{/* Contact Info */}
						<div className="space-y-4 text-sm">
							{personalInfo.email && (
								<div
									className="flex items-center gap-3"
									style={{
										color: sidebarTextMuted,
									}}
								>
									<Mail
										size={
											16
										}
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
									className="flex items-center gap-3"
									style={{
										color: sidebarTextMuted,
									}}
								>
									<Phone
										size={
											16
										}
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
									className="flex items-center gap-3"
									style={{
										color: sidebarTextMuted,
									}}
								>
									<MapPin
										size={
											16
										}
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
							{(
								personalInfo.links ||
								[]
							).map((link) => {
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
										className="flex items-center gap-3"
										style={{
											color: sidebarTextMuted,
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
											className="hover:underline transition-colors"
											style={{
												color: sidebarText,
											}}
										>
											{
												display
											}
										</a>
									</div>
								);
							})}
						</div>

						{/* Skills */}
						{skills && (
							<div className="mt-8">
								<h3
									className="text-xs font-bold uppercase tracking-widest border-b border-gray-600 pb-2 mb-4"
									style={{
										color: accentColor,
									}}
								>
									Skills
								</h3>
								<p className="text-sm leading-6 opacity-80 whitespace-pre-wrap break-words">
									{skills}
								</p>
							</div>
						)}
					</>
				)}
			</div>

			{/* Main Content */}
			<div
				className="w-2/3 p-10"
				style={{ backgroundColor: backgroundColor }}
			>
				{/* Summary */}
				{summary && (
					<div
						className="mb-8"
						data-section="summary"
					>
						<h3
							className="text-xl font-bold uppercase tracking-tight mb-4 flex items-center gap-2"
							style={{
								color: accentColor,
							}}
						>
							Professional Profile
						</h3>
						<p
							className="text-sm leading-relaxed text-justify whitespace-pre-wrap break-words"
							style={{
								color: textColor,
							}}
						>
							{summary}
						</p>
					</div>
				)}

				<hr className="border-gray-200 mb-8" />

				{/* Experience */}
				{experience && experience.length > 0 && (
					<div
						className="mb-8"
						data-section="experience-container"
					>
						<h3
							className="text-xl font-bold uppercase tracking-tight mb-6 flex items-center gap-2"
							style={{
								color: accentColor,
							}}
						>
							Work Experience
						</h3>
						<div className="space-y-8 border-l-2 border-gray-100 pl-6 ml-1">
							{experience.map(
								(
									exp,
									index,
								) => (
									<div
										key={
											exp.id
										}
										className="relative"
										data-section="experience"
										data-index={
											index
										}
									>
										{/* Timeline Dot */}
										<div
											className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full border-2 bg-white"
											style={{
												borderColor:
													accentColor,
											}}
										/>

										<div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
											<h4 className="font-bold text-gray-800 text-lg">
												{
													exp.role
												}
											</h4>
											<span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
												{
													exp.startDate
												}{" "}
												-{" "}
												{
													exp.endDate
												}
											</span>
										</div>
										<div className="text-sm font-semibold text-gray-600 mb-3">
											{
												exp.company
											}{" "}
											•{" "}
											{
												exp.location
											}
										</div>
										<p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
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
					<div data-section="education-container">
						<h3
							className="text-xl font-bold uppercase tracking-tight mb-6 flex items-center gap-2"
							style={{
								color: accentColor,
							}}
						>
							Education
						</h3>
						<div className="grid grid-cols-1 gap-6">
							{education.map(
								(
									edu,
									index,
								) => (
									<div
										key={
											edu.id
										}
										className="bg-gray-50 p-4 rounded-lg border border-gray-100"
										data-section="education"
										data-index={
											index
										}
									>
										<div className="flex justify-between items-start mb-2">
											<h4 className="font-bold text-gray-800">
												{
													edu.degree
												}
											</h4>
											<span className="text-xs font-bold text-gray-500">
												{
													edu.startDate
												}{" "}
												-{" "}
												{
													edu.endDate
												}
											</span>
										</div>
										<div className="text-sm text-gray-600">
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
			</div>
		</div>
	);
};

export default SidebarTemplate;
