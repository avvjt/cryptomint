const icons = import.meta.glob(
  "/node_modules/cryptocurrency-icons/128/color/*.png",
  {
    eager: true,
    import: "default",
  }
);

export default icons;