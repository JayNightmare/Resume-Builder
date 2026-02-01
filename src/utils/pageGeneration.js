/**
 * Utility for handling page generation and content splitting for resumes.
 */
import { useState, useLayoutEffect } from "react";

// A4 dimensions in pixels at roughly 96 DPI
// 297mm * 3.78px/mm ≈ 1122px
export const A4_HEIGHT_PX = 1122;
const PAGE_MARGIN_BOTTOM = 50; // Safety margin
const PAGE_HEIGHT_LIMIT = A4_HEIGHT_PX - PAGE_MARGIN_BOTTOM;

export const usePageGeneration = (data, sourceRef) => {
	const [pages, setPages] = useState([data]);
	const [isGenerating, setIsGenerating] = useState(true);

	useLayoutEffect(() => {
		if (!sourceRef.current || !data) return;

		const calculateSplits = async () => {
			setIsGenerating(true);
			// Small delay to ensure rendering
			await new Promise((resolve) => setTimeout(resolve, 50));

			const sourceEl = sourceRef.current;
			// Get all elements with data-section attribute
			// We traverse the DOM tree in order
			const sections = Array.from(
				sourceEl.querySelectorAll("[data-section]"),
			);

			if (sections.length === 0) {
				// Fallback if no sections found (e.g. templates not updated yet or initial render)
				if (sourceEl.scrollHeight > PAGE_HEIGHT_LIMIT) {
					// Can't split smart, maybe just duplicate? No, just return as is.
					console.warn(
						"Page generation: No data-sections found, returning single page.",
					);
				}
				setPages([data]);
				setIsGenerating(false);
				return;
			}

			// Create First Page
			const pagesList = [];

			// We need a helper to create an empty page structure
			const createEmptyPage = () => ({
				personalInfo: data.personalInfo, // Always present, template decides to hide
				summary: "",
				experience: [],
				education: [],
				skills: "", // Text based skills
				theme: data.theme,
				// Helper for template to know it's a continuation?
				// We rely on the fact that arrays are empty to not render sections.
				// But for "Sidebar" or "Header", we need to explicitly know.
				isContinuation: true,
			});

			let currentPage = {
				...data,
				isContinuation: false,
				experience: [],
				education: [],
			};
			// We start with full data but we will clear array/text fields and re-add them as we go?
			// No, better to start empty and fill.
			// But simple fields like personalInfo are hard to "split".
			// Strategy: Start with a clean slate for lists. Text fields (Summary) are all-or-nothing for now.

			// Revised Strategy:
			// 1. Identify which "Block" fits.
			// 2. Blocks: Header, Sidebar, Summary, Experience Items, Education Items, Skills.

			// We need to associate DOM elements with Data.

			// Map for Experience and Education items
			// data-section="experience" data-index="0" maps to data.experience[0]

			currentPage = {
				...data,
				experience: [],
				education: [],
				// We will retain 'summary' and 'skills' initially, but if they don't fit we might clear them.
				// Actually, let's start with specific sections empty.
				summary: "",
				skills: "",
			};

			// However, header/sidebar are rendered by default if we pass `personalInfo`.
			// We need to measure them.

			let currentHeight = 0;

			// Special handling for Sidebar:
			// If sidebar exists, its height counts?
			// In SidebarTemplate, Sidebar is absolute/column. Main content is separate.
			// We should measure the MAX of Sidebar vs Main Content for the page height check?
			// Or does the split happen independently?
			// For simplicity: We split based on the Main Content column mainly.
			// If Sidebar is taller than A4, we might crop it. (Sidebar usually creates the min-height).

			// Let's iterate over the identified sections in the DOM order.
			// NOTE: `querySelectorAll` returns document order.
			// In SidebarTemplate: Sidebar div comes first, then Main Content div.
			// We might process Sidebar completely, then Main Content.

			// If we encounter "sidebar" section:
			// Measure it. If it > A4, we are in trouble (scrolling). We'll assume it fits or is clipped.
			// We add it to Page 1.

			// If we encounter "header" (ModernTemplate):
			// Measure it. Add height.

			// If we encounter "summary":
			// Measure. If fits, set currentPage.summary = data.summary.
			// If not, trigger new page?

			// If we encounter "experience" item:
			// Measure. If fits, push to currentPage.experience.
			// Else, new page -> push to newPage.experience.

			// Helper: Close current page and start new
			const startNewPage = () => {
				pagesList.push(currentPage);
				currentPage = createEmptyPage();
				currentHeight = 0; // Reset height (margin/padding might be needed)
				// If new page, we might adding some top margin?
				currentHeight += 40; // Default padding
			};

			// Iterate!
			for (const section of sections) {
				const type =
					section.getAttribute("data-section");
				const height = section.offsetHeight;
				const marginTop =
					parseInt(
						window.getComputedStyle(section)
							.marginTop,
					) || 0;
				const marginBottom =
					parseInt(
						window.getComputedStyle(section)
							.marginBottom,
					) || 0;
				const realHeight =
					height + marginTop + marginBottom;

				// If it's a container (like "experience-container"), we ignore its height
				// and rely on its children (items).
				// BUT: the container might have padding/margin/title.
				// We should count the title/padding.
				// If we match "experience-container", we add its "overhead" (title height)?
				// Simpler: Just rely on the Items if we marked them?
				// We marked both container and items.
				// If we process container, we might double count if we also process items.
				// We should skip containers if we are processing items.

				if (
					type === "experience-container" ||
					type === "education-container"
				) {
					// Just measure the overhead (title etc) if possible?
					// Hard to separate.
					// Alternative: We only look at LEAF "blocks".
					// Header, Summary, Sidebar, Skills are blocks.
					// Expr Items, Edu Items are blocks.
					continue;
				}

				// If this is a wrapper like "sidebar" (container), we treat it as a block?
				// In SidebarTemplate, the sidebar contains everything.
				// If we treat it as a block, it takes up space.
				// But wait, Sidebar and Main content are side-by-side.
				// Their heights are parallel.
				// This logic implies a single vertical flow.

				// Complex Layout Handling:
				// If `section` is `sidebar`, it contributes to the "Sidebar Column" height.
				// Other sections contribute to "Main Column".
				// We need to track them separately?
				// If Main Column overflows, we break.
				// Sidebar usually stays on Page 1 (static).

				// Let's simplify:
				// We only care about splitting the "flowable" content (Main Column).
				// The sidebar is usually static or fits.

				if (type === "sidebar") {
					// Ignore sidebar height for splitting purposes of the main content
					continue;
				}

				if (type === "header") {
					// Add header logic
					if (
						currentHeight + realHeight >
							PAGE_HEIGHT_LIMIT &&
						currentHeight > 100
					) {
						// Header doesn't fit? Rare.
						startNewPage();
					}
					currentHeight += realHeight;
					// Header is implicitly part of page 1 data.
					// If we are on page 2, we shouldn't have a header.
					// But we are iterating the Ghost (which is Page 1).
					// So we just account for the space it takes.
				} else if (type === "summary") {
					const summaryText = data.summary;
					// Adjust height/density calculation
					// The block includes the Title (approx 40-50px) + Padding
					// Heuristic: subtracting 50px for title/padding overhead
					const overhead = 50;
					const contentHeight = Math.max(
						1,
						realHeight - overhead,
					);
					const charsPerPx =
						summaryText.length /
						contentHeight;

					if (
						currentHeight + realHeight >
						PAGE_HEIGHT_LIMIT
					) {
						// It doesn't fit entirely.
						// We need to split.

						let remainingText = summaryText;

						// While we have text to place
						while (
							remainingText.length > 0
						) {
							// Calculate space on THIS page
							const spacePending =
								PAGE_HEIGHT_LIMIT -
								currentHeight;

							// Does it fit?
							// Estimate height needed for remaining text
							// New overhead? On split pages, if we keep the title, we need overhead.
							// If template repeats title, we need overhead. (ModernTemplate does.)
							const estimatedNeeded =
								remainingText.length /
									charsPerPx +
								overhead;

							if (
								estimatedNeeded <=
								spacePending
							) {
								// It fits!
								currentPage.summary =
									remainingText;
								currentHeight +=
									estimatedNeeded;
								remainingText =
									"";
							} else {
								// It doesn't fit. Fill up this page.
								// How much text fits in `spacePending`?
								// We need room for overhead too.
								const availableForContent =
									Math.max(
										0,
										spacePending -
											overhead,
									);

								if (
									availableForContent <
									20
								) {
									// Too small to put anything useful. Start new page immediately.
									startNewPage();
									continue;
								}

								// Calculate split index
								// Safety factor 0.9 to avoid edge clipping
								const charsToFit =
									Math.floor(
										availableForContent *
											charsPerPx *
											0.9,
									);

								if (
									charsToFit <=
									0
								) {
									startNewPage();
									continue;
								}

								// Try to break at a space
								let splitIndex =
									remainingText.lastIndexOf(
										" ",
										charsToFit,
									);
								if (
									splitIndex ===
									-1
								)
									splitIndex =
										charsToFit; // Force break if no space

								const chunk =
									remainingText.substring(
										0,
										splitIndex,
									) +
									" ...";
								currentPage.summary =
									chunk;
								currentHeight +=
									spacePending; // We filled it

								// Setup for next iteration
								remainingText =
									remainingText.substring(
										splitIndex,
									); // Keep the space? or trim.
								startNewPage();
							}
						}
					} else {
						currentPage.summary =
							data.summary;
						currentHeight += realHeight;
					}
				} else if (type === "skills") {
					if (
						currentHeight + realHeight >
						PAGE_HEIGHT_LIMIT
					) {
						startNewPage();
						currentPage.skills =
							data.skills;
						currentHeight += realHeight;
					} else {
						currentPage.skills =
							data.skills;
						currentHeight += realHeight;
					}
				} else if (type === "experience") {
					const index = parseInt(
						section.getAttribute(
							"data-index",
						),
					);
					if (isNaN(index)) continue; // Specific container might be marked 'experience' without index?

					// Check if this item fits
					if (
						currentHeight + realHeight >
						PAGE_HEIGHT_LIMIT
					) {
						startNewPage();
					}

					// Add to current page
					currentPage.experience.push(
						data.experience[index],
					);
					currentHeight += realHeight;
				} else if (type === "education") {
					const index = parseInt(
						section.getAttribute(
							"data-index",
						),
					);
					if (isNaN(index)) continue;

					if (
						currentHeight + realHeight >
						PAGE_HEIGHT_LIMIT
					) {
						startNewPage();
					}

					currentPage.education.push(
						data.education[index],
					);
					currentHeight += realHeight;
				}
			}

			pagesList.push(currentPage);
			setPages(pagesList);
			setIsGenerating(false);
		};

		calculateSplits();
	}, [data, sourceRef]);

	return { pages, isGenerating };
};
