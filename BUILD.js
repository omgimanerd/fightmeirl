/**
 * This file contains compilation and build rules for the project. This file
 * is imported by the gulpfile during compilation and build.
 * For build system: 2.0.0
 */

module.exports = {
  GULPFILE_VERSION: "2.0.0",
  DEFAULT_TASKS: ['sass'],
  SASS_BUILD_RULES: [
    {
      name: 'desktop stylesheet',
      sourceFiles: [
        './public/sass/desktop.scss'
      ],
      outputDirectory: './public/dist',
      outputFile: 'desktop.min.css'
    }
  ]
};
