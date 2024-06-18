import * as fs from 'fs';
import * as path from 'path';

interface FileWithStats {
    name: string;
    time: number;
}

// Utility function to delete all files in a directory except the latest one
const deleteOldFilesInDirectory = async (directoryPath: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        if (fs.existsSync(directoryPath)) {
            fs.readdir(directoryPath, (err, files) => {
                if (err) {
                    console.error(`Unable to scan directory: ${err}`);
                    reject(err);
                    return;
                }

                const filesWithStats: FileWithStats[] = files.map((file) => {
                    const filePath = path.join(directoryPath, file);
                    const stats = fs.statSync(filePath);
                    return { name: file, time: stats.mtime.getTime() };
                });

                if (filesWithStats.length > 1) {
                    // Sort files by modified time, descending
                    filesWithStats.sort((a, b) => b.time - a.time);
                    
                    // Delete all files except the latest one
                    for (let i = 1; i < filesWithStats.length; i++) {
                        const filePath = path.join(directoryPath, filesWithStats[i].name);
                        fs.unlink(filePath, (err) => {
                            if (err) {
                                console.error(`Error deleting file ${filePath}:`, err);
                            } else {
                                console.log(`Deleted file: ${filePath}`);
                            }
                        });
                    }
                }
                resolve();
            });
        } else {
            resolve();
        }
    });
};

// Directories to clean up
const recordingsDir = path.join(__dirname, 'test-results/recordings');
const screenshotsDir = path.join(__dirname, 'test-results/screenshots');
const tracesDir = path.join(__dirname, 'test-results/traces');

// Delete old files in the recordings directory
deleteOldFilesInDirectory(recordingsDir)
    .then(() => console.log('Cleanup completed successfully in recordings directory.'))
    .catch((err) => console.error('Error during cleanup in recordings directory:', err));

// Delete old files in the screenshots directory
deleteOldFilesInDirectory(screenshotsDir)
    .then(() => console.log('Cleanup completed successfully in screenshots directory.'))
    .catch((err) => console.error('Error during cleanup in screenshots directory:', err));

// Delete old files in the traces directory
deleteOldFilesInDirectory(tracesDir)
    .then(() => console.log('Cleanup completed successfully in traces directory.'))
    .catch((err) => console.error('Error during cleanup in traces directory:', err));
