console.log('bg-wrapper');
try {
  importScripts('background.js');
} catch (error) {
  console.error(error);
}