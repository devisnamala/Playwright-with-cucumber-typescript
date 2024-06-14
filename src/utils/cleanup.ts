import fs from 'fs';
import path from 'path';

// Utility function to delete all files in a directory
const deleteFilesInDirectory = (directoryPath: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        if (fs.existsSync(directoryPath)) {
            fs.readdir(directoryPath, (err, files) => {
                if (err) {
                    console.error(`Unable to scan directory: ${err}`);
                    reject(err);
                    return;
                }
                files.forEach((file) => {
                    const filePath = path.join(directoryPath, file);
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error(`Error deleting file ${filePath}:`, err);
                        } else {
                            console.log(`Deleted file: ${filePath}`);
                        }
                    });
                });
                resolve();
            });
        } else {
            resolve();
        }
    });
};

// Path to the recordings directory
const recordingsDir = path.join(__dirname, '../test-results/recordings');

// Delete files in the recordings directory
deleteFilesInDirectory(recordingsDir)
    .then(() => {
        console.log('Cleanup completed successfully.');
    })
    .catch((err) => {
        console.error('Error during cleanup:', err);
    });
