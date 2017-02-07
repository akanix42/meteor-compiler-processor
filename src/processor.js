import path from 'path';
import IncludedFile from 'meteor-build-plugin-helper-included-file';
import logger from 'hookable-logger';

export default class Processor {
  constructor(stepName, {fileTypes = ['scss','sass'], fileExtensions = ['scss','sass']}) {
    this.stepName = stepName;
    this.filesByName = null;
    this.fileExtensions = fileExtensions;
    this.fileTypes = fileTypes;
    this.additionalLineCount = 0;
  }

  isRoot(inputFile) {
    const fileOptions = inputFile.getFileOptions();
    if (fileOptions.hasOwnProperty('isImport')) {
      return !fileOptions.isImport;
    }

    return !hasUnderscore(inputFile.getPathInPackage());

    function hasUnderscore(file) {
      return path.basename(file)[0] === '_';
    }
  }

  handlesFileExtension(fileExtension) {
    return this.fileExtensions.indexOf(fileExtension) !== -1;
  }

  handlesType(type) {
    return this.fileTypes.indexOf(type) !== -1;
  }

  async process(file, filesByName) {
    this.filesByName = filesByName;
    try {
      await this._process(file);
    } catch (err) {
      const numberOfAdditionalLines = this.additionalLineCount
        ? this.additionalLineCount + 1
        : 0;
      const adjustedLineNumber = err.line - numberOfAdditionalLines;
      logger.error(`\n/~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
      logger.error(`Processing Step: ${this.stepName}`);
      logger.error(`Unable to process ${file.importPath}\nLine: ${adjustedLineNumber}, Column: ${err.column}\n${err}`);
      logger.error(`\n/~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
      throw err;
    }
  }

  _process(file) {
    throw new Error('the _process method must be implemented by the child class')
  }

  _createIncludedFile(importPath, rootFile) {
    const file = new IncludedFile(importPath, rootFile);
    file.prepInputFile().await();
    this.filesByName.set(importPath, file);
  }

};
