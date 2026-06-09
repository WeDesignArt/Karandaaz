// Custom type declarations for CSS files
declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}
