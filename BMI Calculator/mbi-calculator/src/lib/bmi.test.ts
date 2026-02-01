import { calculateBmi, getBmiCategory } from "./bmi";

test("calculateBmi returns expected value", () => {
  expect(calculateBmi(72, 175)).toBeCloseTo(23.5, 1);
});

test("getBmiCategory returns correct labels", () => {
  expect(getBmiCategory(17)).toBe("Underweight");
  expect(getBmiCategory(22)).toBe("Normal");
  expect(getBmiCategory(27)).toBe("Overweight");
  expect(getBmiCategory(32)).toBe("Obesity");
});
