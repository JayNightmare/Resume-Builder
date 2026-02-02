import { useState, useEffect } from "react";

// This should be updated whenever a new changelog entry is added
export const CURRENT_APP_VERSION = "0.2.0";

export const useUpdates = () => {
	const [hasNewUpdate, setHasNewUpdate] = useState(false);

	useEffect(() => {
		const checkUpdateStatus = () => {
			const lastSeenVersion = localStorage.getItem(
				"app_last_seen_version",
			);
			if (lastSeenVersion !== CURRENT_APP_VERSION) {
				setHasNewUpdate(true);
			} else {
				setHasNewUpdate(false);
			}
		};

		// Check initially
		checkUpdateStatus();

		// Listen for custom event to sync across components
		window.addEventListener("app-update-seen", checkUpdateStatus);

		return () => {
			window.removeEventListener(
				"app-update-seen",
				checkUpdateStatus,
			);
		};
	}, []);

	const markAsSeen = () => {
		localStorage.setItem(
			"app_last_seen_version",
			CURRENT_APP_VERSION,
		);
		setHasNewUpdate(false);
		// Dispatch event to notify other components
		window.dispatchEvent(new Event("app-update-seen"));
	};

	return {
		hasNewUpdate,
		markAsSeen,
		currentVersion: CURRENT_APP_VERSION,
	};
};
