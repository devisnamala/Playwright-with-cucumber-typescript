const report = require("multiple-cucumber-html-reporter");
const fs = require("fs");
const path = require("path");

report.generate({
    jsonDir: "test-results/reports/",
    reportPath: "test-results/reports/",
    reportName: "Playwright Automation",
    reportTitle: "HotUKDeals Test Report",
    getVideo: (scenario: any) => { // Explicitly define scenario as 'any' if type is unknown
        const videoPath = path.join(__dirname, `test-results/videos/${scenario.name}.webm`);
        if (fs.existsSync(videoPath)) {
            try {
                return fs.readFileSync(videoPath, { encoding: "base64" });
            } catch (err) {
                console.error(`Error reading video file ${videoPath}:`, err);
                return null;
            }
        }
        return null;
    },
    metadata: {
        browser: {
            name: "chrome",
            version: "112",
        },
        device: "Local test machine",
        platform: {
            name: "Mac",
            version: "",
        },
    },
    customData: {
        title: "Run info",
        data: [
            { label: "Project", value: "HotUKDeals" },
            { label: "Release", value: "1.2.3" },
            { label: "Cycle", value: "Functional test" }
        ],
    },
    customStyle: '', // Optional: Custom CSS to style the embedded videos
    pageTitle: 'Custom Report', // Optional: Custom title for the HTML report
    storeScreenshots: true, // Ensure screenshots are stored in the report
    storeVideos: true // Ensure videos are stored in the report
});
