import ModernTemplate from "../components/templates/ModernTemplate";
import SidebarTemplate from "../components/templates/SidebarTemplate";

export const templates = [
	{
		id: "modern",
		name: "Modern Clean",
		component: ModernTemplate,
		thumbnail: "modern-thumb", // We can use CSS or images for this later
	},
	{
		id: "sidebar",
		name: "Professional Sidebar",
		component: SidebarTemplate,
		thumbnail: "sidebar-thumb",
	},
];

export const getTemplate = (id) => {
	return templates.find((t) => t.id === id) || templates[0];
};
