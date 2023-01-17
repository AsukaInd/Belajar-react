const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

function copySSR() {
	const sourceDirectoryPath = path.join(__dirname, '..', './apps/dashboard/public');
	const destinationDirectoryPath = path.join(__dirname, '..', './apps/landing/public');

	fs.readdir(sourceDirectoryPath, (error, files) => {

		if (error) {
			throw error
		}

		files.forEach((file) => {
			const sourcePath = path.join(sourceDirectoryPath, file)
			const destinationPath = path.join(destinationDirectoryPath, file)

			// copy
			fse.copySync(sourcePath, destinationPath, { overwrite: true })

			// delete build public files
			// const deletePath = path.join(destinationDirectoryPath, 'app')
			// fs.rmSync(path.join(deletePath, file));
		});

	});
}

copySSR()