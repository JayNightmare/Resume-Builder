import React, { useRef } from "react";
import { useResume } from "../../context/ResumeContext";
import { getTemplate } from "../../data/templates";
import { usePageGeneration } from "../../utils/pageGeneration";

const ResumeDocument = React.forwardRef((props, ref) => {
	const { resumeData } = useResume();
	const { templateId } = resumeData;
	const ghostRef = useRef(null);

	const TemplateComponent = getTemplate(templateId).component;
	const { pages } = usePageGeneration(resumeData, ghostRef);

	return (
		<div
			ref={ref}
			className="resume-document-container print:m-0"
			style={{ position: "relative" }}
		>
			{/* Ghost Element for Measurement */}
			<div
				ref={ghostRef}
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					visibility: "hidden",
					zIndex: -1,
					width: "210mm",
					minHeight: "297mm",
				}}
			>
				<TemplateComponent data={resumeData} />
			</div>

			{/* Rendered Pages */}
			{pages.map((pageData, index) => (
				<div
					key={index}
					className="bg-white shadow-lg mx-auto overflow-hidden text-left mb-8 last:mb-0 print:shadow-none print:mb-0 print:break-after-page"
					style={{
						width: "210mm",
						minHeight: "297mm",
						height: "auto",
						transformOrigin: "top center",
						pageBreakAfter:
							index < pages.length - 1
								? "always"
								: "auto",
					}}
				>
					<TemplateComponent
						data={pageData}
						isFirstPage={index === 0}
					/>
				</div>
			))}
		</div>
	);
});

export default ResumeDocument;
