function assertNotProduction() {
  if (isProduction()) {
    throw new Error("Operation blocked in production");
  }
}
