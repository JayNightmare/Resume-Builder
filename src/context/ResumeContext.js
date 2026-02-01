import React, { createContext, useContext, useState, useEffect } from "react";

const ResumeContext = createContext();

const initialData = {
	personalInfo: {
		fullName: "Alex Morgan",
		jobTitle: "Senior Product Designer",
		email: "alex.morgan@example.com",
		phone: "+1 (555) 123-4567",
		location: "San Francisco, CA",
		links: [
			{
				id: 1,
				label: "LinkedIn",
				url: "linkedin.com/in/alexmorgan",
			},
			{ id: 2, label: "Portfolio", url: "alexmorgan.design" },
		],
	},
	summary: "Creative and detail-oriented Product Designer with 5+ years of experience in building user-centric digital products.",
	experience: [
		{
			id: 1,
			role: "Senior Product Designer",
			company: "TechFlow Systems",
			location: "San Francisco, CA",
			startDate: "2021",
			endDate: "Present",
			description:
				"Spearheaded the redesign of the core SaaS platform, improving user retention by 15%.",
		},
	],
	education: [
		{
			id: 1,
			degree: "Bachelor of Fine Arts",
			school: "University of Design",
			location: "New York, NY",
			startDate: "2014",
			endDate: "2018",
		},
	],
	skills: "Figma, Sketch, Adobe XD, HTML/CSS, React, User Research, Prototyping",
	theme: {
		accent: "#2563eb", // Primary action/highlight
		background: "#ffffff", // Document background
		sidebar: "#1f2937", // Sidebar background
		text: "#1f2937", // Primary text
		font: "sans",
	},
	templateId: "modern",
	settings: {
		downloadFormat: "pdf", // 'pdf' or 'json'
	},
};

const emptyData = {
	personalInfo: {
		fullName: "",
		jobTitle: "",
		email: "",
		phone: "",
		location: "",
		links: [],
	},
	summary: "",
	experience: [],
	education: [],
	skills: "",
	theme: {
		accent: "#2563eb",
		background: "#ffffff",
		sidebar: "#1f2937",
		text: "#1f2937",
		font: "sans",
	},
	templateId: "modern",
	settings: {
		downloadFormat: "pdf",
	},
};

export const ResumeProvider = ({ children }) => {
	// Load from localStorage or use initialData
	const [resumeData, setResumeData] = useState(() => {
		const saved = localStorage.getItem("resumeData");
		if (saved) {
			const parsed = JSON.parse(saved);
			// Migration: If old structure exists (theme.color directly or theme.theme.color)
			if (
				parsed.theme &&
				(parsed.theme.color ||
					(parsed.theme.theme &&
						parsed.theme.theme.color))
			) {
				// Normalize to new structure
				const oldColor =
					parsed.theme.color ||
					parsed.theme.theme?.color ||
					"#2563eb";
				return {
					...parsed,
					theme: {
						accent: oldColor,
						background: "#ffffff",
						sidebar: "#1f2937",
						text: "#1f2937",
						font: "sans",
					},
					settings: parsed.settings || {
						downloadFormat: "pdf",
					},
				};
			}
			return parsed;
		}
		return initialData;
	});

	// Save to localStorage whenever data changes
	useEffect(() => {
		localStorage.setItem("resumeData", JSON.stringify(resumeData));
	}, [resumeData]);

	// Actions
	const updatePersonalInfo = (field, value) => {
		setResumeData((prev) => ({
			...prev,
			personalInfo: { ...prev.personalInfo, [field]: value },
		}));
	};

	const addLink = () => {
		setResumeData((prev) => ({
			...prev,
			personalInfo: {
				...prev.personalInfo,
				links: [
					...(prev.personalInfo.links || []),
					{ id: Date.now(), label: "", url: "" },
				],
			},
		}));
	};

	const removeLink = (id) => {
		setResumeData((prev) => ({
			...prev,
			personalInfo: {
				...prev.personalInfo,
				links: (prev.personalInfo.links || []).filter(
					(l) => l.id !== id,
				),
			},
		}));
	};

	const updateLink = (id, field, value) => {
		setResumeData((prev) => ({
			...prev,
			personalInfo: {
				...prev.personalInfo,
				links: (prev.personalInfo.links || []).map(
					(l) =>
						l.id === id
							? {
									...l,
									[field]: value,
								}
							: l,
				),
			},
		}));
	};

	const updateSummary = (value) => {
		setResumeData((prev) => ({ ...prev, summary: value }));
	};

	const updateSkills = (value) => {
		setResumeData((prev) => ({ ...prev, skills: value }));
	};

	const updateTheme = (field, value) => {
		setResumeData((prev) => ({
			...prev,
			theme: { ...prev.theme, [field]: value },
		}));
	};

	const updateTemplate = (id) => {
		setResumeData((prev) => ({ ...prev, templateId: id }));
	};

	const updateSettings = (field, value) => {
		setResumeData((prev) => ({
			...prev,
			settings: {
				...prev.settings,
				[field]: value,
			},
		}));
	};

	const resetResume = () => {
		setResumeData(emptyData);
	};

	// Experience Actions
	const addExperience = () => {
		setResumeData((prev) => ({
			...prev,
			experience: [
				{
					id: Date.now(),
					role: "Job Title",
					company: "Company Name",
					location: "City, State",
					startDate: "MM/YYYY",
					endDate: "Present",
					description:
						"Description of your role and achievements...",
				},
				...prev.experience,
			],
		}));
	};

	const removeExperience = (id) => {
		setResumeData((prev) => ({
			...prev,
			experience: prev.experience.filter(
				(exp) => exp.id !== id,
			),
		}));
	};

	const updateExperience = (id, field, value) => {
		setResumeData((prev) => ({
			...prev,
			experience: prev.experience.map((exp) =>
				exp.id === id
					? { ...exp, [field]: value }
					: exp,
			),
		}));
	};

	// Education Actions
	const addEducation = () => {
		setResumeData((prev) => ({
			...prev,
			education: [
				{
					id: Date.now(),
					degree: "Degree / Major",
					school: "University Name",
					location: "City, State",
					startDate: "YYYY",
					endDate: "YYYY",
				},
				...prev.education,
			],
		}));
	};

	const removeEducation = (id) => {
		setResumeData((prev) => ({
			...prev,
			education: prev.education.filter(
				(edu) => edu.id !== id,
			),
		}));
	};

	const updateEducation = (id, field, value) => {
		setResumeData((prev) => ({
			...prev,
			education: prev.education.map((edu) =>
				edu.id === id
					? { ...edu, [field]: value }
					: edu,
			),
		}));
	};

	return (
		<ResumeContext.Provider
			value={{
				resumeData,
				setResumeData,
				updatePersonalInfo,
				addLink,
				removeLink,
				updateLink,
				updateSummary,
				updateSkills,
				updateTheme,
				updateTemplate,
				updateSettings,
				resetResume,
				addExperience,
				removeExperience,
				updateExperience,
				addEducation,
				removeEducation,
				updateEducation,
			}}
		>
			{children}
		</ResumeContext.Provider>
	);
};

export const useResume = () => useContext(ResumeContext);
