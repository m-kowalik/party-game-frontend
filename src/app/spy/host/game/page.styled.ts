.container {
  --button-primary-hover: #383838;
  --button-secondary-hover: #f2f2f2;

  display: grid;
  grid-template-rows: 20px 1fr 20px;
  align-items: center;
  justify-items: center;
  min-height: 100svh;
  padding: 80px;
  gap: 64px;
  font-family: var(--font-geist-sans);
}

.card {
    background: var(--foreground-secondary);
    padding: 24px;
    border-radius: 8px;
    border: 1px solid var(--primary-color);
    width: 400px;
    height: 600px;

}