'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _meteorBuildPluginHelperIncludedFile = require('meteor-build-plugin-helper-included-file');

var _meteorBuildPluginHelperIncludedFile2 = _interopRequireDefault(_meteorBuildPluginHelperIncludedFile);

var _hookableLogger = require('hookable-logger');

var _hookableLogger2 = _interopRequireDefault(_hookableLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Processor = function () {
  function Processor(stepName, _ref) {
    var _ref$fileTypes = _ref.fileTypes,
        fileTypes = _ref$fileTypes === undefined ? ['scss', 'sass'] : _ref$fileTypes,
        _ref$fileExtensions = _ref.fileExtensions,
        fileExtensions = _ref$fileExtensions === undefined ? ['scss', 'sass'] : _ref$fileExtensions;
    (0, _classCallCheck3.default)(this, Processor);

    this.stepName = stepName;
    this.filesByName = null;
    this.fileExtensions = fileExtensions;
    this.fileTypes = fileTypes;
    this.additionalLineCount = 0;
  }

  (0, _createClass3.default)(Processor, [{
    key: 'isRoot',
    value: function isRoot(inputFile) {
      var fileOptions = inputFile.getFileOptions();
      if (fileOptions.hasOwnProperty('isImport')) {
        return !fileOptions.isImport;
      }

      return !hasUnderscore(inputFile.getPathInPackage());

      function hasUnderscore(file) {
        return _path2.default.basename(file)[0] === '_';
      }
    }
  }, {
    key: 'handlesFileExtension',
    value: function handlesFileExtension(fileExtension) {
      return this.fileExtensions.indexOf(fileExtension) !== -1;
    }
  }, {
    key: 'handlesType',
    value: function handlesType(type) {
      return this.fileTypes.indexOf(type) !== -1;
    }
  }, {
    key: 'process',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(file, filesByName) {
        var numberOfAdditionalLines, adjustedLineNumber;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.filesByName = filesByName;
                _context.prev = 1;
                _context.next = 4;
                return this._process(file);

              case 4:
                _context.next = 15;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context['catch'](1);
                numberOfAdditionalLines = this.additionalLineCount ? this.additionalLineCount + 1 : 0;
                adjustedLineNumber = _context.t0.line - numberOfAdditionalLines;

                _hookableLogger2.default.error('\n/~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
                _hookableLogger2.default.error('Processing Step: ' + this.stepName);
                _hookableLogger2.default.error('Unable to process ' + file.importPath + '\nLine: ' + adjustedLineNumber + ', Column: ' + _context.t0.column + '\n' + _context.t0);
                _hookableLogger2.default.error('\n/~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
                throw _context.t0;

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 6]]);
      }));

      function process(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return process;
    }()
  }, {
    key: '_process',
    value: function _process(file) {
      throw new Error('the _process method must be implemented by the child class');
    }
  }, {
    key: '_createIncludedFile',
    value: function _createIncludedFile(importPath, rootFile) {
      var file = new _meteorBuildPluginHelperIncludedFile2.default(importPath, rootFile);
      file.prepInputFile().await();
      this.filesByName.set(importPath, file);
    }
  }]);
  return Processor;
}();

exports.default = Processor;
;
//# sourceMappingURL=processor.js.map
